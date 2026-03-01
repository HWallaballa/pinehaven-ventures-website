import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check for existing subscriber (idempotent)
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Subscribers?filterByFormula=${encodeURIComponent(`{email}="${email}"`)}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
    );
    const searchData = await searchRes.json();
    if (searchData.records?.length > 0) {
      return NextResponse.json({ success: true }); // already subscribed, succeed silently
    }

    // Create new subscriber
    const createRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Subscribers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                email,
                tier: 'Free',
                active: true,
              },
            },
          ],
        }),
      }
    );

    if (!createRes.ok) {
      const err = await createRes.json();
      console.error('Airtable error:', err);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
