import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    if (!name || !email || !phone || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Integrate with CRM — this is a HIGH intent lead (24-hour callback)
    console.log('[Assessment Request — HIGH INTENT]', { name, email, phone, address, timeline: body.timeline, message: body.message, timestamp: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
