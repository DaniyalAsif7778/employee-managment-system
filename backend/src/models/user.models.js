 
import mongoose from 'mongoose';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from "process"
const otpSchema = new mongoose.Schema({
  otp:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Automatically delete document after 300 seconds (5 minutes)
    expires: 300 
  }
});
export const Otp = mongoose.model("Otp", otpSchema);


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
    avatar:{
      type:String,
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
      ref: 'Organization',
    },
    otp:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Otp'
    }
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

 
UserSchema.methods.generateAccessToken = async function () {
  return   jwt.sign(
    {
      _id: this._id,
      role:this.role,
      email:this.email,
    },
     process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  return   jwt.sign(
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

 const strOtp = String(otp)
    console.log(typeof(strOtp));
  const encryptedOtp = await   bycrypt.hash(strOtp, 10);
  return {encryptedOtp};
};

export const User = mongoose.model('Admin', UserSchema);
