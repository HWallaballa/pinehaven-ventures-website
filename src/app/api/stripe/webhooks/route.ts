import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

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

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(
          `[Stripe] Checkout completed: customer=${session.customer}, subscription=${session.subscription}, amount=${session.amount_total}`
        );
        // TODO: Provision access for the customer (e.g., update database, send welcome email)
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(
          `[Stripe] Subscription updated: id=${subscription.id}, status=${subscription.status}, customer=${subscription.customer}`
        );
        // TODO: Handle plan changes (upgrades/downgrades)
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(
          `[Stripe] Subscription cancelled: id=${subscription.id}, customer=${subscription.customer}`
        );
        // TODO: Revoke access, trigger retention flow
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(
          `[Stripe] Payment succeeded: invoice=${invoice.id}, customer=${invoice.customer}, amount=${invoice.amount_paid}`
        );
        // TODO: Log successful recurring payment
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(
          `[Stripe] Payment failed: invoice=${invoice.id}, customer=${invoice.customer}`
        );
        // TODO: Notify customer, retry logic
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
