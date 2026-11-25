import { Search, Send, Phone, Video, Info } from 'lucide-react'
import { useState } from 'react'

const conversations = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Software Developer',
    department: 'Engineering',
    lastMessage: 'I submitted my leave request',
    timestamp: '5m ago',
    unread: 3,
    status: 'online' as const,
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'HR Manager',
    department: 'HR',
    lastMessage: 'Can you review the new policy draft?',
    timestamp: '20m ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'SJ',
  },
  {
    id: 3,
    name: 'Marcus Reid',
    role: 'Engineering Manager',
    department: 'Engineering',
    lastMessage: 'Thanks for onboarding Noah so quickly',
    timestamp: '1h ago',
    unread: 1,
    status: 'away' as const,
    avatar: 'MR',
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'Senior Accountant',
    department: 'Finance',
    lastMessage: 'Payroll details sent over',
    timestamp: '2h ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'MC',
  },
  {
    id: 5,
    name: 'Emily Davis',
    role: 'Recruiter',
    department: 'HR',
    lastMessage: 'Interview scheduled for Thursday',
    timestamp: '3h ago',
    unread: 0,
    status: 'offline' as const,
    avatar: 'ED',
  },
  {
    id: 6,
    name: 'David Wilson',
    role: 'System Admin',
    department: 'IT',
    lastMessage: 'New employee accounts are set up',
    timestamp: '5h ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'DW',
  },
]

const initialMessages: Record<
  number,
  { id: number; sender: 'me' | 'other'; text: string; timestamp: string }[]
> = {
  1: [
    { id: 1, sender: 'other', text: "Hi Sandra, hope you're well!", timestamp: '9:00 AM' },
    { id: 2, sender: 'me', text: "Hi John! Yes, doing great. What's up?", timestamp: '9:02 AM' },
    { id: 3, sender: 'other', text: 'I submitted my leave request', timestamp: '9:05 AM' },
  ],
  2: [
    {
      id: 1,
      sender: 'other',
      text: 'Morning Sandra! I finished the policy update.',
      timestamp: '8:30 AM',
    },
    { id: 2, sender: 'me', text: 'Great, please send it over when ready.', timestamp: '8:35 AM' },
    { id: 3, sender: 'other', text: 'Can you review the new policy draft?', timestamp: '8:40 AM' },
  ],
  3: [
    {
      id: 1,
      sender: 'other',
      text: "Hey Sandra, Noah's onboarding is going well.",
      timestamp: '7:50 AM',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Glad to hear it! Let me know if anything is needed.',
      timestamp: '7:55 AM',
    },
    { id: 3, sender: 'other', text: 'Thanks for onboarding Noah so quickly', timestamp: '8:00 AM' },
  ],
  4: [
    {
      id: 1,
      sender: 'me',
      text: 'Hi Michael, can you confirm the payroll for April?',
      timestamp: '6:00 AM',
    },
    { id: 2, sender: 'other', text: 'Sure, processing now.', timestamp: '6:15 AM' },
    { id: 3, sender: 'other', text: 'Payroll details sent over', timestamp: '6:45 AM' },
  ],
  5: [
    {
      id: 1,
      sender: 'me',
      text: 'Emily, can we schedule the product designer interview?',
      timestamp: '5:00 AM',
    },
    { id: 2, sender: 'other', text: 'Coordinating with the candidate now.', timestamp: '5:20 AM' },
    { id: 3, sender: 'other', text: 'Interview scheduled for Thursday', timestamp: '5:35 AM' },
  ],
  6: [
    {
      id: 1,
      sender: 'me',
      text: 'David, please set up accounts for Noah Williams.',
      timestamp: '4:00 AM',
    },
    {
      id: 2,
      sender: 'other',
      text: 'On it! Email, Slack and JIRA being set up.',
      timestamp: '4:10 AM',
    },
    { id: 3, sender: 'other', text: 'New employee accounts are set up', timestamp: '4:30 AM' },
  ],
}

export default function HRMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]!)
  const [searchTerm, setSearchTerm] = useState('')
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState(initialMessages)

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSend = () => {
    if (!messageText.trim()) return
    const now = new Date()
    const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => ({
      ...prev,
      [selectedConversation.id]: [
        ...(prev[selectedConversation.id] || []),
        { id: Date.now(), sender: 'me', text: messageText.trim(), timestamp },
      ],
    }))
    setMessageText('')
  }

  const currentMessages = messages[selectedConversation.id] || []

  return (
    <>
      <div className="h-[calc(100vh-120px)]">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Conversations List */}
          <div className="col-span-4 bg-[#121212] rounded-xl border border-[#333333] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-[#333333]">
              <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px]"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-[#1F1F1F] transition-colors border-b border-[#333333] ${selectedConversation.id === conv.id ? 'bg-[#1F1F1F]' : ''}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#EC4899] flex items-center justify-center">
                      <span className="text-white text-[14px] font-medium">{conv.avatar}</span>
                    </div>
                    {conv.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00BF6B] border-2 border-[#121212] rounded-full" />
                    )}
                    {conv.status === 'away' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#FFC107] border-2 border-[#121212] rounded-full" />
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
                        <span className="flex-shrink-0 ml-2 w-5 h-5 rounded-full bg-[#EC4899] flex items-center justify-center text-[11px] text-white font-medium">
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
            <div className="p-4 border-b border-[#333333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#EC4899] flex items-center justify-center">
                    <span className="text-white text-[14px] font-medium">
                      {selectedConversation.avatar}
                    </span>
                  </div>
                  {selectedConversation.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00BF6B] border-2 border-[#121212] rounded-full" />
                  )}
                  {selectedConversation.status === 'away' && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FFC107] border-2 border-[#121212] rounded-full" />
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
                <button className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors">
                  <Info className="w-5 h-5 text-[#9CA3AF]" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-3 ${message.sender === 'me' ? 'bg-[#EC4899] text-white' : 'bg-[#1F1F1F] text-[#E0E0E0]'}`}
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

            <div className="p-4 border-t border-[#333333]">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all text-[15px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleSend}
                  className="p-3 bg-[#EC4899] hover:bg-[#DB2777] rounded-lg transition-all duration-200 flex-shrink-0"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
