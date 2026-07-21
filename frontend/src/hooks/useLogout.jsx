import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../features/currentUser.js'

function useLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logOutHandler() {
    dispatch(setCurrentUser(null))
    navigate('/login')
  }

  return { logOutHandler }
}

export default useLogout
