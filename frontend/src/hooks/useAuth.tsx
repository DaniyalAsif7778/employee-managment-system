import { useMutation } from '@tanstack/react-query'
import {
  acceptEmployeeInvitation,
  getEmployeeInvitation,
  inviteEmployee,
  loginUser,
  registerUser,
  requestPasswordResetOtp,
  resetPassword,
  verifyPasswordResetOtp,
} from '../lib/api/auth.service.js'
import { type RegistrationData } from '../types/singupTypes.js'
import type {
  AcceptEmployeeInvitationRequest,
  EmailRequest,
  InviteEmployeeRequest,
  LoginCredentials,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from '../types.js'
import { useNavigate } from 'react-router'
 


export const useRegister = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (userData: RegistrationData) => registerUser(userData),
      onSuccess: () => {
      // Store the token in localStorage or cookies
      navigate('/verify-email') // Navigate to the OTP verification page
    },
  })

  return { mutate, isPending, isError, error }
}

export const useLogin = () => {

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),

  })

  return { mutate, isPending, isError, error }
}

export const useRequestPasswordResetOtp = () =>
  useMutation({
    mutationKey: ['request-password-reset-otp'],
    mutationFn: (data: EmailRequest) => requestPasswordResetOtp(data),
  })

export const useVerifyPasswordResetOtp = () =>
  useMutation({
    mutationKey: ['verify-password-reset-otp'],
    mutationFn: (data: VerifyOtpRequest) => verifyPasswordResetOtp(data),
  })

export const useResetPassword = () =>
  useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
  })

export const useInviteEmployee = () =>
  useMutation({
    mutationKey: ['invite-employee'],
    mutationFn: (data: InviteEmployeeRequest) => inviteEmployee(data),
  })

export const useAcceptEmployeeInvitation = () =>
  useMutation({
    mutationKey: ['accept-employee-invitation'],
    mutationFn: (data: AcceptEmployeeInvitationRequest) => acceptEmployeeInvitation(data),
  })

export { getEmployeeInvitation }
