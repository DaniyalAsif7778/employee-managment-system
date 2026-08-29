import { create } from 'zustand'

type State = {
  step: number
}
type Action = {
  setStepper: () => void
  setStepperDown: () => void
}
export const usestepperSlice = create<State & Action>((set) => ({
  step: 1,
  setStepper: () => set((state) => ({ step: state.step < 3 ? state.step + 1 : state.step })),
  setStepperDown: () => set((state) => ({ step: state.step >= 2 ? state.step - 1 : state.step })),
}))
