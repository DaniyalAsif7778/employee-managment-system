import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    role: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['admin', 'manager', 'hr', 'employee'],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tokenHash: { type: String, required: true, unique: true, select: false },
    expiresAt: { type: Date, required: true, expires: 0 },
    acceptedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'invitations' }
);

invitationSchema.index({ organization: 1, email: 1, acceptedAt: 1 });

export const Invitation =
  mongoose.models.Invitation ||
  mongoose.model('Invitation', invitationSchema, 'invitations');
