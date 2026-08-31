import React, { useState } from 'react'

import Button from '../../componenets/ui/Button.js'
import Input from '../../componenets/ui/Input.js'
import {
  AuthReviewSection,
  AuthReviewRow,
  AuthTermsModal,
} from '../../componenets/ui/AuthReview.js'
 import { useOrganizationSlice } from '../../store/OrganizationSlice.js'
import { useAdminSlice } from '../../store/AdminSlice.js'
import {useTermsConditionSlice} from "../../store/TermsConditionSlce.js"
import { useRegister } from '../../hooks/useAuth.js';

 const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed'

export default function FinalSingup() {
  const { mutate, isPending, isError, error } = useRegister()
  const [agreed, setAgreed] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
    const [checkBox, setCheckBox] = useState(true)
const checkBoxCondition = useTermsConditionSlice((state=> state.checkBox))
const setCheckBoxCondition = useTermsConditionSlice((state)=> state.setTermsCheckBox)
   const Admin = useAdminSlice((state) => state)
  const Organization = useOrganizationSlice((state) => state)

  const data = [
    {
      ...Admin,
    },
    {
      ...Organization,
    },
  ]
  console.log(data[0]);
  function onSubmit(){
    mutate({...Admin , ...Organization})
  }
  return (
    <div className="w-full ">
      <h1 className="text-2xl font-semibold text-text-primary mb-1">Review your information</h1>
      <p className="text-sm text-text-secondary mb-6">
        Make sure everything is correct before you create your organization.
      </p>
     {data.map((info, idx) => {
  // 1. Convert the object keys and values into an array: [['firstName', 'Alice'], ['role', 'Admin']]
  // 2. Filter out internal state keys you don't want to display (like functions or IDs)
  const fields = Object.entries(info).filter(([key, value]) => {
    return typeof value !== 'function' && key !== 'id'; 
  });

  return (
    <AuthReviewSection
      key={idx}
      title={idx > 0 ? 'Organization information' : 'Owner information'}
    >
      {fields.map(([key, value]) => {
        // Formats camelCase keys (like "firstName") to readable labels ("First Name")
        const formattedLabel = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());

        return (
          <AuthReviewRow 
            key={key} 
            label={formattedLabel} 
            value={String(value)} 
          />
        );
      })}
    </AuthReviewSection>
  );
})}


    

      <label className="flex items-start gap-2.5 mt-6 mb-6 cursor-pointer select-none">
        <Input
          type="checkbox"
          name="terms"
           className="w-4 h-4 rounded mt-0.5 shrink-0 accent-primary"
           disabled={!checkBoxCondition}
            onclick={( )=>{


          

                  setCheckBoxCondition(!checkBox)
                    console.log(checkBoxCondition);
                   
           }}
        />
        <span className="text-sm text-text-secondary leading-snug">
          I agree to the{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setShowTerms(true)
            }}
            className="text-primary hover:text-primary-hover font-medium"
          >
            Terms of Service and Privacy Policy
          </button>
          .
        </span>
      </label>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          disabled={false}
          text="Previous"
          className={ghostBtnClass}
         />
        <Button
          type="button"
          disabled={checkBoxCondition}
          text="Create organization"
          className={`flex-1 ${primaryBtnClass}`}
          onclick={()=>{
            onSubmit()
          }}
         />
      </div>

      {showTerms && <AuthTermsModal onClose={() => setShowTerms(false)} />}
    </div>
  )
}
