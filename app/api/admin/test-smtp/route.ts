import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('semecall');

    // Get SMTP settings from database
    const settings = await db.collection('smtp_settings').findOne({});

    if (!settings) {
      return NextResponse.json({ 
        error: 'SMTP settings not configured. Please configure SMTP settings first.' 
      }, { status: 400 });
    }

    const body = await request.json();
    const { testEmail } = body;

    if (!testEmail) {
      return NextResponse.json({ 
        error: 'Test email address is required' 
      }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
      auth: {
        user: settings.user,
        pass: settings.password
      }
    });

    // Verify connection
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP connection error:', error);
      return NextResponse.json({ 
        error: 'Failed to connect to SMTP server. Please check your settings.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 400 });
    }

    // Send test email
    const info = await transporter.sendMail({
      from: settings.fromName 
        ? `"${settings.fromName}" <${settings.fromEmail}>` 
        : settings.fromEmail,
      to: testEmail,
      subject: 'SMTP Test - Semecall Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">SMTP Test Successful! ✅</h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            This is a test email from your Semecall Admin Panel.
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Your SMTP configuration is working correctly and you can now send emails from the platform.
          </p>
          <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>SMTP Server:</strong> ${settings.host}:${settings.port}
            </p>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
              <strong>From:</strong> ${settings.fromEmail}
            </p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
            Sent from Semecall Admin Panel
          </p>
        </div>
      `
    });

    return NextResponse.json({ 
      success: true,
      message: 'Test email sent successfully!',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

