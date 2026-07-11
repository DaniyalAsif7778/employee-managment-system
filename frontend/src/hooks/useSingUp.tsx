import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployee } from '../features/employeeSlice.js'
import { addAdmin } from '../features/adminSlice.js'
import useValidator from './useValidator.js'
import type { RootState } from '../store/store.js'

function useSingUp(
  name: string,
  debounceEmail: string,
  debouncePassword: string,
  role: string,
  setEmailError: React.Dispatch<React.SetStateAction<string>>,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>
) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector((state: RootState) => state.currentUser)
  console.log(role)

  const { emailValid, passwordValid, emailTaken, passwordTaken, employerId } = useValidator(
    debounceEmail,
    debouncePassword,
    role
  )

  const signUpHandler = () => {
    // // 1️⃣ Empty fields check
    // if (!role) {
    //    toast.error("please Select the role")
    //    return
    // }
    // if (!name || !debounceEmail || !debouncePassword) {
    //   toast.error("All fields are required");
    //   return;
    // }
    // // 2️⃣ Format & taken validation
    // if (!emailValid) {
    //   setEmailError("Wrong email format");
    //   return;
    // }else{
    //   setEmailError("")
    // }
    // if (!passwordValid) {
    //   setPasswordError("Password too weak or wrong format");
    //   return;
    // }else{
    //   setEmailError("")
    // }
    // if (role === "Admin" && emailTaken) {
    //   setEmailError("Email is already taken");
    //   return;
    // }else{
    //   setEmailError("")
    // }
    // if (passwordTaken) {
    //   setPasswordError("Password is already taken");
    //   return;
    // }else{
    //   setPasswordError("")
    // }
    // if (role === "Employee" && !emailTaken) {
    //   setEmailError("Use correct admin email");
    //   return;
    // }else{
    //   setPasswordError("")
    // }
    // if (role === "Employee" && !employerId) {
    //   setEmailError("Admin not found. Please signup first");
    //   return;
    // }else{
    //   setPasswordError("")
    // }
    // // 3️⃣ Prepare user object
    // const loginDetails = {
    //   id: uuidv4(),
    //   name: name.trim(),
    //   Email: debounceEmail.trim(),
    //   password: debouncePassword.trim(),
    //   loginStatus: true
    // };
    // // 4️⃣ Show toast
    // const toastId = toast.loading(role === "Admin" ? "Creating Admin..." : "Creating Employee...");
    // setTimeout(() => {
    //   if (role === "Admin") {
    //     dispatch(addAdmin({ ...loginDetails, EmployerID: uuidv4(),role:"admin" }));
    //     toast.dismiss(toastId);
    //     toast.success("Admin created successfully!");
    //   }
    //   if (role === "Employee") {
    //     dispatch(addEmployee({ ...loginDetails,role:"employee",adminID: employerId }));
    //     toast.dismiss(toastId);
    //     toast.success("Employee created successfully!");
    //   }
    //   navigate("/login");
    // }, 700);
  }

  return { signUpHandler }
}

export default useSingUp
