/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type  { RootState } from "../store/store.js";
 export default function useValidator(debounceEmail:string, debouncePassword:string, role:string) {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [idValidator, setIdValidator] = useState<boolean>(false); // reserved for future use
  const [emailTaken, setEmailTaken] = useState<boolean>(false);
  const [passwordTaken, setPasswordTaken] = useState<boolean>(false);
  const [employerId, setEmployerId] = useState<null | string>(null);

  const Admins = useSelector((state:RootState) => state.admins || []);
  const Employees = useSelector((state:RootState) => state.employees || []);

  useEffect(() => {
    // 1️⃣ Validate email & password formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    setEmailValid(emailRegex.test(debounceEmail));
    setPasswordValid(passwordRegex.test(debouncePassword));

    // 2️⃣ Role-specific checks
    if (role === "Admin") {
      setEmailTaken(Admins.some((admin) => admin.email === debounceEmail));
      setPasswordTaken(Admins.some((admin) => admin.password === debouncePassword));
      setEmployerId(null);
    }

    if (role === "Employee") {
      // Check if admin exists for the given email
      const admin = Admins.find((a) => a.email === debounceEmail);
      if (admin) {
        setEmployerId(admin.employerId);
        setEmailTaken(true); // email corresponds to an existing admin
      } else {
        setEmployerId(null);
        setEmailTaken(false); // invalid admin email
      }
      const passwordCheck = Employees.some((emp):boolean => emp.password === debouncePassword)
      setPasswordTaken(passwordCheck);
    }
  }, [debounceEmail, debouncePassword, role  ]);

  return {
    emailValid,
    passwordValid,
    emailTaken,
    passwordTaken,
    employerId
  };
}