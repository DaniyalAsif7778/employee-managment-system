import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    // --- Core Relationships & Auth Link ---
      _id: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
       },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },

    // --- Profile & Identity Data ---
    fullName: { type: String, required: true, trim: true },
    email:{type:String},
      
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },

    // --- System Role & Status Configuration ---
    title: { type: String, default: 'Administrator', trim: true },
    role: { type: String, default: 'admin', enum: ['admin', 'super-admin'] },
    status: { 
      type: String, 
      required: true, 
      default: 'unVerified', 
      enum: ['unVerified','verified', 'suspended', 'archived'], 
      index: true 
    },
    isActive: { type: Boolean, default: true },
     

    // --- Core Operations & System Metrics ---
    totalTasks: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    completionRate: { type: Number, default: null },

    // --- Contact & Location Metadata ---
    location: { type: String, default: "" },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zipCode: { type: String, default: "" },
      country: { type: String, default: "" }
    },
    emergencyContact: {
      name: { type: String, default: "" },
      relationship: { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" }
    }
  },
  { 
    timestamps: true, 
      
  }
);

export const Admin  = mongoose.model('Admin', adminSchema);
