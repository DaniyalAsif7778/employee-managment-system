import { apiClient } from './axiosInstance.js'
import { type RegistrationData } from '../../types/singupTypes.js'
import type {
  EmailRequest,
  AcceptEmployeeInvitationRequest,
  EmployeeInvitationResponse,
  InviteEmployeeRequest,
  LoginCredentials,
  LoginResponse,
  ResetPasswordRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '../../types.js'

const registerUser = (data: RegistrationData) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, typeof value === 'number' ? String(value) : value === null ? '' : value)
  })
  return apiClient.post('/register-org', formData)
}

const loginUser = async (data: LoginCredentials) => {
  const response = await apiClient.post<LoginResponse>('/login', data)
  return response.data
}

const getCurrentUser = async () => {
  const response = await apiClient.get<LoginResponse>('/auth/me')
  return response.data
}

const logoutUser = async () => {
  const response = await apiClient.post('/logout')
  return response.data
}

const requestPasswordResetOtp = async (data: EmailRequest) => {
  const response = await apiClient.post('/auth/forgot-password', data)
  return response.data
}

const verifyPasswordResetOtp = async (data: VerifyOtpRequest) => {
  const response = await apiClient.post<VerifyOtpResponse>('/auth/verify-otp', data)
  return response.data
}

const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await apiClient.post('/auth/reset-password', data)
  return response.data
}

const inviteEmployee = async (data: InviteEmployeeRequest) => {
  const response = await apiClient.post('/employees/invite', data)
  return response.data
}

const getEmployeeInvitation = async (token: string) => {
  const response = await apiClient.get<EmployeeInvitationResponse>(
    `/employees/invitations/${encodeURIComponent(token)}`
  )
  return response.data
}

const acceptEmployeeInvitation = async (data: AcceptEmployeeInvitationRequest) => {
  const response = await apiClient.post('/employees/accept-invite', data)
  return response.data
}

export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  requestPasswordResetOtp,
  verifyPasswordResetOtp,
  resetPassword,
  inviteEmployee,
  getEmployeeInvitation,
  acceptEmployeeInvitation,
}
