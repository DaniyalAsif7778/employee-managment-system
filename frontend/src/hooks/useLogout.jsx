import React from 'react'
import { useNavigate} from 'react-router'
import { useSelector ,useDispatch} from 'react-redux'
import { Logout } from '../features/authSlice.js'
import { setCurrentUser } from '../features/currentUser.js'
function useLogout() {
    const currentUser = useSelector(state => state.currentUser.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
   function logOutHandler (){

     dispatch(Logout(currentUser))

     dispatch(setCurrentUser({loginStatus:false}))
     navigate("/login")
   }
      return {logOutHandler}
   }

export default useLogout