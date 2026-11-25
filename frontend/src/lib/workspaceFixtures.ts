import { z } from 'zod'
import rawWorkspaceData from '../json/workspaceData.json' with { type: 'json' }

const employeeSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  avatar: z.string().optional(),
  department: z.string(),
  departmentId: z.string(),
  position: z.string(),
  role: z.enum(['admins', 'employees', 'managers', 'hrs']),
  status: z.enum(['active', 'inactive', 'on-leave', 'terminated']),
  hireDate: z.string(),
  location: z.string(),
  manager: z.string().optional(),
  managerId: z.string().optional(),
  performanceRating: z.number().optional(),
  completionRate: z.number().optional(),
  tasksCompleted: z.number().optional(),
  totalTasks: z.number().optional(),
  skills: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string().optional(),
  headOfDepartment: z.string(),
  headOfDepartmentId: z.string(),
  employeeCount: z.number(),
  budget: z.number(),
  budgetUsed: z.number(),
  color: z.string(),
  icon: z.string(),
  location: z.string().optional(),
  performanceScore: z.number().optional(),
  completionRate: z.number().optional(),
  activeProjects: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const taskSchema = z.object({
  id: z.string(),
  taskId: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum(['pending', 'in-progress', 'done', 'cancelled', 'overdue', 'on-hold']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  category: z.string(),
  assignee: z.string(),
  assigneeId: z.string(),
  creator: z.string(),
  creatorId: z.string(),
  dueDate: z.string(),
  startDate: z.string().optional(),
  completedDate: z.string().optional(),
  estimatedHours: z.number().optional(),
  actualHours: z.number().optional(),
  progress: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const leaveSchema = z.object({
  id: z.string(),
  leaveId: z.string(),
  employeeId: z.string(),
  employeeName: z.string(),
  type: z.enum([
    'vacation',
    'sick',
    'personal',
    'maternity',
    'paternity',
    'unpaid',
    'bereavement',
    'study',
  ]),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled']),
  startDate: z.string(),
  endDate: z.string(),
  days: z.number(),
  reason: z.string(),
  approver: z.string().optional(),
  approverId: z.string().optional(),
  approvedDate: z.string().optional(),
  rejectionReason: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const announcementSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.enum(['general', 'hr', 'it', 'events', 'policy', 'urgent', 'celebration']),
  priority: z.enum(['low', 'medium', 'high']),
  author: z.string(),
  authorId: z.string(),
  isPinned: z.boolean(),
  publishDate: z.string(),
  expiryDate: z.string().optional(),
  views: z.number(),
  likes: z.number().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const notificationSchema = z.object({
  id: z.string(),
  type: z.enum([
    'task',
    'message',
    'announcement',
    'leave',
    'schedule',
    'system',
    'mention',
    'approval',
    'reminder',
  ]),
  title: z.string(),
  message: z.string(),
  timestamp: z.string(),
  read: z.boolean(),
  icon: z.string(),
  color: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  actionRequired: z.boolean().optional(),
  userId: z.string(),
  createdAt: z.string(),
})

const conversationSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  lastMessage: z.string(),
  timestamp: z.string(),
  unread: z.number(),
  online: z.boolean(),
  avatar: z.string(),
  userId: z.string(),
  isGroup: z.boolean().optional(),
  participants: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const messageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  sender: z.enum(['me', 'other']),
  senderId: z.string(),
  senderName: z.string(),
  text: z.string(),
  timestamp: z.string(),
  read: z.boolean(),
  type: z.enum(['text', 'image', 'file', 'voice', 'video', 'system']),
  createdAt: z.string(),
})

const scheduleEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(['meeting', 'task', 'event', 'reminder', 'break', 'training', 'interview']),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.string(),
  location: z.string(),
  organizer: z.string(),
  organizerId: z.string(),
  attendees: z.array(z.string()),
  attendeeIds: z.array(z.string()),
  status: z.enum(['scheduled', 'in-progress', 'completed', 'cancelled']),
  meetingLink: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const candidateSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  appliedAt: z.string(),
  stage: z.enum(['Applied', 'Screening', 'Interview', 'Offer']),
})

const openPositionSchema = z.object({
  id: z.string(),
  title: z.string(),
  department: z.string(),
  employmentType: z.string(),
  applicants: z.number(),
  status: z.enum(['open', 'paused', 'closed']),
})

const onboardingSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  employeeName: z.string(),
  role: z.string(),
  department: z.string(),
  startDate: z.string(),
  checklist: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      completed: z.boolean(),
    })
  ),
})

const organizationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  industry: z.string(),
  website: z.string().url(),
  address: z.string(),
  timezone: z.string(),
  memberCount: z.number(),
})

const reportTrendSchema = z.object({
  period: z.string(),
  completed: z.number(),
  onTime: z.number(),
})

export const workspaceFixtures = {
  employees: z.array(employeeSchema).parse(rawWorkspaceData.employees),
  departments: z.array(departmentSchema).parse(rawWorkspaceData.departments),
  tasks: z.array(taskSchema).parse(rawWorkspaceData.tasks),
  leaves: z.array(leaveSchema).parse(rawWorkspaceData.leaves),
  announcements: z.array(announcementSchema).parse(rawWorkspaceData.announcements),
  notifications: z.array(notificationSchema).parse(rawWorkspaceData.notifications),
  conversations: z.array(conversationSchema).parse(rawWorkspaceData.conversations),
  messages: z.array(messageSchema).parse(rawWorkspaceData.messages),
  schedule: z.array(scheduleEventSchema).parse(rawWorkspaceData.schedule),
  candidates: z.array(candidateSchema).parse(rawWorkspaceData.candidates),
  openPositions: z.array(openPositionSchema).parse(rawWorkspaceData.openPositions),
  onboarding: z.array(onboardingSchema).parse(rawWorkspaceData.onboarding),
  organization: organizationSchema.parse(rawWorkspaceData.organization),
  reportTrends: z.array(reportTrendSchema).parse(rawWorkspaceData.reportTrends),
}
