import { Bell, CheckCheck, Settings, Trash2, Filter } from 'lucide-react'
import { useState } from 'react'

const notifications = [
  {
    id: 1,
    type: 'task',
    title: 'Task completed',
    message: 'Your task "Review project proposal" has been marked as complete',
    timestamp: '10 minutes ago',
    read: false,
    icon: '✅',
    color: '#00BF6B',
  },
  {
    id: 2,
    type: 'task',
    title: 'New task assigned',
    message: 'David Wilson assigned you "System security audit"',
    timestamp: '30 minutes ago',
    read: false,
    icon: '📋',
    color: '#009F8E',
  },
  {
    id: 3,
    type: 'message',
    title: 'New message from David Wilson',
    message: 'Your task has been approved',
    timestamp: '1 hour ago',
    read: true,
    icon: '💬',
    color: '#12C4D3',
  },
  {
    id: 4,
    type: 'leave',
    title: 'Leave request approved',
    message: 'Your vacation leave from Apr 20-21 has been approved',
    timestamp: '2 hours ago',
    read: true,
    icon: '🎉',
    color: '#00BF6B',
  },
  {
    id: 5,
    type: 'announcement',
    title: 'New company announcement',
    message: 'Company all-hands meeting scheduled for Friday',
    timestamp: '4 hours ago',
    read: true,
    icon: '📢',
    color: '#FFC107',
  },
  {
    id: 6,
    type: 'schedule',
    title: 'Meeting reminder',
    message: 'Team standup meeting in 30 minutes',
    timestamp: '6 hours ago',
    read: true,
    icon: '⏰',
    color: '#EF4444',
  },
]

const filterOptions = ['All', 'Unread', 'Tasks', 'Messages', 'Announcements']

export default function EmployeeNotifications() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredNotifications = notifications.filter((notif) => {
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Unread') return !notif.read
    if (selectedFilter === 'Tasks') return notif.type === 'task'
    if (selectedFilter === 'Messages') return notif.type === 'message'
    if (selectedFilter === 'Announcements') return notif.type === 'announcement'
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Notifications</h1>
          <p className="text-[15px] text-[#9CA3AF]">Stay updated with your activities and alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-[#333333] text-[#E0E0E0] rounded-lg hover:bg-[#1F1F1F] transition-all duration-200 text-[15px] font-medium">
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-[#333333] text-[#E0E0E0] rounded-lg hover:bg-[#1F1F1F] transition-all duration-200 text-[15px] font-medium">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#009F8E1A] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#009F8E]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Total</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{notifications.length}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFC1071A] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#FFC107]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Unread</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">{unreadCount}</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#12C4D31A] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#12C4D3]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Today</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">4</p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00BF6B1A] flex items-center justify-center">
              <CheckCheck className="w-5 h-5 text-[#00BF6B]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Read</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">
            {notifications.length - unreadCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] p-4 mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-[#9CA3AF]" />
          <div className="flex gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-[#009F8E] text-white'
                    : 'bg-[#1F1F1F] text-[#9CA3AF] hover:text-[#E0E0E0] hover:bg-[#2A2A2A]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-[#121212] rounded-xl border border-[#333333] overflow-hidden">
        {filteredNotifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`p-6 border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors ${
              !notification.read ? 'bg-[#009F8E]/5' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-[20px]"
                style={{ backgroundColor: `${notification.color}1A` }}
              >
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[16px] font-semibold text-[#E0E0E0]">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-[#009F8E]"></span>
                      )}
                    </div>
                    <p className="text-[15px] text-[#9CA3AF] leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-[13px] text-[#6B7280] mt-2">{notification.timestamp}</p>
                  </div>
                  <button className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors ml-4">
                    <Trash2 className="w-4 h-4 text-[#EF4444]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
