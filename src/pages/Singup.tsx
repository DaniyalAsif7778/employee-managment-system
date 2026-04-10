
import React, { useEffect, useState, type ReactElement } from "react";
 
 import {Input,Button} from '../componenets/components.js'
import { useRef } from "react";
const Signup  = function () {
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const adminRef = useRef<HTMLInputElement>(null)
  const employeeRef = useRef<HTMLInputElement>( null)

  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [debounceEmail, setDebounceEmail] = useState<string>("");
  const [debouncePassword, setDebouncePassword] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceEmail(email);
      setDebouncePassword(password);
    }, 600);

    return () => clearTimeout(handler);
  }, [email, password]);

  const isDisabled = !name || !email || !password || !role;
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg">

      <div className="w-full max-w-md bg-surface  border border-border  rounded-xl shadow-xl p-8">

        <h2 className="text-3xl font-semibold mb-2 text-text-primary ">
          Create Account
        </h2>

        <p className="text-sm mb-6 text-text-secondary ">
          Register for the employee management system
        </p>

        <form
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* <Input   
              type="password"
            label="password"
            name="password"
            ref={passwordRef}
            error={passwordError}
            placeholder="Enter your password"
            value={password}
            onchange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md bg-navbar border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition" /> 
             */}
          {/* Name */}
          <div className="space-y-1">
            {/* <label className="text-sm text-text-secondary">
              Name
            </label> */}
            <Input
              name="name"
              label="Name"
              ref={nameRef}
              type="text"
              placeholder="Enter name"
              value={name}
              onchange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-navbar  border border-border  text-text-primary  focus:outline-none focus:border-primary "
            />
            {/* <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-navbar border border-border text-text-primary focus:outline-none focus:border-primary"
            /> */}
          </div>

          {/* Password */}
          <div className="space-y-1">
            {/* <label className="text-sm text-text-secondary">
              Password
            </label> */}
            <Input
              name="password"
              label="password"
              ref={passwordRef}
              type="password"
              error={passwordError}
              placeholder="Enter password"
              value={password}
              onchange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-navbar border border-border  text-text-primary  focus:outline-none focus:border-primary "
            />
            {/* <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-navbar border border-border text-text-primary focus:outline-none focus:border-primary"
            /> */}
            {/* 
            {passwordError && (
              <p className="text-xs text-error">
                {passwordError}
              </p>
            )} */}
          </div>

          {/* Email */}
          <div className="space-y-1">
            {/* <label className="text-sm text-text-secondary">
              Email
            </label> */}
            <Input
              name="email"
              label="Email"
              ref={emailRef}
              type="email"
              error={emailError}
              placeholder="Enter email"
              value={email}
              onchange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-navbar border border-border tex-text-primary focus:outline-none focus:border-primary "
            />
            {/* <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-navbar border border-border text-text-primary focus:outline-none focus:border-primary"
            />

            {emailError && (
              <p className="text-xs text-error">
                {emailError}
            //   </p> */}
            {/* // )} */}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm text-text-secondary">
              Role :
            </label>

            <div className="flex gap-6   py-2">

              <div className="flex flex-row-reverse items-center  justify-center gap-2 cursor-pointer text-text-primary">
                <Input
                  labelClassName={" "}
                  label="Admin"
                  ref={adminRef}
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={role === "Admin"}
                  onchange={(e:React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                  className="accent-primary"
                />

              </div>

              <div   className="flex  flex-row-reverse justify-center  items-center gap-2 cursor-pointer text-text-primary">
                <Input

                  label="Employee"
                  ref={employeeRef}
                  type="radio"
                  name="role"
                  value="Employee"
                  checked={role === "Employee"}
                  onchange={(e:React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                  className="accent-primary "
                />

              </div>

            </div>
          </div>

          {/* Button */}

          <Button type="submit"
            disabled={isDisabled}
            text="SingUp"
            className={`
              w-full py-2.5 rounded-md font-medium transition
              bg-primary text-white
              
              ${isDisabled ? "opacity-50 cursor-not-allowed hover:bg-primary-hover" : ""}
            `} />
        </form>
      </div>
    </div>
  );
}

export default Signup;

