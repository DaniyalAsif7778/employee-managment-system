import { create } from 'zustand'

import type { Organization } from '../types/singupTypes.js'
 

export const useOrganizationSlice = create<Organization  >((set) => ({
  orgName: '',
  slug: '',
  address: '',
  companySize: 1,
  org_avatar:  null, 
  org_coverImage:null,
}))

export const   setOrgFormData = (data:Organization) => useOrganizationSlice.setState((state) => ({ ...state, ...data }))
