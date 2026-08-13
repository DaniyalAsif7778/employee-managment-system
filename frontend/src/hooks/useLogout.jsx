 
function useLogout() {
 

  function logOutHandler() {
     navigate('/login')
  }

  return { logOutHandler }
}

export default useLogout
