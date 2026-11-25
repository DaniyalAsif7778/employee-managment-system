import { Megaphone, Clock, Pin } from 'lucide-react'
import { useState } from 'react'

const initialAnnouncements = [
  {
    id: 1,
    title: 'Engineering All-Hands Meeting',
    content:
      "Join us for the quarterly engineering all-hands this Thursday at 2 PM. We'll review sprint outcomes and plan for Q2.",
    author: 'Admin User',
    date: 'Mar 28, 2026',
    time: '10:00 AM',
    category: 'Engineering',
    isPinned: true,
    isRead: false,
  },
  {
    id: 2,
    title: 'New Health Insurance Benefits',
    content:
      'Enhanced health insurance benefits are now active starting April 1st. Check your email for the full breakdown.',
    author: 'Sandra Kim',
    date: 'Mar 27, 2026',
    time: '11:00 AM',
    category: 'HR',
    isPinned: true,
    isRead: false,
  },
  {
    id: 3,
    title: 'Updated Code Review Guidelines',
    content:
      'The engineering team has updated code review standards. Please read the updated guidelines in Confluence before your next PR.',
    author: 'Marcus Reid',
    date: 'Mar 26, 2026',
    time: '3:00 PM',
    category: 'Engineering',
    isPinned: false,
    isRead: true,
  },
  {
    id: 4,
    title: 'Office Closure – Public Holiday',
    content: 'The office will be closed on Friday, April 5th. Enjoy the long weekend!',
    author: 'Admin User',
    date: 'Mar 25, 2026',
    time: '9:00 AM',
    category: 'General',
    isPinned: false,
    isRead: true,
  },
  {
    id: 5,
    title: 'Employee Recognition Nominations Open',
    content: 'Nominate a team member for Employee of the Month. Submissions close March 31st.',
    author: 'Sandra Kim',
    date: 'Mar 24, 2026',
    time: '10:30 AM',
    category: 'HR',
    isPinned: false,
    isRead: true,
  },
]

const categories = ['All', 'Engineering', 'HR', 'General', 'Company-wide']

export default function ManagerAnnouncements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredAnnouncements = announcements.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  )

  const total = announcements.length
  const pinned = announcements.filter((a) => a.isPinned).length
  const unread = announcements.filter((a) => !a.isRead).length

  const markRead = (id: number) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)))
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Announcements</h1>
          <p className="text-[15px] text-[#9CA3AF]">
            Stay up to date with company and team announcements
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#8B5CF61A] flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Total</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{total}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFC1071A] flex items-center justify-center">
              <Pin className="w-5 h-5 text-[#FFC107]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Pinned</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{pinned}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#EF44441A] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#EF4444]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Unread</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{unread}</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-[#121212] text-[#9CA3AF] border border-[#333333] hover:border-[#444444] hover:text-[#E0E0E0]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-16 text-[#6B7280] text-[15px]">
            No announcements in this category.
          </div>
        )}
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            onClick={() => markRead(announcement.id)}
            className={`bg-[#121212] rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${
              !announcement.isRead
                ? 'border-[#8B5CF6]/40'
                : 'border-[#333333] hover:border-[#444444]'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${!announcement.isRead ? 'bg-[#8B5CF61A]' : 'bg-[#1F1F1F]'}`}
                >
                  <Megaphone
                    className={`w-5 h-5 ${!announcement.isRead ? 'text-[#8B5CF6]' : 'text-[#6B7280]'}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {announcement.isPinned && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#FFC1071A] text-[#FFC107] text-[13px] font-medium">
                        <Pin className="w-3.5 h-3.5" />
                        <span>Pinned</span>
                      </div>
                    )}
                    <span className="px-2.5 py-1 rounded-md bg-[#1F1F1F] text-[#9CA3AF] text-[13px] font-medium">
                      {announcement.category}
                    </span>
                    {!announcement.isRead && (
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#8B5CF61A] text-[#8B5CF6] text-[13px] font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-[15px] text-[#9CA3AF] leading-relaxed mb-4">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-4 text-[14px] text-[#6B7280]">
                    <span className="font-medium text-[#9CA3AF]">{announcement.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {announcement.date} at {announcement.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
