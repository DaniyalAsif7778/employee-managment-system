import {  z } from 'zod'

const AdminSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name is to short')
    .max(12, 'Name is to long')
    .regex(
      /^[a-zA-Z]+(([',. -][a-zA-Z ]?)[a-zA-Z]*)*$/,
      'Please enter a valid first and last name'
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must contain A-z 0-9 @'),

  phoneNumber: z
    .string()
    .min(1, 'Number is required')
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Invalid phone number (must be in E.164 format, e.g., +1234567890)'
    ),
    password:z.string().min(8,"Password is to short").regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain A-z 0-9 $@!"),
   confirmPassword:z.string().min(1,"required")
}).
refine((data) => data.password === data.confirmPassword ,{
       message:"Password does not match",
       path:["confirmPassword"]
})

 const OrganizationSchema = z.object({

  orgName: z.string().max(100, "Organization name is too long"),
    
  slug: z.string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens")
    .max(50, "Slug is too long"),
    
  address: z.string()
    .min(1, "Address is required")
    .max(255, "Address is too long"),
    
  companySize: z.number()
    .int("Company size must be a whole number")
    .min(1, "Company size must be at least 1"),
});


export {AdminSchema,OrganizationSchema}