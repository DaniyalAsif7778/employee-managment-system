// ============================================
// EMPLOYEE MANAGEMENT SYSTEM - DATA STRUCTURES
// ============================================

// ==================== USER & AUTHENTICATION ====================

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export type UserRole = 'admin' | 'employee' | 'manager';
  
  export interface AuthUser extends User {
    token: string;
    refreshToken: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }
  
  // ==================== EMPLOYEES ====================
  
  export interface Employee {
    id: string;
    employeeId: string; // e.g., "EMP001"
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
    department: string;
    departmentId: string;
    position: string;
    role: EmployeeRole;
    status: EmployeeStatus;
    salary?: number;
    hireDate: string;
    location: string;
    manager?: string;
    managerId?: string;
    skills?: string[];
    bio?: string;
    dateOfBirth?: string;
    address?: Address;
    emergencyContact?: EmergencyContact;
    performanceRating?: number;
    completionRate?: number;
    tasksCompleted?: number;
    totalTasks?: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export type EmployeeRole = 'admin' | 'employee' | 'manager' | 'team-lead';
  
  export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated';
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  }
  
  // ==================== DEPARTMENTS ====================
  
  export interface Department {
    id: string;
    name: string;
    code: string; // e.g., "HR", "IT", "FIN"
    description?: string;
    headOfDepartment: string;
    headOfDepartmentId: string;
    employeeCount: number;
    budget: number;
    budgetUsed: number;
    color: string;
    icon: string;
    location?: string;
    performanceScore?: number;
    completionRate?: number;
    activeProjects?: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface DepartmentStats {
    departmentId: string;
    departmentName: string;
    totalEmployees: number;
    activeEmployees: number;
    totalTasks: number;
    completedTasks: number;
    completionRate: number;
    averagePerformance: number;
    budget: number;
    budgetUtilization: number;
  }
  
  // ==================== TASKS ====================
  
  export interface Task {
    id: string;
    taskId: string; // e.g., "TASK-001"
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: string;
    assignee: string;
    assigneeId: string;
    assigneeAvatar?: string;
    creator: string;
    creatorId: string;
    dueDate: string;
    startDate?: string;
    completedDate?: string;
    estimatedHours?: number;
    actualHours?: number;
    tags?: string[];
    attachments?: Attachment[];
    comments?: Comment[];
    subtasks?: SubTask[];
    progress?: number; // 0-100
    createdAt: string;
    updatedAt: string;
  }
  
  export type TaskStatus = 
    | 'pending' 
    | 'in-progress' 
    | 'done' 
    | 'cancelled' 
    | 'overdue' 
    | 'on-hold';
  
  export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
  
  export interface SubTask {
    id: string;
    title: string;
    completed: boolean;
    completedAt?: string;
  }
  
  export interface Attachment {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
  }
  
  export interface Comment {
    id: string;
    text: string;
    author: string;
    authorId: string;
    authorAvatar?: string;
    createdAt: string;
    updatedAt?: string;
    mentions?: string[];
  }
  
  // ==================== MESSAGES ====================
  
  export interface Conversation {
    id: string;
    name: string;
    role: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
    online: boolean;
    avatar: string;
    userId: string;
    isGroup?: boolean;
    participants?: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Message {
    id: string;
    conversationId: string;
    sender: 'me' | 'other';
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    text: string;
    timestamp: string;
    read: boolean;
    type: MessageType;
    attachments?: MessageAttachment[];
    reactions?: MessageReaction[];
    replyTo?: string;
    edited?: boolean;
    editedAt?: string;
    createdAt: string;
  }
  
  export type MessageType = 'text' | 'image' | 'file' | 'voice' | 'video' | 'system';
  
  export interface MessageAttachment {
    id: string;
    type: 'image' | 'file' | 'video' | 'audio';
    name: string;
    url: string;
    size: number;
    thumbnailUrl?: string;
  }
  
  export interface MessageReaction {
    emoji: string;
    userId: string;
    userName: string;
    createdAt: string;
  }
  
  // ==================== NOTIFICATIONS ====================
  
  export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    icon: string;
    color: string;
    link?: string;
    actionRequired?: boolean;
    priority?: NotificationPriority;
    data?: Record<string, any>;
    userId: string;
    createdBy?: string;
    createdAt: string;
  }
  
  export type NotificationType = 
    | 'task' 
    | 'message' 
    | 'announcement' 
    | 'leave' 
    | 'schedule' 
    | 'system' 
    | 'mention'
    | 'approval'
    | 'reminder';
  
  export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';
  
  export interface NotificationSettings {
    userId: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    taskUpdates: boolean;
    messageAlerts: boolean;
    announcementAlerts: boolean;
    leaveUpdates: boolean;
    scheduleReminders: boolean;
    mentionAlerts: boolean;
    quietHoursEnabled: boolean;
    quietHoursStart?: string;
    quietHoursEnd?: string;
  }
  
  // ==================== ANNOUNCEMENTS ====================
  
  export interface Announcement {
    id: string;
    title: string;
    content: string;
    category: AnnouncementCategory;
    priority: 'low' | 'medium' | 'high';
    author: string;
    authorId: string;
    authorAvatar?: string;
    isPinned: boolean;
    publishDate: string;
    expiryDate?: string;
    views: number;
    likes?: number;
    comments?: AnnouncementComment[];
    attachments?: Attachment[];
    targetAudience?: string[]; // department IDs or 'all'
    tags?: string[];
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    updatedAt: string;
  }
  
  export type AnnouncementCategory = 
    | 'general' 
    | 'hr' 
    | 'it' 
    | 'events' 
    | 'policy' 
    | 'urgent'
    | 'celebration';
  
  export interface AnnouncementComment {
    id: string;
    text: string;
    author: string;
    authorId: string;
    authorAvatar?: string;
    createdAt: string;
    likes?: number;
  }
  
  // ==================== LEAVE MANAGEMENT ====================
  
  export interface Leave {
    id: string;
    leaveId: string; // e.g., "LV-2026-001"
    employeeId: string;
    employeeName: string;
    type: LeaveType;
    status: LeaveStatus;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    approver?: string;
    approverId?: string;
    approvedDate?: string;
    rejectionReason?: string;
    attachments?: Attachment[];
    createdAt: string;
    updatedAt: string;
  }
  
  export type LeaveType = 
    | 'vacation' 
    | 'sick' 
    | 'personal' 
    | 'maternity' 
    | 'paternity'
    | 'unpaid'
    | 'bereavement'
    | 'study';
  
  export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
  
  export interface LeaveBalance {
    userId: string;
    year: number;
    total: number;
    used: number;
    remaining: number;
    pending: number;
    byType: {
      [key in LeaveType]?: {
        total: number;
        used: number;
        remaining: number;
      };
    };
  }
  
  // ==================== SCHEDULE & CALENDAR ====================
  
  export interface ScheduleEvent {
    id: string;
    title: string;
    description?: string;
    type: EventType;
    startTime: string;
    endTime: string;
    duration: string;
    location: string;
    organizer: string;
    organizerId: string;
    attendees: string[];
    attendeeIds: string[];
    isRecurring?: boolean;
    recurrenceRule?: string;
    color?: string;
    status: EventStatus;
    meetingLink?: string;
    reminders?: EventReminder[];
    attachments?: Attachment[];
    createdAt: string;
    updatedAt: string;
  }
  
  export type EventType = 
    | 'meeting' 
    | 'task' 
    | 'event' 
    | 'reminder' 
    | 'break'
    | 'training'
    | 'interview';
  
  export type EventStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  
  export interface EventReminder {
    id: string;
    time: number; // minutes before event
    method: 'email' | 'push' | 'both';
    sent: boolean;
  }
  
  export interface WorkSchedule {
    employeeId: string;
    weekSchedule: DaySchedule[];
    timezone: string;
    workingHoursPerWeek: number;
  }
  
  export interface DaySchedule {
    day: string; // 'Monday', 'Tuesday', etc.
    date: string;
    isWorkingDay: boolean;
    startTime?: string;
    endTime?: string;
    breaks?: TimeBlock[];
    events: ScheduleEvent[];
  }
  
  export interface TimeBlock {
    startTime: string;
    endTime: string;
    duration: number; // minutes
    type: string;
  }
  
  // ==================== REPORTS & ANALYTICS ====================
  
  export interface PerformanceReport {
    employeeId: string;
    employeeName: string;
    period: ReportPeriod;
    startDate: string;
    endDate: string;
    metrics: PerformanceMetrics;
    taskAnalysis: TaskAnalysis;
    attendanceAnalysis: AttendanceAnalysis;
    goals: Goal[];
    strengths: string[];
    areasForImprovement: string[];
    managerComments?: string;
    generatedAt: string;
  }
  
  export interface PerformanceMetrics {
    overallRating: number; // 0-5
    taskCompletionRate: number; // percentage
    onTimeDeliveryRate: number; // percentage
    qualityScore: number; // 0-100
    productivityScore: number; // 0-100
    collaborationScore: number; // 0-100
    attendanceScore: number; // 0-100
  }
  
  export interface TaskAnalysis {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
    averageCompletionTime: number; // hours
    tasksByPriority: {
      [key in TaskPriority]: number;
    };
    tasksByCategory: Record<string, number>;
  }
  
  export interface AttendanceAnalysis {
    workingDays: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    leaveDays: number;
    attendanceRate: number; // percentage
  }
  
  export interface Goal {
    id: string;
    title: string;
    description: string;
    targetDate: string;
    status: 'not-started' | 'in-progress' | 'completed' | 'cancelled';
    progress: number; // 0-100
    category: string;
  }
  
  export type ReportPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  
  export interface DepartmentReport {
    departmentId: string;
    departmentName: string;
    period: ReportPeriod;
    startDate: string;
    endDate: string;
    stats: DepartmentStats;
    topPerformers: EmployeePerformance[];
    budgetAnalysis: BudgetAnalysis;
    projectsSummary: ProjectSummary[];
    trends: TrendData[];
    generatedAt: string;
  }
  
  export interface EmployeePerformance {
    employeeId: string;
    name: string;
    completed: number;
    total: number;
    rate: number;
    rank?: number;
  }
  
  export interface BudgetAnalysis {
    allocated: number;
    spent: number;
    remaining: number;
    utilizationRate: number; // percentage
    breakdown: BudgetBreakdown[];
  }
  
  export interface BudgetBreakdown {
    category: string;
    allocated: number;
    spent: number;
    percentage: number;
  }
  
  export interface ProjectSummary {
    projectId: string;
    name: string;
    status: 'active' | 'completed' | 'on-hold' | 'cancelled';
    completionRate: number;
    budget: number;
    spent: number;
  }
  
  export interface TrendData {
    period: string;
    value: number;
    metric: string;
    change?: number; // percentage change from previous period
  }
  
  // ==================== ANALYTICS & CHARTS ====================
  
  export interface ChartData {
    name: string;
    value: number;
    color?: string;
    [key: string]: any; // Allow additional properties
  }
  
  export interface TimeSeriesData {
    date: string;
    [metric: string]: string | number;
  }
  
  export interface ComparisonData {
    category: string;
    current: number;
    previous: number;
    target?: number;
  }
  
  // ==================== SETTINGS ====================
  
  export interface SystemSettings {
    companyName: string;
    companyLogo?: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: Address;
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    currency: string;
    fiscalYearStart: string; // MM-DD format
    workingDays: string[]; // ['Monday', 'Tuesday', ...]
    workingHoursStart: string;
    workingHoursEnd: string;
    defaultLeavePolicy: LeavePolicy;
    features: FeatureFlags;
  }
  
  export interface LeavePolicy {
    [key in LeaveType]?: {
      daysPerYear: number;
      carryForward: boolean;
      maxCarryForward?: number;
      requiresApproval: boolean;
      minNoticeDays: number;
    };
  }
  
  export interface FeatureFlags {
    messaging: boolean;
    notifications: boolean;
    reports: boolean;
    timeTracking: boolean;
    projectManagement: boolean;
    performanceReviews: boolean;
    goalTracking: boolean;
    training: boolean;
  }
  
  export interface UserSettings {
    userId: string;
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: NotificationSettings;
    privacy: PrivacySettings;
    display: DisplaySettings;
  }
  
  export interface PrivacySettings {
    profileVisibility: 'public' | 'team' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    showBirthday: boolean;
    allowMessagesFrom: 'everyone' | 'team' | 'managers';
  }
  
  export interface DisplaySettings {
    compactMode: boolean;
    showAvatars: boolean;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    startOfWeek: 'sunday' | 'monday';
  }
  
  // ==================== ACTIVITY & AUDIT ====================
  
  export interface Activity {
    id: string;
    userId: string;
    userName: string;
    action: ActivityAction;
    resource: string;
    resourceId: string;
    description: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    timestamp: string;
  }
  
  export type ActivityAction = 
    | 'create' 
    | 'read' 
    | 'update' 
    | 'delete'
    | 'login'
    | 'logout'
    | 'approve'
    | 'reject'
    | 'archive'
    | 'restore';
  
  export interface AuditLog extends Activity {
    severity: 'info' | 'warning' | 'error' | 'critical';
    changes?: ChangeLog[];
  }
  
  export interface ChangeLog {
    field: string;
    oldValue: any;
    newValue: any;
  }
  
  // ==================== PAGINATION & FILTERS ====================
  
  export interface PaginationParams {
    page: number;
    pageSize: number;
    totalItems?: number;
    totalPages?: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  }
  
  export interface FilterParams {
    search?: string;
    status?: string[];
    department?: string[];
    dateFrom?: string;
    dateTo?: string;
    priority?: string[];
    category?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  
  // ==================== API RESPONSES ====================
  
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: ValidationError[];
    timestamp: string;
  }
  
  export interface ValidationError {
    field: string;
    message: string;
    code?: string;
  }
  
  export interface ErrorResponse {
    success: false;
    error: {
      code: string;
      message: string;
      details?: any;
    };
    timestamp: string;
  }
  
  // ==================== UTILITY TYPES ====================
  
  export interface SelectOption {
    value: string;
    label: string;
    icon?: string;
    color?: string;
    disabled?: boolean;
  }
  
  export interface TabItem {
    id: string;
    label: string;
    icon?: any;
    count?: number;
    disabled?: boolean;
  }
  
  export interface BreadcrumbItem {
    label: string;
    path?: string;
    icon?: any;
  }
  
  export interface StatCardData {
    title: string;
    value: string | number;
    icon: any;
    iconColor: string;
    iconBg: string;
    trend?: {
      value: string;
      isPositive: boolean;
    };
  }
  
  // ==================== FORM DATA ====================
  
  export interface EmployeeFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    departmentId: string;
    position: string;
    role: EmployeeRole;
    salary?: number;
    hireDate: string;
    location: string;
    managerId?: string;
    avatar?: File;
  }
  
  export interface TaskFormData {
    name: string;
    description: string;
    priority: TaskPriority;
    category: string;
    assigneeId: string;
    dueDate: string;
    startDate?: string;
    estimatedHours?: number;
    tags?: string[];
  }
  
  export interface LeaveFormData {
    type: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
    attachments?: File[];
  }
  
  export interface AnnouncementFormData {
    title: string;
    content: string;
    category: AnnouncementCategory;
    priority: 'low' | 'medium' | 'high';
    isPinned: boolean;
    publishDate: string;
    expiryDate?: string;
    targetAudience?: string[];
    attachments?: File[];
  }
  