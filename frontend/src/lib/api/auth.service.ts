import { apiClient } from "./axiosInstance.js";

 const registerUser = ()=>{
    const response = apiClient.post("/register",{hellow:"hellow"})
 }



export {registerUser}