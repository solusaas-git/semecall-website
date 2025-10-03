import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, company, message, consent } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !message || !consent) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db('semecall');

    const contactMessage = {
      firstName,
      lastName,
      email,
      phone,
      company: company || null,
      message,
      status: 'new',
      createdAt: new Date(),
    };

    await db.collection('contacts').insertOne(contactMessage);

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

