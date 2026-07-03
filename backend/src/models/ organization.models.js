import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
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
    address: {
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

    companySize: {
        type: Number,
        required: true,
        trim: true,
    },

}, { timestamps: true })



export const organization = mongoose.model("organization", organizationSchema)