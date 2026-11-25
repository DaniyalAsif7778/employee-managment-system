import { apiClient } from './axiosInstance.js'
import type {
  ApiResponse,
  EmailRequest,
  AcceptEmployeeInvitationRequest,
  EmployeeInvitationResponse,
  InviteEmployeeRequest,
  LoginCredentials,
  LoginResponse,
  RegisterOrganizationRequest,
  RegisterOrganizationResult,
  ResetPasswordRequest,
  PasswordResetOtpRequest,
  PasswordResetOtpResponse,
  VerifyEmailTokenRequest,
  VerifyEmailResponse,
} from '../../types.js'

const registerUser = async (data: RegisterOrganizationRequest) => {
  const response = await apiClient.post<ApiResponse<RegisterOrganizationResult>>(
    '/register-org',
    data
  )
  return response.data
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
  const response = await apiClient.post<ApiResponse<null>>('/logout')
  return response.data
}

const requestPasswordResetOtp = async (data: EmailRequest) => {
  const response = await apiClient.post('/forgot-password', data)
  return response.data
}

const verifyPasswordResetOtp = async (data: PasswordResetOtpRequest) => {
  const response = await apiClient.post<PasswordResetOtpResponse>(
    '/verify-password-reset-otp',
    data
  )
  return response.data
}

const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await apiClient.post('/reset-password', data)
  return response.data
}

const sendVerificationEmail = async (data: InviteEmployeeRequest) => {
  const response = await apiClient.post<ApiResponse<{ response: string; email: string }>>(
    '/sendEmail',
    data
  )
  return response.data
}
const verifyEmailOtp = async ({ token }: VerifyEmailTokenRequest) => {
  const response = await apiClient.post<VerifyEmailResponse>('/verifyOtp', null, {
    params: { token },
  })
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
  sendVerificationEmail,
  getEmployeeInvitation,
  acceptEmployeeInvitation,
  verifyEmailOtp,
}
