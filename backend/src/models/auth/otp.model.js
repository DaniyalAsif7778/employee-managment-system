import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
          _id: { type: String },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, expires: 0 },
    createdAt: { type: Date, default: Date.now, expires: 300 },
    consumedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'otps' }
);

export const Otp =
  mongoose.models.Otp || mongoose.model('Otp', otpSchema );
