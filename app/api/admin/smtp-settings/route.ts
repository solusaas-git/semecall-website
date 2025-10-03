import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

// GET - Fetch SMTP settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('semecall');

    const settings = await db.collection('smtp_settings').findOne({});

    if (!settings) {
      return NextResponse.json({
        host: '',
        port: 587,
        secure: false,
        user: '',
        password: '',
        fromEmail: '',
        fromName: ''
      });
    }

    return NextResponse.json({
      host: settings.host || '',
      port: settings.port || 587,
      secure: settings.secure || false,
      user: settings.user || '',
      password: settings.password || '',
      fromEmail: settings.fromEmail || '',
      fromName: settings.fromName || ''
    });
  } catch (error) {
    console.error('Error fetching SMTP settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Save SMTP settings
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('semecall');

    const body = await request.json();
    const { host, port, secure, user, password, fromEmail, fromName } = body;

    // Validation
    if (!host || !port || !user || !fromEmail) {
      return NextResponse.json({ 
        error: 'Host, port, user, and from email are required' 
      }, { status: 400 });
    }

    const smtpSettings = {
      host,
      port: parseInt(port),
      secure: secure === true,
      user,
      password: password || '', // Allow empty password for update without changing
      fromEmail,
      fromName: fromName || '',
      updatedAt: new Date(),
      updatedBy: session.user.email
    };

    // Upsert (update if exists, insert if not)
    await db.collection('smtp_settings').updateOne(
      {},
      { $set: smtpSettings },
      { upsert: true }
    );

    return NextResponse.json({ 
      message: 'SMTP settings saved successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('Error saving SMTP settings:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

