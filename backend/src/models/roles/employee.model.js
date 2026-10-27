import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    zipCode: { type: String, trim: true, default: '' },
    country: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const emergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    relationship: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    // --- Core Relationships & Auth Link ---
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

    // --- System Role & Status Configuration ---
     department: { type: String, trim: true, default: '' },
 departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
      unique: true,
      index: true,
    },    position: { type: String, trim: true, default: '' },
    
    // --- Organizational Hierarchy Anchors (For Joins) ---
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    // ADDED: Direct anchor link to the HR User document managing this worker
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on-leave', 'terminated'],
      default: 'active',
    },

    // --- Core Operations & System Metrics ---
    salary: { type: Number, min: 0, default: null },
    hireDate: { type: Date, default: null },
    performanceRating: { type: Number, min: 0, max: 5, default: null },
    completionRate: { type: Number, min: 0, max: 100, default: null },
    tasksCompleted: { type: Number, min: 0, default: 0 },
    totalTasks: { type: Number, min: 0, default: 0 },
    skills: [{ type: String, trim: true }],

    // --- Profile & Personal Details ---
    location: { type: String, trim: true, default: '' },
    bio: { type: String, trim: true, default: '' },
    dateOfBirth: { type: Date, default: null },
    address: { type: addressSchema, default: () => ({}) },
    emergencyContact: { type: emergencyContactSchema, default: () => ({}) },
  },
  { timestamps: true, collection: 'employee_profiles' }
);

employeeSchema.index(
  { organization: 1, employeeId: 1 },
  { unique: true }
);

export const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema, 'employee_profiles');
