import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from 'process';

const userSchema = new mongoose.Schema(
  {
    // --- IDENTITY & CORE ROUTING ---
       
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
   
    // --- CREDENTIALS & SECURITY ---
    password: { type: String, required: true, select: false },
    refreshToken: { type: String, select: false },

    // --- ACCESSIBILITY & RBAC SYSTEM ---
    role: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['admins', 'managers', 'hrs', 'employees'],
    }, 
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'role',
      required: true,
      unique: true
    },
       status: { 
      type: String, 
      required: true, 
      default: 'unVerified', 
      enum: ['unVerified','verified', 'suspended', 'archived'], 
      index: true 
    },

    isActive: { type: Boolean, default: false, index: true },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
  },
  { 
    timestamps: true, 
     
  }
);

// --- MIDDLEWARE ---
// Encrypt password before saving
userSchema.pre('save', async function ( ) {
  if (!this.isModified('password')) return ;
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
     
  } catch (err) {
      Error('Error hashing password',err)
  }
});

// --- INSTANCE METHODS ---
// Verify input password against hashed database password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access token generator
userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is required');
  }

  return jwt.sign(
    { _id: this._id, role: this.role, email: this.email, organization: this.organization },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
  );
};

// Refresh token generator
userSchema.methods.generateRefreshToken = function (expiresIn) {
  const secret = process.env.REFRESH_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('REFRESH_TOKEN_SECRET or ACCESS_TOKEN_SECRET is required');
  }

  return jwt.sign({ _id: this._id }, secret, {
    expiresIn: expiresIn || process.env.REFRESH_TOKEN_EXPIRY || '7d',
  });
};

export const User = mongoose.models.User || mongoose.model('User', userSchema );
