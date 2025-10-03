import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, consent } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !message || !consent) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Here you would typically send an email or save to a database
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', {
      firstName,
      lastName,
      email,
      phone,
      message,
      consent,
      timestamp: new Date().toISOString()
    });

    // In production, you would integrate with an email service like:
    // - SendGrid
    // - AWS SES
    // - Resend
    // - Or save to a database

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

