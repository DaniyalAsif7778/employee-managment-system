import { Building2, Shield, Users, Bell, Save } from 'lucide-react'
import { useState } from 'react'

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'roles', label: 'Roles & Permissions', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Settings</h1>
        <p className="text-[15px] text-[#9CA3AF]">
          Manage your system preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] rounded-xl border border-[#333333] p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? 'bg-[#009F8E] text-white'
                      : 'text-[#9CA3AF] hover:text-[#E0E0E0] hover:bg-[#1F1F1F]'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className="text-[15px] font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#121212] rounded-xl border border-[#333333]">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="p-8">
                <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Employee Management System"
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Company Email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@company.com"
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        Timezone
                      </label>
                      <select className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]">
                        <option>PST (UTC-8)</option>
                        <option>EST (UTC-5)</option>
                        <option>GMT (UTC+0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                        Date Format
                      </label>
                      <select className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Company Address
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="123 Business Street, San Francisco, CA 94105"
                      className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-8">
                <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-[#333333] bg-[#1F1F1F]">
                    <div>
                      <h3 className="text-[15px] font-medium text-[#E0E0E0] mb-1">
                        Two-Factor Authentication
                      </h3>
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
                  <div className="flex items-center justify-between p-4 rounded-lg border border-[#333333] bg-[#1F1F1F]">
                    <div>
                      <h3 className="text-[15px] font-medium text-[#E0E0E0] mb-1">
                        Password Expiry
                      </h3>
                      <p className="text-[14px] text-[#9CA3AF]">
                        Require password changes every 90 days
                      </p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-full h-full bg-[#333333] rounded-full peer-checked:bg-[#009F8E] transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-[#333333] bg-[#1F1F1F]">
                    <div>
                      <h3 className="text-[15px] font-medium text-[#E0E0E0] mb-1">
                        Login Notifications
                      </h3>
                      <p className="text-[14px] text-[#9CA3AF]">
                        Get notified of new login attempts
                      </p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-full h-full bg-[#333333] rounded-full peer-checked:bg-[#009F8E] transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Roles & Permissions */}
            {activeTab === 'roles' && (
              <div className="p-8">
                <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-6">
                  Roles & Permissions
                </h2>
                <div className="space-y-4">
                  {['Admin', 'Manager', 'Employee', 'HR'].map((role) => (
                    <div
                      key={role}
                      className="p-4 rounded-lg border border-[#333333] bg-[#1F1F1F] hover:border-[#444444] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[15px] font-medium text-[#E0E0E0] mb-1">{role}</h3>
                          <p className="text-[14px] text-[#9CA3AF]">
                            {role === 'Admin' && 'Full system access and control'}
                            {role === 'Manager' && 'Manage team and department tasks'}
                            {role === 'Employee' && 'View personal tasks and schedules'}
                            {role === 'HR' && 'Manage employees and leave requests'}
                          </p>
                        </div>
                        <button className="px-4 py-2 text-[15px] font-medium text-[#009F8E] hover:text-[#12C4D3] transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-8">
                <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-6">
                  Notification Settings
                </h2>
                <div className="space-y-6">
                  {[
                    { title: 'New Employee Onboarding', desc: 'Notify when new employees join' },
                    { title: 'Task Assignments', desc: 'Notify when tasks are assigned' },
                    { title: 'Leave Requests', desc: 'Notify when leave requests are submitted' },
                    { title: 'System Updates', desc: 'Notify about system maintenance' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between p-4 rounded-lg border border-[#333333] bg-[#1F1F1F]"
                    >
                      <div>
                        <h3 className="text-[15px] font-medium text-[#E0E0E0] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[14px] text-[#9CA3AF]">{item.desc}</p>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-full h-full bg-[#333333] rounded-full peer-checked:bg-[#009F8E] transition-colors cursor-pointer"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="px-8 pb-8">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
