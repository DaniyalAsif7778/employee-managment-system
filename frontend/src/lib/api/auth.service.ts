import { apiClient } from "./axiosInstance.js";
import { type RegistrationData} from "../../types/singupTypes.js"
 const registerUser = (data:RegistrationData)=>{
    const response = apiClient.post("/register-org",{...data})
    return response
 }



export {registerUser}