import { useState } from 'react'
import { IconBuilding, IconHash, IconMapPin } from '@tabler/icons-react'

import Input, { inputBase } from '../../componenets/ui/Input.js'
import Button from '../../componenets/ui/Button.js'
import Select from '../../componenets/ui/Select.js'
import { useStepper } from '../../context/stepperContext.js'
const fieldClass = `${inputBase} pl-9`
import { ProfilePicturePicker } from '../../import.js'
import { CoverImagePicker } from '../../import.js'
import { OrganizationSchema } from '../../schema/Singup_schem.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Organization } from '../../types/singupTypes.js'
const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition'

export default function OrgSingup() {
  const { setStepCount } = useStepper()
  const [slugTouched, setSlugTouched] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Organization>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      orgName: '',
      slug: '',
      address: '',
      companySize:1
     },
  })
  console.log('Live Form Values:', watch())

  const onSubmit = (data: Organization) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full ">
        <div className="flex flex-row justify-between items-center">
          <div>
            <div>
              <h1 className="text-2xl font-semibold text-text-primary mb-1">
                Organization information
              </h1>
              <p className="text-sm text-text-secondary mb-6">Where and how big is your team?</p>
            </div>
            <div>
              <CoverImagePicker />
            </div>
          </div>
          <div>
            <ProfilePicturePicker />
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
            label="Organization slug"

            placeholder="acme-inc"
            {...register('slug')}
            error={errors.slug?.message}
            className={fieldClass}
            prefix={<IconHash size={16} className="text-text-disabled" />}
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

        <Select
          label="Company size"
          placeholder="Select company size"
          {...register('companySize')}
          options={[]}
        />

        <div className="flex items-center gap-3 mt-6">
          <Button
            type="button"
            disabled={false}
            text="Previous"
            className={ghostBtnClass}
            onclick={() => setStepCount(1)}
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
