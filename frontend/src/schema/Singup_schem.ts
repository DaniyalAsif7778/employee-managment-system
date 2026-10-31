import { z } from 'zod'
import { data } from 'react-router'
 
   
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

 
    password: z
      .string()
      .trim()
      .min(8, 'Password is too short')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/,
        'Password must contain uppercase, lowercase, number and special character'
      ),

    confirmPassword: z.string().trim().min(1, 'Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  })

const OrganizationSchema = z.object({
  orgName: z
    .string()
    .trim()
    .min(1, 'Organization name is required')
    .max(100, 'Organization name is too long'),

  address: z.string().trim().min(1, 'Address is required').max(255, 'Address is too long'),

 
 
  industry: z.string().trim(),
  companySize: z.string().trim(),
})

export { AdminSchema, OrganizationSchema }
