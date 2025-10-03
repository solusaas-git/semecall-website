const { MongoClient } = require('mongodb');

const uri = 'mongodb://semecall:0649798920%40Med@176.9.26.121:27017/semecall?directConnection=true';

async function testConnection() {
  console.log('Testing MongoDB connection...');
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');
    
    const db = client.db('semecall');
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Connection error:', error.message);
  } finally {
    await client.close();
  }
}

testConnection();

