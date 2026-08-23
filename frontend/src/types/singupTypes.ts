import { z } from "zod";
import {AdminSchema, OrganizationSchema} from "../schema/Singup_schem.js"


 export  type Organization = z.infer<typeof OrganizationSchema>;
 export  type Admin  = z.infer<typeof AdminSchema>;

  