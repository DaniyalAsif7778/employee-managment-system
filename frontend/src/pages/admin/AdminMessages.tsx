import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info } from 'lucide-react'
import { useState } from 'react'
import MessageProfileSettings from '../../componenets/ui/MessageProfileSettings.js'

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'HR Manager',
    department: 'HR',
    lastMessage: 'Thanks for the update on the new policies',
    timestamp: '2m ago',
    unread: 2,
    status: 'online' as const,
    avatar: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Accountant',
    department: 'Finance',
    lastMessage: 'Can we schedule a meeting tomorrow?',
    timestamp: '15m ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'MC',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Recruiter',
    department: 'HR',
    lastMessage: 'I sent the candidate profiles',
    timestamp: '1h ago',
    unread: 1,
    status: 'offline' as const,
    avatar: 'ED',
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'System Admin',
    department: 'IT',
    lastMessage: 'Server maintenance completed',
    timestamp: '2h ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'DW',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Marketing Lead',
    department: 'Marketing',
    lastMessage: 'Campaign results look great!',
    timestamp: '3h ago',
    unread: 0,
    status: 'away' as const,
    avatar: 'LA',
  },
]

const messages = [
  {
    id: 1,
    sender: 'other',
    text: 'Hi! I wanted to discuss the new employee handbook updates.',
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Sure! What specific sections do you want to review?',
    timestamp: '10:32 AM',
  },
  {
    id: 3,
    sender: 'other',
    text: 'Mainly the remote work policy and the leave request process.',
    timestamp: '10:33 AM',
  },
  {
    id: 4,
    sender: 'me',
    text: 'Perfect. I have the latest drafts ready. Can we meet at 2 PM today?',
    timestamp: '10:35 AM',
  },
  {
    id: 5,
    sender: 'other',
    text: 'Yes, that works for me. Conference room B?',
    timestamp: '10:36 AM',
  },
  { id: 6, sender: 'me', text: 'Yes, see you there!', timestamp: '10:37 AM' },
  {
    id: 7,
    sender: 'other',
    text: 'Thanks for the update on the new policies',
    timestamp: '10:38 AM',
  },
]

export default function AdminMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]!)
  const [searchTerm, setSearchTerm] = useState('')
  const [messageText, setMessageText] = useState('')
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="h-[calc(100vh-120px)]">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Conversations List */}
          <div className="col-span-4 bg-[#121212] rounded-xl border border-[#333333] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#333333]">
              <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-[#1F1F1F] transition-colors border-b border-[#333333] ${
                    selectedConversation.id === conv.id ? 'bg-[#1F1F1F]' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#009F8E] flex items-center justify-center">
                      <span className="text-white text-[14px] font-medium">{conv.avatar}</span>
                    </div>
                    {conv.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00BF6B] border-2 border-[#121212] rounded-full"></div>
                    )}
                    {conv.status === 'away' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#FFC107] border-2 border-[#121212] rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[15px] font-medium text-[#E0E0E0] truncate">
                        {conv.name}
                      </span>
                      <span className="text-[12px] text-[#6B7280] flex-shrink-0 ml-2">
                        {conv.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] text-[#9CA3AF] truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="flex-shrink-0 ml-2 w-5 h-5 rounded-full bg-[#009F8E] flex items-center justify-center text-[11px] text-white font-medium">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 bg-[#121212] rounded-xl border border-[#333333] flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-[#333333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#009F8E] flex items-center justify-center">
                    <span className="text-white text-[14px] font-medium">
                      {selectedConversation.avatar}
                    </span>
                  </div>
                  {selectedConversation.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00BF6B] border-2 border-[#121212] rounded-full"></div>
                  )}
                  {selectedConversation.status === 'away' && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FFC107] border-2 border-[#121212] rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#E0E0E0]">
                    {selectedConversation.name}
                  </h3>
                  <p className="text-[13px] text-[#9CA3AF]">{selectedConversation.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-[#9CA3AF]" />
                </button>
                <button className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-[#9CA3AF]" />
                </button>
                <button
                  onClick={() => setShowProfileSettings(true)}
                  className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
                  title="Chat settings"
                >
                  <Info className="w-5 h-5 text-[#9CA3AF]" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'me'
                          ? 'bg-[#009F8E] text-white'
                          : 'bg-[#1F1F1F] text-[#E0E0E0]'
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{message.text}</p>
                    </div>
                    <p
                      className={`text-[12px] text-[#6B7280] mt-1 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[#333333]">
              <div className="flex items-end gap-3">
                <button className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors flex-shrink-0">
                  <Paperclip className="w-5 h-5 text-[#9CA3AF]" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        // Send message logic
                        setMessageText('')
                      }
                    }}
                  />
                </div>
                <button className="p-3 bg-[#009F8E] hover:bg-[#12C4D3] rounded-lg transition-all duration-200 flex-shrink-0">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Profile Settings */}
      {showProfileSettings && (
        <MessageProfileSettings
          contact={selectedConversation}
          onClose={() => setShowProfileSettings(false)}
        />
      )}
    </>
  )
}
