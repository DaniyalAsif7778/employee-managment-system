import { z } from "zod";
import {AdminSchema, OrganizationSchema} from "../schema/Singup_schem.js"
export type RegistrationData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  orgName: string;
  slug: string;
  address: string;
  companySize: number;
}


 export  type Organization = z.infer<typeof OrganizationSchema>;
 export  type Admin  = z.infer<typeof AdminSchema>;

  