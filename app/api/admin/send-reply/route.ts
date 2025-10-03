import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('semecall');

    // Get SMTP settings
    const smtpSettings = await db.collection('smtp_settings').findOne({});

    if (!smtpSettings) {
      return NextResponse.json({ 
        error: 'SMTP not configured. Please configure SMTP settings first.' 
      }, { status: 400 });
    }

    const body = await request.json();
    const { messageId, to, subject, replyText } = body;

    if (!to || !replyText) {
      return NextResponse.json({ 
        error: 'Recipient email and reply text are required' 
      }, { status: 400 });
    }

    // Get the original message for context
    const originalMessage = await db.collection('contacts').findOne({
      _id: new ObjectId(messageId)
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpSettings.host,
      port: smtpSettings.port,
      secure: smtpSettings.secure,
      auth: {
        user: smtpSettings.user,
        pass: smtpSettings.password
      }
    });

    // Prepare email content
    const emailSubject = subject || 'Re: Your contact message';
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semecall - Response</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 1px;">SEMECALL</h1>
              <p style="color: #dbeafe; margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">Expert in Remote Sales Performance</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px; background-color: #ffffff;">
              <!-- Reply Message -->
              <div style="color: #374151; font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
${replyText}
              </div>

              ${originalMessage ? `
              <!-- Original Message -->
              <div style="border-top: 2px solid #e5e7eb; padding-top: 25px; margin-top: 35px;">
                <p style="color: #6b7280; font-size: 13px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Original Message
                </p>
                <div style="background: #f9fafb; padding: 20px; border-left: 4px solid #2563eb; border-radius: 6px;">
                  <p style="color: #4b5563; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                    From: ${originalMessage.firstName} ${originalMessage.lastName}${originalMessage.company ? ` (${originalMessage.company})` : ''}
                  </p>
                  <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">
${originalMessage.message}
                  </p>
                </div>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 30px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: bold;">SEMECALL</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="color: #9ca3af; margin: 0; font-size: 14px; line-height: 1.6;">
                      N3 rue Lalla Amina, quartier l'Hyppodrome<br>
                      Résidence Triangle d'Or, 4ème étage, numéro 46<br>
                      Fes, Morocco
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                      📞 +33 6 43 34 58 45 | +212 6 64 96 43 98
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #374151;">
                    <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                      📧 contact@semecall.com
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <p style="color: #6b7280; margin: 0; font-size: 12px; line-height: 1.5;">
                      This email was sent from Semecall Admin Panel.<br>
                      © ${new Date().getFullYear()} Semecall. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: smtpSettings.fromName 
        ? `"${smtpSettings.fromName}" <${smtpSettings.fromEmail}>` 
        : smtpSettings.fromEmail,
      to: to,
      subject: emailSubject,
      html: emailHtml
    });

    // Update message status to replied
    if (messageId) {
      await db.collection('contacts').updateOne(
        { _id: new ObjectId(messageId) },
        { 
          $set: { 
            status: 'replied',
            repliedAt: new Date(),
            repliedBy: session.user.email
          } 
        }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Reply sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending reply:', error);
    return NextResponse.json({ 
      error: 'Failed to send reply',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

