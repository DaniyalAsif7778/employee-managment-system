import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from 'react'

type AAdminData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  organizationSlug: string;
  address: string;
  companySize: number | "";
}

type FormDataContextValue = {
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData>>
  updateFormData: (data: Partial<FormData>) => void
}

const FormDataContext = createContext<FormDataContextValue | null>(null)

type FormDataProviderProps = {
  children: ReactNode
}

export function FormDataProvider({ children }: FormDataProviderProps): ReactElement {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    organizationSlug: '',
    address: '',
    companySize: '',
  })
  
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
        updateFormData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  )
}

export function useFormData(): FormDataContextValue {
  const context = useContext(FormDataContext)
  if (!context) {
    throw new Error('useFormData must be used within FormDataProvider')
  }
  return context
}
