import mongoose from 'mongoose'

const hrSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    department: { type: String, trim: true, default: 'Human Resources' },
    permissions: [{ type: String, trim: true }],
  },
  { timestamps: true, collection: 'hr_profiles' }
)

export const HR = mongoose.models.HR || mongoose.model('HR', hrSchema, 'hr_profiles')