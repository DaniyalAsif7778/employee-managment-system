import React, { useEffect, useState } from 'react'
import { IconBuilding, IconHash, IconMapPin } from '@tabler/icons-react'

import Input, { inputBase } from '../../componenets/ui/Input.js'
import Button from '../../componenets/ui/Button.js'
import Select from '../../componenets/ui/Select.js'
import { useStepper } from '../../context/stepperContext.js'
import { useFormData } from '../../context/formContext.js'
const fieldClass = `${inputBase} pl-9`

const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition'

const companySizes = [
  { value: '1–10 employees', label: '1–10 employees' },
  { value: '11–50 employees', label: '11–50 employees' },
  { value: '51–200 employees', label: '51–200 employees' },
  { value: '201–1000 employees', label: '201–1000 employees' },
  { value: '1000+ employees', label: '1000+ employees' },
]

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function OrgSingup() {
  const { setStepCount } = useStepper()
  const { updateFormData } = useFormData()
  const [slugTouched, setSlugTouched] = useState(false)
  const [org, setOrg] = useState({
    orgName: '',
    slug: '',
    address: '',
    companySize:  1,
  })

  useEffect(() => {
    if (!slugTouched) {
      setOrg((current) => ({ ...current, slug: slugify(current.orgName) }))
    }
  }, [org.orgName, slugTouched])

  return (
    <div className="w-full S">
      <h1 className="text-2xl font-semibold text-text-primary mb-1">Organization information</h1>
      <p className="text-sm text-text-secondary mb-6">Where and how big is your team?</p>

      <div className="mb-4">
        <Input
        type='text'
          label="Organization name"
          name="orgName"
          placeholder="Acme Inc."
          value={org.orgName}
          onchange={(e) => setOrg({ ...org, orgName: e.target.value })}
          className={fieldClass}
          prefix={<IconBuilding size={16} className="text-text-disabled" />}
        />
      </div>

      <div className="mb-4">
        <Input
        type='text'
          label="Organization slug"
          name="slug"
          placeholder="acme-inc"
          value={org.slug}
          onchange={(e) => {
            setSlugTouched(true)
            setOrg({ ...org, slug: slugify(e.target.value) })
          }}
          className={fieldClass}
          prefix={<IconHash size={16} className="text-text-disabled" />}
        />
      </div>
      <p className="text-xs text-text-disabled -mt-3 mb-4 pl-0.5">
        rosterly.app/{org.slug || 'your-org'}
      </p>

      <div className="mb-4">
        <Input
        type='text'
          label="Address"
          name="address"
          placeholder="123 Market Street, Austin, TX"
          value={org.address}
          onchange={(e) => setOrg({ ...org, address: e.target.value })}
          className={fieldClass}
          prefix={<IconMapPin size={16} className="text-text-disabled" />}
        />
      </div>

      <Select
        label="Company size"
        name="companySize"
        placeholder="Select company size"
        // value={org.companySize}
        options={companySizes}
        // onchange={(e) => setOrg({ ...org, companySize: e.target.value })}
      />

      <div className="flex items-center gap-3 mt-6">
        <Button type="button" disabled={false} text="Previous" className={ghostBtnClass}         onclick={() => setStepCount(1)}
 />
        <Button type="button" disabled={false} text="Continue" className={`flex-1 ${primaryBtnClass}`} onclick={() => {
          updateFormData(org)
          setStepCount(3)
        }} />
      </div>
    </div>
  )
}
