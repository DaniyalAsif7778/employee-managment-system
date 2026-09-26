import { apiClient } from "./axiosInstance.js";
import { type RegistrationData} from "../../types/singupTypes.js"
  

const registerUser = (data:RegistrationData)=>{
   const formData = new FormData()
   const entities = Object.entries(data).forEach(([key, value]) => {
      console.log(typeof value);
      
    
formData.append(key, typeof value === "number" ? String(value) : value === null ? "" : typeof value === "string" ? value  :value);
   
   })
    const response = apiClient.post("/register-org",formData)
    return response
 }



export {registerUser}