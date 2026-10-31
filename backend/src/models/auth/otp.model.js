import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
           

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    otp: { type: String, required: true },
   createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 300 seconds = 5 minutes. MongoDB will auto-delete this document after 5 minutes!
  },
    consumedAt: { type: Date, default: null },
  },
  { timestamps: true  }
);

export const Otp =
  mongoose.models.Otp || mongoose.model('Otp', otpSchema );
