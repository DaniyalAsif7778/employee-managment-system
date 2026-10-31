import crypto from 'node:crypto'; // Built-in Node.js module
import bcrypt from 'bcrypt';
import { ApiError } from './ApiError.js';
  
export async function generateSecureOTP() {
  try {
    const rawOTP = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(rawOTP, 10);
    return {hashedOTP };
  } catch (error) {
    console.error("Error generating secure OTP:", error);
    throw new ApiError(500, 'Error generating secure OTP');
  }
}
