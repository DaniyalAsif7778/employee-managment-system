import mongoose from 'mongoose'

const managerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    department: { type: String, trim: true, default: '' },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  },
  { timestamps: true, collection: 'manager_profiles' }
)

export const Manager = mongoose.models.Manager || mongoose.model('Manager', managerSchema, 'manager_profiles')