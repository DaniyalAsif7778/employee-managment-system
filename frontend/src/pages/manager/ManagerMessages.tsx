import { Search, Send, Phone, Video, Info } from 'lucide-react'
import { useState } from 'react'

const conversations = [
  {
    id: 1,
    name: 'Alex Turner',
    role: 'Senior Developer',
    department: 'Engineering',
    lastMessage: 'The PR is ready for review',
    timestamp: '3m ago',
    unread: 2,
    status: 'online' as const,
    avatar: 'AT',
  },
  {
    id: 2,
    name: 'Priya Nair',
    role: 'Frontend Engineer',
    department: 'Engineering',
    lastMessage: "Thanks, I'll fix the bug today",
    timestamp: '20m ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'PN',
  },
  {
    id: 3,
    name: 'Jordan Lee',
    role: 'Backend Engineer',
    department: 'Engineering',
    lastMessage: 'Can we chat about the sprint?',
    timestamp: '1h ago',
    unread: 1,
    status: 'away' as const,
    avatar: 'JL',
  },
  {
    id: 4,
    name: 'Sam Okafor',
    role: 'QA Engineer',
    department: 'Engineering',
    lastMessage: 'All tests passing now',
    timestamp: '2h ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'SO',
  },
  {
    id: 5,
    name: 'Maya Patel',
    role: 'DevOps Engineer',
    department: 'Engineering',
    lastMessage: 'Deployment scheduled for Friday',
    timestamp: '3h ago',
    unread: 0,
    status: 'offline' as const,
    avatar: 'MP',
  },
  {
    id: 6,
    name: 'Chris Wong',
    role: 'Mobile Developer',
    department: 'Engineering',
    lastMessage: 'iOS build looks good',
    timestamp: '5h ago',
    unread: 0,
    status: 'online' as const,
    avatar: 'CW',
  },
]

const initialMessages: Record<
  number,
  { id: number; sender: 'me' | 'other'; text: string; timestamp: string }[]
> = {
  1: [
    {
      id: 1,
      sender: 'other',
      text: 'Hey Marcus, I pushed the new feature to the repo.',
      timestamp: '9:00 AM',
    },
    {
      id: 2,
      sender: 'me',
      text: "Nice work! I'll take a look after standup.",
      timestamp: '9:05 AM',
    },
    { id: 3, sender: 'other', text: 'The PR is ready for review', timestamp: '9:10 AM' },
  ],
  2: [
    {
      id: 1,
      sender: 'other',
      text: 'Found a styling bug on the dashboard page.',
      timestamp: '8:30 AM',
    },
    { id: 2, sender: 'me', text: 'Can you attach a screenshot?', timestamp: '8:32 AM' },
    { id: 3, sender: 'other', text: "Thanks, I'll fix the bug today", timestamp: '8:45 AM' },
  ],
  3: [
    { id: 1, sender: 'other', text: 'Hi, do you have 10 minutes?', timestamp: '7:50 AM' },
    { id: 2, sender: 'me', text: "Sure, what's up?", timestamp: '7:55 AM' },
    { id: 3, sender: 'other', text: 'Can we chat about the sprint?', timestamp: '8:00 AM' },
  ],
  4: [
    { id: 1, sender: 'me', text: 'Did the regression suite pass?', timestamp: '6:00 AM' },
    { id: 2, sender: 'other', text: 'Running now...', timestamp: '6:15 AM' },
    { id: 3, sender: 'other', text: 'All tests passing now', timestamp: '6:45 AM' },
  ],
  5: [
    { id: 1, sender: 'other', text: 'Staging environment is ready.', timestamp: '5:00 AM' },
    { id: 2, sender: 'me', text: "Great, let's plan the prod deploy.", timestamp: '5:30 AM' },
    { id: 3, sender: 'other', text: 'Deployment scheduled for Friday', timestamp: '5:35 AM' },
  ],
  6: [
    {
      id: 1,
      sender: 'other',
      text: 'Just submitted the iOS build to TestFlight.',
      timestamp: '4:00 AM',
    },
    { id: 2, sender: 'me', text: 'Any blockers?', timestamp: '4:10 AM' },
    { id: 3, sender: 'other', text: 'iOS build looks good', timestamp: '4:15 AM' },
  ],
}

export default function ManagerMessages() {
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
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px]"
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
                    <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center">
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
                        <span className="flex-shrink-0 ml-2 w-5 h-5 rounded-full bg-[#8B5CF6] flex items-center justify-center text-[11px] text-white font-medium">
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
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center">
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
                      className={`rounded-2xl px-4 py-3 ${message.sender === 'me' ? 'bg-[#8B5CF6] text-white' : 'bg-[#1F1F1F] text-[#E0E0E0]'}`}
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
                    className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all text-[15px] resize-none"
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
                  className="p-3 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg transition-all duration-200 flex-shrink-0"
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
