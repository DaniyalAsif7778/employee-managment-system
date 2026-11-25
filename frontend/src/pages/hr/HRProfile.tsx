import { Mail, Phone, MapPin, Calendar, Building2, Save, Edit2, Lock } from 'lucide-react'
import { useState } from 'react'

interface ProfileForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  bio: string
}

export default function HRProfile() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [twoFAEnabled, setTwoFAEnabled] = useState(true)
  const [form, setForm] = useState<ProfileForm>({
    firstName: 'Sandra',
    lastName: 'Kim',
    email: 'sandra.kim@company.com',
    phone: '+1 (555) 456-7890',
    location: 'New York, NY',
    bio: 'HR Director with 12+ years of experience in talent acquisition, employee relations, and organizational development. Committed to building inclusive and high-performance cultures.',
  })
  const [savedForm, setSavedForm] = useState<ProfileForm>({ ...form })
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSave = () => {
    setSavedForm({ ...form })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setForm({ ...savedForm })
    setIsEditing(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile Information' },
    { id: 'security', label: 'Security' },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">My Profile</h1>
        <p className="text-[15px] text-[#9CA3AF]">
          Manage your personal information and account security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#EC4899] flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-[32px] font-medium">SK</span>
              </div>
              <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-1">Sandra Kim</h2>
              <p className="text-[15px] text-[#9CA3AF] mb-4">HR Director</p>
              <div className="pt-4 border-t border-[#333333] space-y-3 text-left">
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Mail className="w-4 h-4" />
                  <span>{savedForm.email}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Phone className="w-4 h-4" />
                  <span>{savedForm.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <MapPin className="w-4 h-4" />
                  <span>{savedForm.location}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Building2 className="w-4 h-4" />
                  <span>Human Resources</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Calendar className="w-4 h-4" />
                  <span>Joined Feb 2018</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
            <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#9CA3AF]">Employees Managed</span>
                <span className="text-[15px] font-medium text-[#E0E0E0]">247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#9CA3AF]">Open Positions</span>
                <span className="text-[15px] font-medium text-[#E0E0E0]">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#9CA3AF]">Hires This Month</span>
                <span className="text-[15px] font-medium text-[#EC4899]">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="lg:col-span-2">
          <div className="bg-[#121212] rounded-xl border border-[#333333]">
            <div className="border-b border-[#333333] px-6">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-[15px] font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#EC4899] text-[#E0E0E0]'
                        : 'border-transparent text-[#9CA3AF] hover:text-[#E0E0E0]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'profile' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 text-[15px] font-medium text-[#EC4899] hover:text-[#DB2777] transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-[15px] font-medium text-[#9CA3AF] hover:text-[#E0E0E0] transition-colors border border-[#333333] rounded-lg hover:bg-[#1F1F1F]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-[#EC4899] text-white rounded-lg hover:bg-[#DB2777] transition-all duration-200 text-[15px] font-medium"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">Bio</label>
                    <textarea
                      rows={4}
                      value={form.bio}
                      onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] resize-none disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-6">Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                          className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                        />
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-[#EC4899] text-white rounded-lg hover:bg-[#DB2777] transition-all duration-200 text-[15px] font-medium">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#333333]">
                  <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-2">
                    Two-Factor Authentication
                  </h2>
                  <p className="text-[15px] text-[#9CA3AF] mb-6">
                    Add an extra layer of security to your account using an authenticator app.
                  </p>
                  <div className="flex items-center justify-between p-4 bg-[#1F1F1F] rounded-xl border border-[#333333]">
                    <div>
                      <p className="text-[15px] font-medium text-[#E0E0E0]">
                        Two-Factor Authentication
                      </p>
                      <p className="text-[14px] text-[#9CA3AF] mt-0.5">
                        {twoFAEnabled ? 'Currently enabled' : 'Currently disabled'}
                      </p>
                    </div>
                    <button
                      onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFAEnabled ? 'bg-[#EC4899]' : 'bg-[#333333]'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFAEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
