import { useState } from 'react'
import { IconBuilding, IconHash, IconMapPin } from '@tabler/icons-react'
import { useAdminSlice } from '../../store/AdminSlice.js'

import Input, { inputBase } from '../../componenets/ui/Input.js'
import Button from '../../componenets/ui/Button.js'
const fieldClass = `${inputBase} pl-9 bg-transparent`
 import { OrganizationSchema } from '../../schema/Singup_schem.js'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Organization } from '../../types/singupTypes.js'
import { setOrgFormData } from '../../store/OrganizationSlice.js'
import { usestepperSlice } from '../../store/stepperSlice.js'
import { trimInputRegistration } from '../../utils/trimInputRegistration.js'

const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition'

export default function OrgSingup() {
  const companySizes = [
    { label: '1–10' },
    { label: '11–50' },
    { label: '51–200' },
    { label: '201–1000' },
    { label: '1000+' },
  ]
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Media',
    'Real Estate',
    'Other',
  ]
  const Admin = useAdminSlice((state) => state)

  const setStepUp = usestepperSlice((state) => state.setStepper)
  const setStepDown = usestepperSlice((state) => state.setStepperDown)

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Organization>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      orgName: '',
       
      address: '',
      industry: '',
      companySize: '',
    },
  })
  console.log('Live Form Values:', watch())
  // Watch values for live rendering or style toggles
  const selectedIndustry = watch('industry')
  const selectedCompanySize = watch('companySize')

  const onSubmit = (data: Organization) => {
    console.log(data)

    setOrgFormData({ ...data })
    setStepUp()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full ">
        <div className="flex flex-row justify-between items-center">
          <div>
            <div>
              <h1 className="text-4xl font-semibold text-text-primary mb-1">
                Organization information
              </h1>
              <p className="text-base text-text-secondary mb-6">Where and how big is your team?</p>
            </div>
            
          </div>
           
        </div>

        <div className="mb-4">
          <Input
            type="text"
            label="Organization name"
            placeholder="Acme Inc."
            error={errors.orgName?.message}
            {...trimInputRegistration(register('orgName'))}
            className={fieldClass}
            prefix={<IconBuilding size={16} className="text-text-disabled" />}
          />
        </div>

        <div className="mb-4">
          <Input
            type="text"
            label="Work Email"
            placeholder="you@company.com"
            value={Admin.email}
            disabled
            readOnly
            className={`${fieldClass}  text-text-disabled`}
            prefix={<IconHash size={16} className="text-text-disabled " />}
          />
        </div>
        <p className="text-xs text-text-disabled -mt-3 mb-4 pl-0.5"> {}</p>

        <div className="mb-4">
          <Input
            type="text"
            label="Address"
            placeholder="123 Market Street, Austin, TX"
            {...trimInputRegistration(register('address'))}
            error={errors.address?.message}

            className={fieldClass}
            prefix={<IconMapPin size={16} className="text-text-disabled" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-[14px] font-medium text-[#9CA3AF] mb-1.5">
            Industry <span className="text-[#EF4444]">*</span>
          </label>

          <select
            {...register('industry')} // Hook Form takes over state and onChange
            className={`w-full h-11 px-3 rounded-lg border bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#009F8E] focus:border-transparent transition-all text-[15px] ${
              errors.industry ? 'border-[#EF4444]' : 'border-[#333333]'
            }`}
            style={{ color: selectedIndustry ? '#E0E0E0' : '#4B5563' }}
          >
            <option value="" disabled>
              Select industry
            </option>
            {industries.map((i) => (
              <option key={i} value={i} style={{ backgroundColor: '#121212', color: '#E0E0E0' }}>
                {i}
              </option>
            ))}
          </select>

          {errors.industry && (
            <p className="text-[12px] text-[#EF4444] mt-1">{errors.industry.message}</p>
          )}
        </div>
        <div>
          <label className="block text-[14px] font-medium text-[#9CA3AF] mb-3">
            Company Size <span className="text-[#EF4444]">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {companySizes.map(({ label }) => {
              const isSelected = selectedCompanySize === label

              return (
                <label
                  key={label}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                    isSelected ? 'border-[#009F8E] bg-[#009F8E]/10' : 'border-[#4B5563]'
                  }`}
                  onClick={() => setValue('companySize', label, { shouldValidate: true })}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{ borderColor: isSelected ? '#009F8E' : '#4B5563' }}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#009F8E]" />}
                  </div>

                  <input
                    type="radio"
                    value={label}
                    {...register('companySize')} // Integrated directly with react-hook-form
                    checked={isSelected}
                    className="sr-only"
                  />
                  <span className="emp-range text-[14px] text-[#E0E0E0]">{label}</span>
                </label>
              )
            })}
          </div>
          {errors.companySize && (
            <p className="text-[12px] text-[#EF4444] mt-1">{errors.companySize?.message}</p>
          )}
        </div>

        <div className="flex items-center gap-3 mt-6">
          <Button
            type="button"
            onclick={() => {
              setStepDown()
            }}
            disabled={false}
            text="Previous"
            className={ghostBtnClass}
          />
          <Button
            type="submit"
            disabled={false}
            text="Continue"
            className={`flex-1 ${primaryBtnClass}`}
          />
        </div>
      </div>
    </form>
  )
}
