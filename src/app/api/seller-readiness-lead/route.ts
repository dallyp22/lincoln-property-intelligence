import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      preferredContact,
      score,
      grade,
      categoryScores,
    } = body;

    if (!firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Integrate with CRM — this is a HIGH-INTENT lead (Seller Readiness Score completion)
    console.log('[Seller Readiness Lead — HIGH INTENT]', {
      firstName,
      lastName,
      email,
      phone,
      address,
      preferredContact,
      score,
      grade,
      categoryScores,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
