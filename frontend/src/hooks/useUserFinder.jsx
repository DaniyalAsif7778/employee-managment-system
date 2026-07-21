import { useEffect, useState } from 'react'

function useUserFinder(id) {
  const [user, setUser] = useState({})

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('adminId'))

    if (!storedData) return
  }, [id])

  return { user }
}

export default useUserFinder
