import mongoose from 'mongoose';
import bycrypt from "bcrypt"

const organizationSchema = new mongoose.Schema(
  {
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
    organizationEmail: {
      type: String,
      required: true,
    },
    org_avatar:{
      type:String,
     },
    org_coverImage:{
      type:String,
     },
    address: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    companySize: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {  timestamps: true }
);


organizationSchema.pre('save',  async function(){
           if (!this.isModified("orgnaizationEmail")) return;

           return    this.orgnaizationEmail = await bycrypt.hash(this.orgnaizationEmail,10)
})
organizationSchema.methods.isOrgEmailCorrect = async function(orgEmail){
const confirmOrgEmail =  await bycrypt.compare(orgEmail,this.orgnaizationEmail) 
return confirmOrgEmail;
}


export const Organization = mongoose.model('Organization', organizationSchema);
