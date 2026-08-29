import {
  createContext,
  useContext,
 
 
 
} from 'react'

 
const FormDataContext = createContext({})
 

export function FormDataProvider({ children  }) {
   

  return (
    <FormDataContext.Provider
       
       value={""}
    >
      {children}
    </FormDataContext.Provider>
  )
}

export function useFormData() {
  const context = useContext(FormDataContext)
  if (!context) {
    throw new Error('useFormData must be used within FormDataProvider')
  }
  return context
}
