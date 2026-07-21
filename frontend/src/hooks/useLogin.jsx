import { useNavigate } from 'react-router'

function useLogin(email, password, setPasswordError, setEmailError, role) {
  const navigate = useNavigate()

  function loginHandler(e) {
    e.preventDefault()
  }

  return { loginHandler }
}

export default useLogin
