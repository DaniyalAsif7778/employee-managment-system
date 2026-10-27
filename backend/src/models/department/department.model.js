import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    // --- Multi-Tenant Context ---
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },

    // --- Core Identity & Metadata ---
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },

    // --- Diagram Fields (Relationships mapped to User Auth model) ---
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    hr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
      }
    ],

    // --- Operational & Financial Management ---
    status: {
      type: String,
      enum: ['active', 'inactive', 'restructuring'],
      default: 'active',
      index: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    budget: {
      allocated: { type: Number, min: 0, default: 0 },
      spent: { type: Number, min: 0, default: 0 },
      currency: { type: String, default: 'USD', uppercase: true }
    },

    // --- Location Scope ---
    location: { type: String, trim: true, default: '' }, // e.g., "Building A, Floor 3" or "Remote"
    
    // --- Parent/Child Hierarchy (For Sub-departments if needed) ---
    // parentDepartmentId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Department',
    //   default: null,
    //   index: true
    // }
  },
  { 
    timestamps: true, 
    collection: 'departments' 
  }
);

// --- UNIQUE INDEXES ---
// Guarantees department name and shortcode are unique within each distinct company workspace
departmentSchema.index({ organization: 1, name: 1 }, { unique: true });
departmentSchema.index({ organization: 1, code: 1 }, { unique: true });

export const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema, 'departments');
