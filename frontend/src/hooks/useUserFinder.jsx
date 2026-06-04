import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setCurrentUser } from "../features/currentUser.js";
 
function useUserFinder(id) {
  const users = useSelector((state) => state.users.Admins);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("adminId"));

    if (!storedData) return;
 
 
 
  }, [users,id]);
  dispatch(setCurrentUser(user[0]))
   
}

export default useUserFinder;