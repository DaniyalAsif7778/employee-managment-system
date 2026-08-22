import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    orgnaizationId: {
      type: String,
     },
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      indexedDB: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model('Employee', EmployeeSchema);
