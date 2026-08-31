import { create } from 'zustand'

type State = {
   checkBox:boolean,
}
type Action = {
   setTermsCheckBox :(condition:boolean)=> void
}
export const useTermsConditionSlice = create<State & Action>((set) => ({
   checkBox:true,
setTermsCheckBox:(condition:boolean) => set({checkBox:condition})
}))
