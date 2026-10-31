import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
import { app } from '../app.js';
import process from 'process';
const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });

    console.log(`MongoDB connected successfully ${response}`);
    app.on('error', (error) => {
      console.log('error accour on connecting', error);
    });
    // 🚀 CRUCIAL FIX 2: Prevent instant production crashes from Redis/Mongo disconnects
// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 [Unhandled Rejection Detected]:', reason);
    // Keeps the container alive temporarily instead of crashing instantly 
    // so you can read the exact database connection error message in your dashboard logs.
});

process.on('uncaughtException', (error) => {
    console.error('🚨 [Uncaught Exception Detected]:', error.message);
});
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
