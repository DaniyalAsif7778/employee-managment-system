import { apiClient } from "./axiosInstance.js";
import { type RegistrationData} from "../../types/singupTypes.js"
  

const registerUser = (data:RegistrationData)=>{
   const formData = new FormData()
   const entities = Object.entries(data).map(([key, value]) => {
      
     formData.append(key, String(value));
   })
    const response = apiClient.post("/register-org",formData)
    return response
 }



export {registerUser}