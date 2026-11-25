import {
  X,
  Bell,
  BellOff,
  Archive,
  Trash2,
  UserX,
  Volume2,
  VolumeX,
  Moon,
  Star,
} from 'lucide-react'
import { useState } from 'react'

interface Contact {
  id: number
  name: string
  avatar: string
  role?: string
  department?: string
  status: 'online' | 'offline' | 'away'
}

interface MessageProfileSettingsProps {
  contact: Contact
  onClose: () => void
}

export default function MessageProfileSettings({ contact, onClose }: MessageProfileSettingsProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [isStarred, setIsStarred] = useState(false)

  const handleArchiveChat = () => {
    console.log('Archive chat with:', contact.name)
    onClose()
  }

  const handleBlockUser = () => {
    console.log('Block user:', contact.name)
    onClose()
  }

  const handleDeleteChat = () => {
    console.log('Delete chat with:', contact.name)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Settings Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#000000] border-l border-[#333333] z-50 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-[#000000] border-b border-[#333333] p-6 z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Chat Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#009F8E] to-[#12C4D3] flex items-center justify-center text-white text-[28px] font-semibold ring-4 ring-[#1F1F1F]">
                {contact.avatar}
              </div>
              <div
                className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-[#000000] ${
                  contact.status === 'online'
                    ? 'bg-[#00BF6B]'
                    : contact.status === 'away'
                      ? 'bg-[#FFC107]'
                      : 'bg-[#6B7280]'
                }`}
              ></div>
            </div>
            <h3 className="text-[20px] font-semibold text-[#E0E0E0] mb-1">{contact.name}</h3>
            {contact.role && <p className="text-[14px] text-[#9CA3AF] mb-1">{contact.role}</p>}
            {contact.department && (
              <p className="text-[13px] text-[#6B7280]">{contact.department}</p>
            )}
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium ${
                  contact.status === 'online'
                    ? 'bg-[#00BF6B]/10 text-[#00BF6B]'
                    : contact.status === 'away'
                      ? 'bg-[#FFC107]/10 text-[#FFC107]'
                      : 'bg-[#6B7280]/10 text-[#6B7280]'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    contact.status === 'online'
                      ? 'bg-[#00BF6B]'
                      : contact.status === 'away'
                        ? 'bg-[#FFC107]'
                        : 'bg-[#6B7280]'
                  }`}
                ></div>
                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
            <div className="p-4 border-b border-[#333333]">
              <h4 className="text-[16px] font-semibold text-[#E0E0E0]">Quick Actions</h4>
            </div>
            <div className="p-2">
              <button
                onClick={() => setIsStarred(!isStarred)}
                className="w-full flex items-center justify-between p-3 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Star
                    className={`w-4 h-4 ${isStarred ? 'text-[#FFC107] fill-[#FFC107]' : 'text-[#9CA3AF]'}`}
                  />
                  <span className="text-[14px] text-[#E0E0E0]">Star Conversation</span>
                </div>
                <div
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    isStarred ? 'bg-[#009F8E]' : 'bg-[#333333]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                      isStarred ? 'left-[18px]' : 'left-0.5'
                    }`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
            <div className="p-4 border-b border-[#333333]">
              <h4 className="text-[16px] font-semibold text-[#E0E0E0]">Notifications</h4>
            </div>
            <div className="p-2 space-y-1">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="w-full flex items-center justify-between p-3 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  {notificationsEnabled ? (
                    <Bell className="w-4 h-4 text-[#009F8E]" />
                  ) : (
                    <BellOff className="w-4 h-4 text-[#6B7280]" />
                  )}
                  <div className="text-left">
                    <p className="text-[14px] text-[#E0E0E0]">Enable Notifications</p>
                    <p className="text-[12px] text-[#6B7280]">Get alerts for new messages</p>
                  </div>
                </div>
                <div
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    notificationsEnabled ? 'bg-[#009F8E]' : 'bg-[#333333]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                      notificationsEnabled ? 'left-[18px]' : 'left-0.5'
                    }`}
                  ></div>
                </div>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-full flex items-center justify-between p-3 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-[#6B7280]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#009F8E]" />
                  )}
                  <div className="text-left">
                    <p className="text-[14px] text-[#E0E0E0]">Mute Conversation</p>
                    <p className="text-[12px] text-[#6B7280]">Silence notifications</p>
                  </div>
                </div>
                <div
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    isMuted ? 'bg-[#009F8E]' : 'bg-[#333333]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                      isMuted ? 'left-[18px]' : 'left-0.5'
                    }`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Privacy & Support */}
          <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
            <div className="p-4 border-b border-[#333333]">
              <h4 className="text-[16px] font-semibold text-[#E0E0E0]">Privacy & Support</h4>
            </div>
            <div className="p-2 space-y-1">
              <button
                onClick={handleArchiveChat}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#1F1F1F] rounded-lg transition-colors text-left"
              >
                <Archive className="w-4 h-4 text-[#9CA3AF]" />
                <div>
                  <p className="text-[14px] text-[#E0E0E0]">Archive Chat</p>
                  <p className="text-[12px] text-[#6B7280]">Hide this conversation</p>
                </div>
              </button>

              <button
                onClick={handleBlockUser}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#1F1F1F] rounded-lg transition-colors text-left"
              >
                <UserX className="w-4 h-4 text-[#9CA3AF]" />
                <div>
                  <p className="text-[14px] text-[#E0E0E0]">Block User</p>
                  <p className="text-[12px] text-[#6B7280]">Stop receiving messages</p>
                </div>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#121212] rounded-xl border border-[#EF4444]/30 overflow-hidden">
            <div className="p-4 border-b border-[#333333]">
              <h4 className="text-[16px] font-semibold text-[#EF4444]">Danger Zone</h4>
            </div>
            <div className="p-2">
              <button
                onClick={handleDeleteChat}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#EF4444]/10 rounded-lg transition-colors text-left"
              >
                <Trash2 className="w-4 h-4 text-[#EF4444]" />
                <div>
                  <p className="text-[14px] text-[#EF4444] font-medium">Delete Conversation</p>
                  <p className="text-[12px] text-[#9CA3AF]">Permanently delete all messages</p>
                </div>
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#121212] rounded-xl border border-[#333333] p-4">
            <h4 className="text-[14px] font-semibold text-[#E0E0E0] mb-3">About</h4>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Total Messages</span>
                <span className="text-[#E0E0E0] font-medium">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Media Shared</span>
                <span className="text-[#E0E0E0] font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">First Message</span>
                <span className="text-[#E0E0E0] font-medium">Mar 15, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
