import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'

interface StepperContextValue {
  stepperCount: number
  setStepCount: (count: number) => void
}

const StepperContext = createContext<StepperContextValue | null>(null)

type StepperProviderProps = {
  children: ReactNode
}

export function StepperProvider({ children }: StepperProviderProps): ReactElement {
  const [stepperCount, setStepperCount] = useState(1)

  const setStepCount = (count: number): void => {
    setStepperCount(count)
  }

  return (
    <StepperContext.Provider
      value={{
        stepperCount,
        setStepCount,
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

export function useStepper(): StepperContextValue {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('useStepper must be used within StepperProvider')
  }
  return context
}
