import mongoose from 'mongoose';

const hrSchema = new mongoose.Schema(
  {
    // --- Core Relationships & Auth Link ---
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },

    // --- Profile & Identity Data ---
    fullName: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },

    // --- System Role & Status Configuration ---
    title: { type: String, default: 'HR Specialist', trim: true },
    position: { type: String, default: 'Human Resources', trim: true },
    role: { type: String, default: 'hr', enum: ['hr'] },
    status: { type: String, default: 'active', enum: ['active', 'inactive', 'on-leave', 'suspended'] },
    isActive: { type: Boolean, default: true },

    // --- Dynamic Target Scopes (For Pipeline Joins) ---
    department: { type: String, trim: true, default: "Human Resources" },
  departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
      unique: true,
      index: true,
    },
    // --- Core Operations & System Metrics ---
    salary: { type: Number, min: 0, default: null },
    hireDate: { type: Date, default: null },
    performanceRating: { type: Number, min: 0, max: 5, default: null },
    totalTasks: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    completionRate: { type: Number, default: null },
    skills: [{ type: String, trim: true }],

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

// --- INDEXES ---
// Enforces unique employee IDs inside the exact same organization workspace
hrSchema.index({ organization: 1, employeeId: 1 }, { unique: true });

export const HR  = mongoose.models.HRProfile || mongoose.model('Hr', hrSchema);
