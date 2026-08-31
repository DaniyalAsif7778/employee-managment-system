import { useMutation } from '@tanstack/react-query'
 import { registerUser } from '../lib/api/auth.service.js'
 import { type RegistrationData} from "../types/singupTypes.js"

export const useRegister = ( ) => {
 
    const { mutate, isPending, isError, error } = useMutation({ mutationKey: ['register'], mutationFn: (userData:RegistrationData)=> registerUser(userData)
     })

    return { mutate, isPending, isError, error };
}
