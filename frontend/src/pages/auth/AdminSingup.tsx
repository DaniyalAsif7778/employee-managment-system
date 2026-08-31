import { useState } from 'react'
import { NavLink } from 'react-router'
import {
  IconUsers,
  IconMail,
  IconPhone,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowLeft,
} from '@tabler/icons-react'
  import Input, { inputBase } from '../../componenets/ui/Input.js'
import Button from '../../componenets/ui/Button.js'
import {ProfilePicturePicker} from "../../import.js"
import { AdminSchema } from '../../schema/Singup_schem.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Admin } from '../../types/singupTypes.js'
import { useAdminSlice } from '../../store/AdminSlice.js';
import {setAdminFormData} from "../../store/AdminSlice.js"
import {  usestepperSlice } from '../../store/stepperSlice.js';
 
 const fieldClass = `${inputBase} pl-9`
const fieldWithSuffixClass = `${inputBase} pl-9 pr-10`

const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium inline-flex items-center gap-1.5 border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition'

export default function AdminSingup() {
  const setStepUp  = usestepperSlice(state => state.setStepper)
    const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [disable, setDisable] = useState(true)
 
   const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Admin>({
    resolver: zodResolver(AdminSchema),
   defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  })
 const state= useAdminSlice((state)=> state)

 
  const onSubmit = (data: Admin) => {
      setAdminFormData(data)
      console.log({...state},"state");
                   setStepUp()
console.log(setStepUp)

      
   }
  const passwordToggle = (visible: boolean, toggle: () => void, label: string) => (
    <button
      type="button"
      onClick={toggle}
      className="text-text-disabled"
      tabIndex={-1}
      aria-label={label}
    >
      {visible ? <IconEyeOff size={16} /> : <IconEye size={16} />}
    </button>
  )

 
  return (
    <form   onSubmit={handleSubmit(onSubmit)} >
    <div className="w-full ">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-1">Personal information</h1>
          <p className="text-sm text-text-secondary mb-6">
            Tell us who&apos;ll be managing this organization.
          </p>
        </div>
        <div>
            <ProfilePicturePicker   />
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          label="Full name"
      
          placeholder="Jordan Malik"
        error={errors.fullName?.message}     
          {...register('fullName')} 
          className={fieldClass}
          prefix={<IconUsers size={16} className="text-text-disabled" />}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Email"
          type="email"
          
          placeholder="you@company.com"
          error={errors.email?.message}         
          {...register('email')}      
          className={fieldClass}
          prefix={<IconMail size={16} className="text-text-disabled" />}
        />
      </div>

      <div className="mb-4">
        <Input
          type="tel"
          label="Phone number"
           
          placeholder="(555) 000-0000"
            error={errors.phoneNumber?.message}    
          {...register('phoneNumber')}     
          className={fieldClass}
          prefix={<IconPhone size={16} className="text-text-disabled" />}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Password"
          type={showPw ? 'text' : 'password'}
          
          placeholder="Enter your password"
            error={errors.password?.message}       
          {...register('password')}  
          className={fieldWithSuffixClass}
          prefix={<IconLock size={16} className="text-text-disabled" />}
          suffix={passwordToggle(
            showPw,
            () => setShowPw((s) => !s),
            showPw ? 'Hide password' : 'Show password'
          )}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Confirm password"
          type={showConfirmPw ? 'text' : 'password'}
         
          placeholder="Re-enter your password"
           error={errors.confirmPassword?.message}  
          {...register('confirmPassword')}  
          className={fieldWithSuffixClass}
          prefix={<IconLock size={16} className="text-text-disabled" />}
          suffix={passwordToggle(
            showConfirmPw,
            () => setShowConfirmPw((s) => !s),
            showConfirmPw ? 'Hide password' : 'Show password'
          )}
        />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <NavLink to="/login" className={ghostBtnClass}>
          <IconArrowLeft size={15} /> Login
        </NavLink>
        <Button
          type="submit"
          disabled={false}
          text="Continue"
          className={`flex-1 ${primaryBtnClass}`}
          onclick={(e) => {
           }}
        />
      </div>
    </div>
    </form>
  )
}
