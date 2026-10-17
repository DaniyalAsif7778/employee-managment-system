import { z } from 'zod'
import { data } from 'react-router'
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

const MAX_FILE_SIZE = 5 * 1024 * 1024
const imageValidation = (requiredMessage: string) =>
  z
    .custom<any>(
      (val) => {
        // 1. If it's already a single File object, it's valid
        if (typeof window !== 'undefined' && val instanceof File) return true

        // 2. If it's a browser FileList, check if it has at least one valid File
        if (typeof window !== 'undefined' && val instanceof FileList) {
          return val.length > 0 && val[0] instanceof File
        }

        return false
      },
      { message: requiredMessage }
    )

    // 3. Transform the value so the subsequent .refine checks receive a single File
    .transform((val) => {
      if (typeof window !== 'undefined' && val instanceof FileList) {
        return val[0] // Extract the actual file
      }
      return val as File
    })

    // 4. Perform your size and type checks on the extracted file
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Choose an image smaller than 5 MB.')
    .refine(
      (file) => !file || ACCEPTED_TYPES.includes(file.type),
      'Choose a PNG, JPEG, WebP, or GIF image.'
    )
    .nullable()
    .transform((val) => val ?? null)
const formateNumber = (val: string | null) => {
  let digits = val?.replace(/\D/g, '') || ''
  if (digits.startsWith('92')) return `+${digits}`
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`
  return digits.length > 0 ? `+92${digits}` : ''
}
const AdminSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Name is too short')
      .max(12, 'Name is too long')
      .regex(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        'Please enter a valid first and last name'
      ),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Email is required')
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'),

    avatar: imageValidation('Avatar is required'),

     

    password: z
      .string()
      .trim()
      .min(8, 'Password is too short')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain uppercase, lowercase, number and special character'
      ),

    confirmPassword: z.string().trim().min(1, 'Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  })

const OrganizationSchema = z
  .object({
    orgName: z
      .string()
      .trim()
      .min(1, 'Organization name is required')
      .max(100, 'Organization name is too long'),
 
 
    address: z.string().trim().min(1, 'Address is required').max(255, 'Address is too long'),

    org_avatar: imageValidation('Organization avatar is required'),

    org_CoverImage: imageValidation('Organization cover image is required'),

    industry: z.string().trim(),
    companySize: z
      .string()
      .trim()
   })
  

export { AdminSchema, OrganizationSchema }
