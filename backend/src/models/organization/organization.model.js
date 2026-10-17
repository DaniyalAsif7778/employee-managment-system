import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema(
  {
    orgName: { type: String, required: true, trim: true },
    orgSlug: { type: String, required: true, trim: true, lowercase: true },
    organizationEmail: { type: String, trim: true, lowercase: true },
    address: { type: String, required: true, trim: true },
    industry: { type: String, trim: true, default: '' },
    companySize: { type: String, required: true, trim: true },
    org_avatar: { type: String, default: '' },
    org_CoverImage: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'organizations' }
)

organizationSchema.index({ orgSlug: 1 }, { unique: true })
organizationSchema.index({ orgName: 1 }, { unique: true })
organizationSchema.index(
  { organizationEmail: 1 },
  { unique: true, sparse: true }
)

export const Organization =
  mongoose.models.Organization || mongoose.model('Organization', organizationSchema, 'organizations')