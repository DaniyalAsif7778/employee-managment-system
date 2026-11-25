import { z } from 'zod'
import { AdminSchema, OrganizationSchema } from '../schema/Singup_schem.js'
import type { UserRole } from '../types.js'
export type { RegistrationData } from '../types.js'

export type UserRoleOption = {
  value: UserRole
  label: string
  description: string
  icon: React.ComponentType<any> | null // Or LucideIcon / SVGIcon depending on your icon library
  color: string
  bg: string
}
export type Organization = z.infer<typeof OrganizationSchema>
export type Admin = z.infer<typeof AdminSchema>
