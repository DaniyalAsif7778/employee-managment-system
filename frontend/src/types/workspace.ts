export type WorkspaceScreen =
  | 'organizations'
  | 'employees'
  | 'departments'
  | 'department-detail'
  | 'tasks'
  | 'reports'
  | 'messages'
  | 'announcements'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'team'
  | 'leave-approvals'
  | 'schedule'
  | 'leave'
  | 'colleagues'
  | 'recruitment'
  | 'leaves'
  | 'onboarding'

export type RecruitmentStage = 'Applied' | 'Screening' | 'Interview' | 'Offer'

export interface RecruitmentCandidate {
  id: string
  name: string
  position: string
  appliedAt: string
  stage: RecruitmentStage
}

export interface OpenPosition {
  id: string
  title: string
  department: string
  employmentType: string
  applicants: number
  status: 'open' | 'paused' | 'closed'
}

export interface OnboardingRecord {
  id: string
  employeeId: string
  employeeName: string
  role: string
  department: string
  startDate: string
  checklist: { id: string; label: string; completed: boolean }[]
}

export interface OrganizationWorkspaceData {
  name: string
  email: string
  phone: string
  industry: string
  website: string
  address: string
  timezone: string
  memberCount: number
}
