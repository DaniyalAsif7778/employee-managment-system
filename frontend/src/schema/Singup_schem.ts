import { z } from 'zod'

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024

const imageValidation = (requiredMessage: string) =>
  z
    .union([
      z.instanceof(typeof window !== 'undefined' ? FileList : Object),
      z.null(),
    ])
    .refine(
      (files) => files !== null && (files as any).length > 0,
      requiredMessage
    )
    .refine(
      (files) => {
        if (files === null) return true;
        const fileList = files as FileList;
        return (fileList[0]?.size || 0) <= MAX_FILE_SIZE;
      },
      'Choose an image smaller than 5 MB.'
    )
    .refine(
      (files) => {
        if (files === null) return true;
        const fileList = files as FileList;
        return ACCEPTED_TYPES.includes(fileList[0]?.type || '');
      },
      'Choose a PNG, JPEG, WebP, or GIF image.'
    );


const AdminSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Name is too short')
      .max(12, 'Name is too long')
      .regex(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        'Please enter a valid first and last name'
      ),

    email: z
      .string()
      .min(1, 'Email is required')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email'
      ),

    avatar: imageValidation('Avatar is required'),

    phoneNumber: z
      .string()
      .min(1, 'Number is required')
      .regex(
        /^\+?[1-9]\d{1,14}$/,
        'Invalid phone number (must be in E.164 format, e.g., +1234567890)'
      ),

    password: z
      .string()
      .min(8, 'Password is too short')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain uppercase, lowercase, number and special character'
      ),

    confirmPassword: z
      .string()
      .min(1, 'Required'),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Password does not match',
      path: ['confirmPassword'],
    }
  )

const OrganizationSchema = z.object({
  orgName: z
    .string()
    .min(1, 'Organization name is required')
    .max(100, 'Organization name is too long'),

  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must only contain lowercase letters, numbers, and hyphens'
    )
    .max(50, 'Slug is too long'),

  address: z
    .string()
    .min(1, 'Address is required')
    .max(255, 'Address is too long'),

  org_avatar: imageValidation(
    'Organization avatar is required'
  ),

  org_coverImage: imageValidation(
    'Organization cover image is required'
  ),

  companySize: z
    .number()
    .int('Company size must be a whole number')
    .min(1, 'Company size must be at least 1'),
})

export {
  AdminSchema,
  OrganizationSchema,
}