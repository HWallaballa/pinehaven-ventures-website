import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { createSupabaseAdmin } from '@/lib/supabase';
import type Stripe from 'stripe';

/**
 * Helper: update a user's tier based on their Stripe customer ID.
 */
async function updateTierByCustomerId(
  customerId: string,
  tier: 'free' | 'premium',
  subscriptionStatus: string
) {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase
    .from('profiles')
    .update({ tier, subscription_status: subscriptionStatus })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error(`[Stripe] Failed to update tier for customer ${customerId}:`, error.message);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(
          `[Stripe] Checkout completed: customer=${session.customer}, subscription=${session.subscription}, amount=${session.amount_total}`
        );

        // Link the Stripe customer to the user's profile.
        // The checkout session's client_reference_id should be the Supabase user ID.
        // If not set, try matching by customer email.
        const customerId = session.customer as string;
        const customerEmail = session.customer_details?.email;

        if (session.client_reference_id) {
          // Direct match by user ID
          await supabase
            .from('profiles')
            .update({
              stripe_customer_id: customerId,
              tier: 'premium',
              subscription_status: 'active',
            })
            .eq('id', session.client_reference_id);
        } else if (customerEmail) {
          // Match by email
          await supabase
            .from('profiles')
            .update({
              stripe_customer_id: customerId,
              tier: 'premium',
              subscription_status: 'active',
            })
            .eq('email', customerEmail);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        console.log(
          `[Stripe] Subscription updated: id=${subscription.id}, status=${subscription.status}, customer=${customerId}`
        );

        const tier = subscription.status === 'active' ? 'premium' : 'free';
        await updateTierByCustomerId(customerId, tier, subscription.status);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        console.log(
          `[Stripe] Subscription cancelled: id=${subscription.id}, customer=${customerId}`
        );

        await updateTierByCustomerId(customerId, 'free', 'canceled');
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(
          `[Stripe] Payment succeeded: invoice=${invoice.id}, customer=${invoice.customer}, amount=${invoice.amount_paid}`
        );
        // Ensure tier stays premium on successful recurring payment
        if (invoice.customer) {
          await updateTierByCustomerId(invoice.customer as string, 'premium', 'active');
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(
          `[Stripe] Payment failed: invoice=${invoice.id}, customer=${invoice.customer}`
        );
        // Mark as past_due but don't immediately revoke access
        if (invoice.customer) {
          await updateTierByCustomerId(invoice.customer as string, 'premium', 'past_due');
        }
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
