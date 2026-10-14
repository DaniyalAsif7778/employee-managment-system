import { z } from "zod";
import {AdminSchema, OrganizationSchema} from "../schema/Singup_schem.js"
export type RegistrationData = {
  fullName: string;
  email: string;
   password: string;
  confirmPassword: string;
   orgName: string;
   address: string;
  companySize: number;
  avatar: File | null;
  org_avatar: File | null;
  org_CoverImage: File | null;
}
export type AdminFile= {
  avatar: File | null;
}
export type UserRoleOption = {
  value: string;
  label: string;
  description: string;
  icon: React.ComponentType<any> | null; // Or LucideIcon / SVGIcon depending on your icon library
  color: string;
  bg: string;
  path: string;
};
 export  type Organization = z.infer<typeof OrganizationSchema>;
 export  type Admin  = z.infer<typeof AdminSchema>;

  