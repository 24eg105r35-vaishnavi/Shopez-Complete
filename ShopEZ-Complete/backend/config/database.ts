import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopez';
    
    const conn = await mongoose.connect(mongoUri, {
      // Remove deprecated options - mongoose handles them automatically in v7+
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;
