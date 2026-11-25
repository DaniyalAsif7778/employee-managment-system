import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import process from 'process';
const otpSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    otp: { type: String, required: true, index: true },
    resetToken: { type: String, default: null },
    type: { type: String, enum: ['EMAIL_VERIFICATION', 'PASSWORD_RESET'] },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // 300 seconds = 5 minutes. MongoDB will auto-delete this document after 5 minutes!
    },
    isConsumed: { type: Boolean, default: false },
    consumedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

otpSchema.methods.generateResetToken = function () {
  if (!process.env.RESET_PASSWORD_TOKEN_SECRET) {
    throw new Error('RESET_PASSWORD_TOKEN_SECRET is required');
  }

  return jwt.sign({ _id: this.user }, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRY || '5m',
  });
};
export const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);
