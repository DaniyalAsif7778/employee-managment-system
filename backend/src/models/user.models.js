/* eslint-disable no-undef */
import mongoose from 'mongoose';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    refreshToken: {
      type: String,
     },
    role: {
      type: String,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organization',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password') )
    return;

  return this.password = await bycrypt.hash(this.password, 10);
 });

UserSchema.methods.isPasswordCorrect = async function (password) {
  const confirmPassword = await bycrypt.compare(password, this.password);
  return confirmPassword;
};

UserSchema.methods.isOrgEmailCorrect = async function (orgEmail) {
  const confirmOrgEmail = await bycrypt.compare(
    orgEmail,
    this.orgnaizationEmail
  );
  return confirmOrgEmail;
};
UserSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
     process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
UserSchema.methods.generateOtp = async function () {
  const otp = Math.floor(Math.random() * 90000);
  const encryptedOtp = bycrypt.hash(otp, 10);
  return encryptedOtp;
};

export const User = mongoose.model('Admin', UserSchema);
