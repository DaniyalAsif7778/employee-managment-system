import { Megaphone, Clock, Users, Pin } from 'lucide-react'

const announcements = [
  {
    id: 1,
    title: 'Company All-Hands Meeting',
    content:
      "Join us for our quarterly all-hands meeting this Friday at 10 AM PST. We'll discuss Q1 results and Q2 roadmap.",
    author: 'Admin User',
    date: 'Mar 28, 2026',
    time: '2:30 PM',
    category: 'Company-wide',
    isPinned: true,
    isRead: false,
  },
  {
    id: 2,
    title: 'New Health Insurance Benefits',
    content:
      "We're excited to announce enhanced health insurance benefits starting April 1st. Check your email for detailed information.",
    author: 'Emily Davis',
    date: 'Mar 27, 2026',
    time: '11:00 AM',
    category: 'HR',
    isPinned: true,
    isRead: true,
  },
  {
    id: 3,
    title: 'Office Closure - Public Holiday',
    content:
      'The office will be closed on Friday, April 5th for the public holiday. Enjoy your long weekend!',
    author: 'Admin User',
    date: 'Mar 26, 2026',
    time: '9:15 AM',
    category: 'General',
    isPinned: false,
    isRead: true,
  },
  {
    id: 4,
    title: 'Employee Recognition Program',
    content:
      "Nominations are now open for this month's Employee of the Month award. Submit your nominations by March 31st.",
    author: 'Sarah Johnson',
    date: 'Mar 24, 2026',
    time: '10:30 AM',
    category: 'HR',
    isPinned: false,
    isRead: true,
  },
  {
    id: 5,
    title: 'Team Building Event - April 15',
    content: 'Save the date for our team building event on April 15th. More details coming soon!',
    author: 'Lisa Anderson',
    date: 'Mar 23, 2026',
    time: '3:00 PM',
    category: 'General',
    isPinned: false,
    isRead: false,
  },
]

export default function EmployeeAnnouncements() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Announcements</h1>
        <p className="text-[15px] text-[#9CA3AF]">Stay updated with company news and updates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#009F8E1A] flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-[#009F8E]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Total Announcements</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{announcements.length}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFC1071A] flex items-center justify-center">
              <Pin className="w-5 h-5 text-[#FFC107]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Pinned</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">
            {announcements.filter((a) => a.isPinned).length}
          </p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#12C4D31A] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#12C4D3]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Unread</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">
            {announcements.filter((a) => !a.isRead).length}
          </p>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-[#121212] rounded-xl border transition-all duration-200 overflow-hidden group ${
              announcement.isRead
                ? 'border-[#333333] hover:border-[#444444]'
                : 'border-[#009F8E]/30 hover:border-[#009F8E]/50'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    announcement.isRead ? 'bg-[#009F8E1A]' : 'bg-[#009F8E]'
                  }`}
                >
                  <Megaphone
                    className={`w-5 h-5 ${announcement.isRead ? 'text-[#009F8E]' : 'text-white'}`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {!announcement.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#009F8E]"></span>
                    )}
                    {announcement.isPinned && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#FFC1071A] text-[#FFC107] text-[13px] font-medium">
                        <Pin className="w-3.5 h-3.5" />
                        <span>Pinned</span>
                      </div>
                    )}
                    <span className="px-2.5 py-1 rounded-md bg-[#1F1F1F] text-[#9CA3AF] text-[13px] font-medium">
                      {announcement.category}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-[15px] text-[#9CA3AF] leading-relaxed mb-4">
                    {announcement.content}
                  </p>

                  {/* Meta */}
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
