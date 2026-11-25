import { useMutation } from '@tanstack/react-query'
import {
  acceptEmployeeInvitation,
  getEmployeeInvitation,
  sendVerificationEmail,
  loginUser,
  registerUser,
  requestPasswordResetOtp,
  resetPassword,
  verifyPasswordResetOtp,
  verifyEmailOtp,
} from '../lib/api/auth.service.js'
import type {
  AcceptEmployeeInvitationRequest,
  EmailRequest,
  InviteEmployeeRequest,
  LoginCredentials,
  PasswordResetOtpRequest,
  RegistrationData,
  ResetPasswordRequest,
  VerifyEmailTokenRequest,
} from '../types.js'
import { useNavigate } from 'react-router'

export const useRegister = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (registration: RegistrationData) =>
      registerUser({
        fullName: registration.fullName,
        email: registration.email,
        password: registration.password,
        orgName: registration.orgName,
        address: registration.address,
        industry: registration.industry,
        companySize: registration.companySize,
      }),
    onSuccess: (_, registration) => {
      navigate(`/sendEmail?email=${encodeURIComponent(registration.email)}`)
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

export const useRequestPasswordResetOtp = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['request-password-reset-otp'],
    mutationFn: (data: EmailRequest) => requestPasswordResetOtp(data),
    onSuccess: (_, data) => {
      navigate(`/verify-reset-otp?email=${encodeURIComponent(data.email)}`)
    },
  })
  return { mutate, isPending, isError, error }
}

export const useVerifyPasswordResetOtp = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['verify-password-reset-otp'],
    mutationFn: (data: PasswordResetOtpRequest) => verifyPasswordResetOtp(data),
    onSuccess: (_, data) => {
      navigate('/reset-password')
    },
  })
  return { mutate, isPending, isError, error }
}
export const useResetPassword = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
    onSuccess: (_, data) => {
      console.log('ok?!')

      // navigate('/login')
    },
  })

  return { mutate, isPending, isError, error }
}

export const useSendVerificationEmail = () =>
  useMutation({
    mutationKey: ['invite-employee'],
    mutationFn: (data: InviteEmployeeRequest) => sendVerificationEmail(data),
  })
export const useVerifyEmailOtp = () =>
  useMutation({
    mutationKey: ['verify-email-otp'],
    mutationFn: (data: VerifyEmailTokenRequest) => verifyEmailOtp(data),
  })
export const useInviteEmployee = () =>
  useMutation({
    mutationKey: ['invite-employee'],
    mutationFn: (data: InviteEmployeeRequest) => sendVerificationEmail(data),
  })
export const useAcceptEmployeeInvitation = () =>
  useMutation({
    mutationKey: ['accept-employee-invitation'],
    mutationFn: (data: AcceptEmployeeInvitationRequest) => acceptEmployeeInvitation(data),
  })

export { getEmployeeInvitation }
