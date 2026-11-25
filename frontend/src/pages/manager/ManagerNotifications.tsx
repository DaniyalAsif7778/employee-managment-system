import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import { useState } from 'react'

type NotificationType = 'task' | 'leave' | 'message' | 'system'

interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  icon: string
  color: string
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'task',
    title: 'Task assigned to your team',
    message: 'Admin assigned "API Performance Audit" to the Engineering team',
    timestamp: '5 minutes ago',
    read: false,
    icon: '📋',
    color: '#8B5CF6',
  },
  {
    id: 2,
    type: 'leave',
    title: 'Leave request pending',
    message: 'Priya Nair submitted a vacation leave request for Apr 15–16',
    timestamp: '30 minutes ago',
    read: false,
    icon: '📅',
    color: '#FFC107',
  },
  {
    id: 3,
    type: 'message',
    title: 'New message from Alex Turner',
    message: 'The PR is ready for your review',
    timestamp: '1 hour ago',
    read: false,
    icon: '💬',
    color: '#12C4D3',
  },
  {
    id: 4,
    type: 'leave',
    title: 'Leave request approved',
    message: "Jordan Lee's sick leave on Mar 29 has been approved",
    timestamp: '2 hours ago',
    read: true,
    icon: '✅',
    color: '#00BF6B',
  },
  {
    id: 5,
    type: 'task',
    title: 'Task deadline approaching',
    message: '"Sprint Retrospective Notes" is due tomorrow',
    timestamp: '4 hours ago',
    read: true,
    icon: '⏰',
    color: '#EF4444',
  },
  {
    id: 6,
    type: 'system',
    title: 'Performance review cycle starts',
    message: 'Q1 performance reviews begin next week. Start writing evaluations.',
    timestamp: '1 day ago',
    read: true,
    icon: '🔔',
    color: '#8B5CF6',
  },
  {
    id: 7,
    type: 'task',
    title: 'Sprint planning reminder',
    message: 'Sprint planning meeting is tomorrow at 10 AM',
    timestamp: '1 day ago',
    read: true,
    icon: '📌',
    color: '#8B5CF6',
  },
  {
    id: 8,
    type: 'system',
    title: 'System maintenance',
    message: 'Planned maintenance on Sunday 2–4 AM. Services may be unavailable.',
    timestamp: '2 days ago',
    read: true,
    icon: '🔧',
    color: '#6B7280',
  },
]

const filterOptions = ['All', 'Tasks', 'Leave', 'Messages', 'System']

export default function ManagerNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Tasks') return n.type === 'task'
    if (selectedFilter === 'Leave') return n.type === 'leave'
    if (selectedFilter === 'Messages') return n.type === 'message'
    if (selectedFilter === 'System') return n.type === 'system'
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Notifications</h1>
          <p className="text-[15px] text-[#9CA3AF]">
            Stay updated with your team activities and alerts
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-[#333333] text-[#E0E0E0] rounded-lg hover:bg-[#1F1F1F] transition-all duration-200 text-[15px] font-medium"
        >
          <CheckCheck className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#8B5CF61A] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#8B5CF6]" />
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
          <p className="text-[30px] font-semibold text-[#E0E0E0]">3</p>
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
          <Bell className="w-4 h-4 text-[#9CA3AF]" />
          <div className="flex gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-[#8B5CF6] text-white'
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
        {filteredNotifications.length === 0 && (
          <div className="py-16 text-center text-[#6B7280] text-[15px]">
            No notifications in this category.
          </div>
        )}
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 border-b border-[#333333] last:border-0 hover:bg-[#1F1F1F] transition-colors ${!notification.read ? 'bg-[#8B5CF6]/5' : ''}`}
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
                      {!notification.read && <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />}
                    </div>
                    <p className="text-[15px] text-[#9CA3AF] leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-[13px] text-[#6B7280] mt-2">{notification.timestamp}</p>
                  </div>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors ml-4"
                  >
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
