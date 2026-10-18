import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    title: { type: String, default: 'Administrator', trim: true },
  },
  { timestamps: true, collection: 'admin_profiles' }
);

export const Admin =
  mongoose.models.Admin ||
  mongoose.model('Admin', adminSchema, 'admin_profiles');
