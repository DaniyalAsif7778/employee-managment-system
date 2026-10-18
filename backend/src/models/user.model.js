import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from 'process';

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

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true, default: '' },
    lastName: { type: String, trim: true, default: '' },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: { type: String, trim: true, sparse: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: '' },
    employeeId: { type: String, trim: true, default: '' },
    department: { type: String, trim: true, default: '' },
    departmentId: { type: String, trim: true, default: '' },
    position: { type: String, trim: true, default: '' },
    role: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['admin', 'manager', 'hr', 'employee'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on-leave', 'terminated'],
      default: 'active',
    },
    salary: { type: Number, min: 0, default: null },
    hireDate: { type: Date, default: null },
    location: { type: String, trim: true, default: '' },
    manager: { type: String, trim: true, default: '' },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manager',
      default: null,
    },
    skills: [{ type: String, trim: true }],
    bio: { type: String, trim: true, default: '' },
    dateOfBirth: { type: Date, default: null },
    address: { type: addressSchema, default: () => ({}) },
    emergencyContact: { type: emergencyContactSchema, default: () => ({}) },
    performanceRating: { type: Number, min: 0, max: 5, default: null },
    completionRate: { type: Number, min: 0, max: 100, default: null },
    tasksCompleted: { type: Number, min: 0, default: 0 },
    totalTasks: { type: Number, min: 0, default: 0 },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    refreshToken: { type: String, select: false },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, collection: 'users' }
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is required');
  }

  return jwt.sign(
    { _id: this._id, role: this.role, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
  );
};

userSchema.methods.generateRefreshToken = function (expiresIn) {
  const secret =
    process.env.REFRESH_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('REFRESH_TOKEN_SECRET or ACCESS_TOKEN_SECRET is required');
  }

  return jwt.sign({ _id: this._id }, secret, {
    expiresIn: expiresIn || process.env.REFRESH_TOKEN_EXPIRY || '7d',
  });
};

export const User = mongoose.model('User', userSchema, 'users');
