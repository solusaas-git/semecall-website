import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('semecall');
    
    const [totalMessages, newMessages, repliedMessages, archivedMessages] = await Promise.all([
      db.collection('contacts').countDocuments(),
      db.collection('contacts').countDocuments({ status: 'new' }),
      db.collection('contacts').countDocuments({ status: 'replied' }),
      db.collection('contacts').countDocuments({ status: 'archived' })
    ]);

    return NextResponse.json({
      totalMessages,
      newMessages,
      repliedMessages,
      archivedMessages
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

