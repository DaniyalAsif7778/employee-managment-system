import { X, Save, Building2, User, DollarSign, Users, MapPin, Calendar, Target } from 'lucide-react'
import { useState } from 'react'

interface Department {
  id: number
  name: string
  manager: string
  managerEmail: string
  managerPhone: string
  location: string
  employees: number
  budget: string
  budgetUsed: number
  budgetTotal: number
  performance: number
  color: string
  description: string
  established: string
}

interface EditDepartmentModalProps {
  department: Department
  onClose: () => void
  onSave: (updatedDepartment: Partial<Department>) => void
}

export default function EditDepartmentModal({
  department,
  onClose,
  onSave,
}: EditDepartmentModalProps) {
  const [formData, setFormData] = useState({
    name: department.name,
    description: department.description,
    manager: department.manager,
    managerEmail: department.managerEmail,
    managerPhone: department.managerPhone,
    location: department.location,
    budgetTotal: department.budgetTotal,
    color: department.color,
    established: department.established,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Department name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.manager.trim()) newErrors.manager = 'Manager name is required'
    if (!formData.managerEmail.trim()) {
      newErrors.managerEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.managerEmail)) {
      newErrors.managerEmail = 'Invalid email format'
    }
    if (!formData.managerPhone.trim()) newErrors.managerPhone = 'Phone is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (formData.budgetTotal <= 0) newErrors.budgetTotal = 'Budget must be greater than 0'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      onSave(formData)
      setIsSaving(false)
      onClose()
    }, 1000)
  }

  const colorOptions = [
    { value: '#009F8E', label: 'Teal' },
    { value: '#12C4D3', label: 'Cyan' },
    { value: '#00BF6B', label: 'Green' },
    { value: '#FFC107', label: 'Yellow' },
    { value: '#3B82F6', label: 'Blue' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#EC4899', label: 'Pink' },
    { value: '#F97316', label: 'Orange' },
  ]

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#000000] rounded-2xl border border-[#333333] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1F1F1F] rounded-lg">
                <Building2 className="w-5 h-5 text-[#009F8E]" />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Edit Department</h2>
                <p className="text-[14px] text-[#6B7280]">Update department information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#009F8E]" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      Department Name <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-[#121212] border ${
                        errors.name ? 'border-[#EF4444]' : 'border-[#333333]'
                      } rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]`}
                      placeholder="Enter department name"
                    />
                    {errors.name && (
                      <p className="text-[#EF4444] text-[13px] mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      Description <span className="text-[#EF4444]">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-2.5 bg-[#121212] border ${
                        errors.description ? 'border-[#EF4444]' : 'border-[#333333]'
                      } rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] resize-none`}
                      placeholder="Enter department description"
                    />
                    {errors.description && (
                      <p className="text-[#EF4444] text-[13px] mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      Department Color
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleChange('color', color.value)}
                          className={`h-10 rounded-lg border-2 transition-all ${
                            formData.color === color.value
                              ? 'border-[#E0E0E0] scale-105'
                              : 'border-[#333333] hover:border-[#555555]'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.label}
                        ></button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      <Calendar className="w-3.5 h-3.5 inline mr-1" />
                      Established Date
                    </label>
                    <input
                      type="text"
                      value={formData.established}
                      onChange={(e) => handleChange('established', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#121212] border border-[#333333] rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                      placeholder="e.g., Jan 2018"
                    />
                  </div>
                </div>
              </div>

              {/* Manager Information */}
              <div>
                <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#009F8E]" />
                  Manager Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      Manager Name <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.manager}
                      onChange={(e) => handleChange('manager', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-[#121212] border ${
                        errors.manager ? 'border-[#EF4444]' : 'border-[#333333]'
                      } rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]`}
                      placeholder="Enter manager name"
                    />
                    {errors.manager && (
                      <p className="text-[#EF4444] text-[13px] mt-1">{errors.manager}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      Email <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.managerEmail}
                      onChange={(e) => handleChange('managerEmail', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-[#121212] border ${
                        errors.managerEmail ? 'border-[#EF4444]' : 'border-[#333333]'
                      } rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]`}
                      placeholder="manager@company.com"
                    />
                    {errors.managerEmail && (
                      <p className="text-[#EF4444] text-[13px] mt-1">{errors.managerEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      Phone <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.managerPhone}
                      onChange={(e) => handleChange('managerPhone', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-[#121212] border ${
                        errors.managerPhone ? 'border-[#EF4444]' : 'border-[#333333]'
                      } rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.managerPhone && (
                      <p className="text-[#EF4444] text-[13px] mt-1">{errors.managerPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#009F8E]" />
                  Additional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />
                      Location <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-[#121212] border ${
                        errors.location ? 'border-[#EF4444]' : 'border-[#333333]'
                      } rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]`}
                      placeholder="Building A, Floor 3"
                    />
                    {errors.location && (
                      <p className="text-[#EF4444] text-[13px] mt-1">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] text-[#9CA3AF] mb-2">
                      <DollarSign className="w-3.5 h-3.5 inline mr-1" />
                      Annual Budget <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.budgetTotal}
                      onChange={(e) => handleChange('budgetTotal', Number(e.target.value))}
                      className={`w-full px-4 py-2.5 bg-[#121212] border ${
                        errors.budgetTotal ? 'border-[#EF4444]' : 'border-[#333333]'
                      } rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]`}
                      placeholder="2400000"
                    />
                    {errors.budgetTotal && (
                      <p className="text-[#EF4444] text-[13px] mt-1">{errors.budgetTotal}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#333333] bg-[#0A0A0A]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-[#121212] hover:bg-[#1F1F1F] text-[#E0E0E0] rounded-lg transition-all border border-[#333333] text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 bg-[#009F8E] hover:bg-[#12C4D3] text-white rounded-lg transition-all text-[15px] font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
