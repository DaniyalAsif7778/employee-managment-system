import mongoose from "mongoose";
import { organization } from "./ organization.models";
const AdminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
    },
    userName:{
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
  organization:{
       type:mongoose.Schema.Types.objectId,
       ref:"organization"
  }

}, { timestamps: true })



export const Admin = mongoose.model("Admin", AdminSchema)