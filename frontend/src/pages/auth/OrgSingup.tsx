import { useState } from 'react'
import { IconBuilding, IconHash, IconMapPin } from '@tabler/icons-react'

import Input, { inputBase } from '../../componenets/ui/Input.js'
import Button from '../../componenets/ui/Button.js'
import Select from '../../componenets/ui/Select.js'
const fieldClass = `${inputBase} pl-9 bg-transparent`
import { ProfilePicturePicker } from '../../import.js'
import { CoverImagePicker } from '../../import.js'
import { OrganizationSchema } from '../../schema/Singup_schem.js'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Organization } from '../../types/singupTypes.js'
import { setOrgFormData } from '../../store/OrganizationSlice.js'
import { usestepperSlice } from '../../store/stepperSlice.js'
import { generateSlug } from '../../utils/slugGenerator.js'
import da from 'zod/v4/locales/da.cjs'

const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition'

export default function OrgSingup() {
  const companySizes = [
    { label: '1–10  ' },
    { label: '11–50  ' },
    { label: '51–200  ' },
    { label: '201–1000  ' },
    { label: '1000+  ' },
  ]
  const setStepUp = usestepperSlice((state) => state.setStepper)
  const setStepDown = usestepperSlice((state) => state.setStepperDown)

  const [ComSize, setComSize] = useState('1-10')

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Organization>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      orgName: '',
      address: '',
      companySize: '',
    },
  })
  console.log('Live Form Values:', watch())

  const onSubmit = (data: Organization) => {
    console.log(data)

    setOrgFormData({ ...data, companySize: ComSize })
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
            <div>
              <CoverImagePicker
                label="Organization Cover Image"
                register={register('org_coverImage')}
                error={errors.org_coverImage?.message}
              />
            </div>
          </div>
          <div>
            <ProfilePicturePicker
              label="Organization Avatar"
              register={register('org_avatar')}
              error={errors.org_avatar?.message}
            />
          </div>
        </div>

        <div className="mb-4">
          <Input
            type="text"
            label="Organization name"
            placeholder="Acme Inc."
            error={errors.orgName?.message}
            {...register('orgName')}
            className={fieldClass}
            prefix={<IconBuilding size={16} className="text-text-disabled" />}
          />
        </div>

        <div className="mb-4">
          <Input
            type="text"
            label="Email"
            placeholder="you@company.com"
             className={fieldClass}
            prefix={<IconHash size={16} className="text-text-disabled" />}
            readOnly={true}
           />
        </div>
        <p className="text-xs text-text-disabled -mt-3 mb-4 pl-0.5"> {}</p>

        <div className="mb-4">
          <Input
            type="text"
            label="Address"
            placeholder="123 Market Street, Austin, TX"
            {...register('address')}
            error={errors.address?.message}

            className={fieldClass}
            prefix={<IconMapPin size={16} className="text-text-disabled" />}
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-[#9CA3AF] mb-3">
            Company Size <span className="text-[#EF4444]">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {companySizes.map(({ label }) => {
              // Check if this specific item is currently selected
              const isSelected = ComSize === label

              return (
                <label
                  key={label}
                  // Dynamically change border and background when selected
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                    isSelected ? 'border-[#009F8E] bg-[#009F8E]/10' : 'border-[#4B5563]'
                  }`}
                  onClick={() => setComSize(label)}
                >
                  {/* Custom radio circle */}
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                    style={{ borderColor: isSelected ? '#009F8E' : '#4B5563' }}
                  >
                    {/* Inner colored dot when selected */}
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#009F8E]" />}
                  </div>

                  <input
                    type="radio"
                    name="companySize"
                    checked={isSelected} // Keeps accessibility/HTML form state in sync
                    onChange={() => {}} // Handled by label onClick
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
