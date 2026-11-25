import { Plus, Megaphone, Clock, Users, Pin, MoreVertical, X, Trash2, Edit } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const initialAnnouncements = [
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
    views: 247,
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
    views: 189,
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
    views: 203,
  },
  {
    id: 4,
    title: 'New Engineering Policies',
    content:
      'Updated code review guidelines and deployment procedures are now live. Please review the documentation.',
    author: 'David Wilson',
    date: 'Mar 25, 2026',
    time: '3:45 PM',
    category: 'Engineering',
    isPinned: false,
    views: 156,
  },
  {
    id: 5,
    title: 'Employee Recognition Program',
    content:
      "Nominations are now open for this month's Employee of the Month award. Submit your nominations by March 31st.",
    author: 'Sarah Johnson',
    date: 'Mar 24, 2026',
    time: '10:30 AM',
    category: 'HR',
    isPinned: false,
    views: 178,
  },
]

const categories = ['All', 'Company-wide', 'HR', 'Engineering', 'General']

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [newForm, setNewForm] = useState({
    title: '',
    content: '',
    category: 'General',
    isPinned: false,
  })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredAnnouncements = announcements.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  )

  const handleCreate = () => {
    if (!newForm.title.trim() || !newForm.content.trim()) return
    const now = new Date()
    setAnnouncements((prev) => [
      {
        id: Date.now(),
        title: newForm.title,
        content: newForm.content,
        author: 'Admin User',
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        category: newForm.category,
        isPinned: newForm.isPinned,
        views: 0,
      },
      ...prev,
    ])
    setNewForm({ title: '', content: '', category: 'General', isPinned: false })
    setShowNewModal(false)
  }

  const handleSaveEdit = () => {
    if (!editingAnnouncement) return
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === editingAnnouncement.id ? { ...a, ...editingAnnouncement } : a))
    )
    setEditingAnnouncement(null)
  }

  const handleDelete = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    setShowDeleteConfirm(null)
  }

  const togglePin = (id: number) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a)))
    setOpenDropdown(null)
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[#E0E0E0] mb-2">Announcements</h1>
          <p className="text-[15px] text-[#9CA3AF]">Create and manage company announcements</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <Users className="w-5 h-5 text-[#12C4D3]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">Total Views</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">
            {announcements.reduce((sum, a) => sum + a.views, 0)}
          </p>
        </div>
        <div className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00BF6B1A] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#00BF6B]" />
            </div>
            <p className="text-[14px] text-[#9CA3AF] font-medium">This Week</p>
          </div>
          <p className="text-[30px] font-semibold text-[#E0E0E0]">3</p>
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
                ? 'bg-[#009F8E] text-white'
                : 'bg-[#121212] text-[#9CA3AF] border border-[#333333] hover:border-[#444444] hover:text-[#E0E0E0]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4" ref={dropdownRef}>
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-16 text-[#6B7280] text-[15px]">
            No announcements in this category.
          </div>
        )}
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-[#121212] rounded-xl border border-[#333333] hover:border-[#444444] transition-all duration-200 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-[#009F8E1A] flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-5 h-5 text-[#009F8E]" />
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
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{announcement.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Three-dots menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === announcement.id ? null : announcement.id)
                    }
                    className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                  {openDropdown === announcement.id && (
                    <div className="absolute right-0 top-10 w-44 bg-[#1F1F1F] border border-[#333333] rounded-xl shadow-xl z-20 overflow-hidden">
                      <button
                        onClick={() => {
                          setEditingAnnouncement({ ...announcement })
                          setOpenDropdown(null)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
                      >
                        <Edit className="w-4 h-4 text-[#9CA3AF]" />
                        Edit
                      </button>
                      <button
                        onClick={() => togglePin(announcement.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
                      >
                        <Pin className="w-4 h-4 text-[#9CA3AF]" />
                        {announcement.isPinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteConfirm(announcement.id)
                          setOpenDropdown(null)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-[#EF4444] hover:bg-[#2A2A2A] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#333333]">
              <h2 className="text-[20px] font-semibold text-[#E0E0E0]">New Announcement</h2>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">Title</label>
                <input
                  type="text"
                  value={newForm.title}
                  onChange={(e) => setNewForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Announcement title..."
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">Content</label>
                <textarea
                  rows={4}
                  value={newForm.content}
                  onChange={(e) => setNewForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Write your announcement..."
                  className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] resize-none"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Category
                </label>
                <select
                  value={newForm.category}
                  onChange={(e) => setNewForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                >
                  {categories
                    .filter((c) => c !== 'All')
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newForm.isPinned}
                  onChange={(e) => setNewForm((f) => ({ ...f, isPinned: e.target.checked }))}
                  className="w-4 h-4 accent-[#009F8E]"
                />
                <span className="text-[15px] text-[#E0E0E0]">Pin this announcement</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t border-[#333333]">
              <button
                onClick={() => setShowNewModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newForm.title.trim() || !newForm.content.trim()}
                className="flex-1 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingAnnouncement && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#333333]">
              <h2 className="text-[20px] font-semibold text-[#E0E0E0]">Edit Announcement</h2>
              <button
                onClick={() => setEditingAnnouncement(null)}
                className="p-2 hover:bg-[#1F1F1F] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">Title</label>
                <input
                  type="text"
                  value={editingAnnouncement.title}
                  onChange={(e) =>
                    setEditingAnnouncement((a: any) => ({ ...a, title: e.target.value }))
                  }
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">Content</label>
                <textarea
                  rows={4}
                  value={editingAnnouncement.content}
                  onChange={(e) =>
                    setEditingAnnouncement((a: any) => ({ ...a, content: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] resize-none"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#9CA3AF] mb-2">
                  Category
                </label>
                <select
                  value={editingAnnouncement.category}
                  onChange={(e) =>
                    setEditingAnnouncement((a: any) => ({ ...a, category: e.target.value }))
                  }
                  className="w-full h-10 px-4 rounded-lg border border-[#333333] bg-[#1F1F1F] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px]"
                >
                  {categories
                    .filter((c) => c !== 'All')
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-[#333333]">
              <button
                onClick={() => setEditingAnnouncement(null)}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2.5 bg-[#009F8E] text-white rounded-lg hover:bg-[#12C4D3] transition-all duration-200 text-[15px] font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-[#333333] w-full max-w-sm shadow-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#EF44441A] flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-[#EF4444]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#E0E0E0] mb-2">Delete Announcement</h3>
            <p className="text-[15px] text-[#9CA3AF] mb-6">
              This action cannot be undone. The announcement will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-[#333333] text-[#9CA3AF] rounded-lg hover:bg-[#1F1F1F] transition-colors text-[15px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-all duration-200 text-[15px] font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
