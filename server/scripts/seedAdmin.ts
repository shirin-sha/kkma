import mongoose from 'mongoose';
import { AdminUser } from '../src/models/AdminUser';
import { hashPassword } from '../src/utils/password';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables (try both project root and server folder)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config(); // Also try current directory

async function seedAdmin() {
  try {
    console.log('[Seed Admin] Connecting to MongoDB...');
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('[Seed Admin] ERROR: MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('[Seed Admin] Connected to MongoDB');

    // Get credentials from environment or use defaults
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const existing = await AdminUser.findOne({ username });
    if (existing) {
      console.log(`[Seed Admin] Admin user '${username}' already exists. Skipping.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create admin user
    const { salt, hash } = hashPassword(password);
    await AdminUser.create({
      username,
      passwordSalt: salt,
      passwordHash: hash
    });

    console.log(`[Seed Admin] ✅ Admin user created successfully!`);
    console.log(`[Seed Admin] Username: ${username}`);
    console.log(`[Seed Admin] Password: ${password}`);
    console.log('[Seed Admin] ⚠️  Please change the default password after first login!');

    await mongoose.disconnect();
    console.log('[Seed Admin] Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Admin] ERROR:', error);
    process.exit(1);
  }
}

// Run the script
seedAdmin();

