

export type AdminSingupReturn = {
  isFullNameValid: boolean
  isEmailValid: boolean
  isPhoneNumberValid: boolean
  isPasswordValid: boolean
  isConfirmPasswordValid: boolean
  isValid: boolean
}
export type AdminSingup = {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}


const REGEX = {
  fullName: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneNumber: /^\+?[1-9]\d{7,14}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{12,128}$/,
}
export function validateAdminSignup(fields: AdminSingup): AdminSingupReturn {
  const { fullName, email, phoneNumber, password, confirmPassword } = fields
  const isFullNameValid = REGEX.fullName.test(fullName)
  const isEmailValid = REGEX.email.test(email)
  const isPhoneNumberValid = REGEX.phoneNumber.test(phoneNumber)
  const isPasswordValid = REGEX.password.test(password)
  const isConfirmPasswordValid = password === confirmPassword
  let isValid = false

  if (isFullNameValid && isEmailValid && isPhoneNumberValid && isPasswordValid && isConfirmPasswordValid && fullName != "" && email != "" && phoneNumber != "" && password != "" && confirmPassword != "") {
    isValid = true
  } else {
    isValid = false
  }
  return { isFullNameValid, isEmailValid, isPhoneNumberValid, isPasswordValid, isConfirmPasswordValid, isValid }

}


