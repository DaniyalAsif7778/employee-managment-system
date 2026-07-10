import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    organizationSlug: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    companySize: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const organization = mongoose.model('organization', organizationSchema);
