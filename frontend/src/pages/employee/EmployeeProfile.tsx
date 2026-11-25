import { Mail, Phone, MapPin, Calendar, Building2, Save, Edit2, Lock } from 'lucide-react'
import { useState } from 'react'

export default function EmployeeProfile() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile Information' },
    { id: 'security', label: 'Security' },
  ]

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">My Profile</h1>
        <p className="text-[15px] text-[#9CA3AF]">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] rounded-xl border border-[#333333] p-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#009F8E] flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-[32px] font-medium">JS</span>
              </div>
              <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-1">John Smith</h2>
              <p className="text-[15px] text-[#9CA3AF] mb-4">Software Developer</p>
              <div className="pt-4 border-t border-[#333333] space-y-3 text-left">
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Mail className="w-4 h-4" />
                  <span>john.smith@company.com</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Building2 className="w-4 h-4" />
                  <span>Engineering</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#9CA3AF]">
                  <Calendar className="w-4 h-4" />
                  <span>Joined Mar 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#121212] rounded-xl border border-[#333333] p-6 mt-6">
            <h3 className="text-[16px] font-semibold text-[#E0E0E0] mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#9CA3AF]">Tasks Completed</span>
                <span className="text-[15px] font-medium text-[#E0E0E0]">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#9CA3AF]">Active Tasks</span>
                <span className="text-[15px] font-medium text-[#E0E0E0]">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#9CA3AF]">Leave Days Used</span>
                <span className="text-[15px] font-medium text-[#E0E0E0]">5 / 20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-[#121212] rounded-xl border border-[#333333]">
            {/* Tabs */}
            <div className="border-b border-[#333333] px-6">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-[15px] font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#009F8E] text-[#E0E0E0]'
                        : 'border-transparent text-[#9CA3AF] hover:text-[#E0E0E0]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Information */}
            {activeTab === 'profile' && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 text-[15px] font-medium text-[#009F8E] hover:text-[#12C4D3] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        disabled={!isEditing}
                        className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Smith"
                        disabled={!isEditing}
                        className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="john.smith@company.com"
                      disabled={!isEditing}
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      disabled={!isEditing}
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue="San Francisco, CA"
                      disabled={!isEditing}
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">Bio</label>
                    <textarea
                      rows={4}
                      defaultValue="Experienced software developer with a passion for building scalable web applications."
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] resize-none disabled:opacity-50"
                    />
                  </div>

                  {isEditing && (
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="p-8">
                <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[16px] font-medium text-[#E0E0E0] mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                        />
                      </div>
                      <button className="flex items-center gap-2 px-6 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
                        <Lock className="w-4 h-4" />
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#333333]">
                    <h3 className="text-[16px] font-medium text-[#E0E0E0] mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-[#333333] bg-[#1F1F1F]">
                      <div>
                        <p className="text-[15px] font-medium text-[#E0E0E0] mb-1">Enable 2FA</p>
                        <p className="text-[14px] text-[#9CA3AF]">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-full h-full bg-[#333333] rounded-full peer-checked:bg-[#009F8E] transition-colors cursor-pointer"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                      </label>
                    </div>
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
