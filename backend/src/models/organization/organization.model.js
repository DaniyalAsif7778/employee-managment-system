import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
       _id: { type: String },
    orgName: { 
      type: String, 
      required: true, 
      maxlength: 200,
    
 
      trim: true 
    },
    orgSlug: { 
      type: String, 
      required: true, 
    
      maxlength: 120, 
      trim: true, 
      lowercase: true 
    },
    adminEmail: { 
      type: String, 
      required: true, 
      maxlength: 255, 
      trim: true, 
      lowercase: true, 
       
    },
    industry: { 
      type: String, 
      maxlength: 100, 
      trim: true, 
      default: '' 
    },
    companySize: { 
      type: String, 
      required: true, 
      trim: true, 
     },
    timezone: { 
      type: String, 
       default: 'GMT +05:30', 
      maxlength: 100 
    },
    description: { 
      type: String 
    },
    phone: { 
      type: String, 
      maxlength: 30 
    },
    website: { 
      type: String, 
      maxlength: 500 
    },
    org_avatar: { 
      type: String, 
       default: '' 
    },
    org_CoverImage: { 
      type: String, 
       
      default: '' 
    },
    address: { 
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    settings: { 
      type: mongoose.Schema.Types.Mixed, 
      default: {} 
    },
    isActive: { 
      type: Boolean, 
      default: false 
    }
  },
  { 
    timestamps: true, 
    collection: 'organizations' 
  }
);


 organizationSchema.index({ orgName: 1 }, { unique: true });
organizationSchema.index({ adminEmail: 1 }, { unique: true, sparse: true });

export const Organization = mongoose.model(
  'Organization',
  organizationSchema 
);
