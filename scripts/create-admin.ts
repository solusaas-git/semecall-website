/**
 * Script to create an admin user
 * Run with: npx ts-node scripts/create-admin.ts
 */

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = 'mongodb://semecall:0649798920%40Med@176.9.26.121:27017/semecall?directConnection=true';

async function createAdminUser() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('semecall');
    const usersCollection = db.collection('users');

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@semecall.com' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@2024', 10);

    const adminUser = {
      email: 'admin@semecall.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      createdAt: new Date()
    };

    await usersCollection.insertOne(adminUser);
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@semecall.com');
    console.log('Password: Admin@2024');
    console.log('⚠️  Please change the password after first login');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
  }
}

createAdminUser();

