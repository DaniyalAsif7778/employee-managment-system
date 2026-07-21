import { type ReactElement, type ReactNode } from 'react'

import { FormDataProvider } from './formContext.js'
import { StepperProvider } from './stepperContext.js'
import { MenueProvider } from '../hooks/useMenue.js'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps): ReactElement {
  return (
    <MenueProvider>
      <FormDataProvider>
        <StepperProvider>{children}</StepperProvider>
      </FormDataProvider>
    </MenueProvider>
  )
}
