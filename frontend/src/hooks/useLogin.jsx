import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setCurrentUser } from '../features/currentUser.js'

// Custom hook for handling user login logic
function useLogin(email, password, setPasswordError, setEmailError, role) {
  const navigate = useNavigate()
  // Select admins and employees from the Redux store
  const Admins = useSelector((state) => state.users.Admins)
  const Employees = useSelector((state) => state.users.Employees)
  const dispatch = useDispatch()
  console.log(Admins, Employees, email, password)

  // Function to handle login form submission
  function loginHandler(e) {
    e.preventDefault()

    // Basic validation - ensure email and password are provided
    if (!email || !password) return

    // 1️⃣ check if email exists in admins
    const admin = Admins.find((a) => a.Email === email)

    // 2️⃣ check if email exists in employees
    const employee = Employees.find((emp) => emp.Email === email)

    // 3️⃣ if email not found anywhere
    if (!admin && !employee) {
      setEmailError('Use correct email')
      return
    } else {
      setEmailError('')
    }

    // 4️⃣ Admin login
    if (admin && role == 'Admin') {
      if (admin.password !== password) {
        setPasswordError('Incorrect password')
        return
      } else {
        setPasswordError('')
      }

      dispatch(setCurrentUser({ ...admin }))
      navigate('/DashBoard')
      return
    }

    // 5️⃣ Employee login
    if (employee && role == 'Employee') {
      if (employee.password !== password) {
        setPasswordError('Incorrect password')
        return
      } else {
        setPasswordError('')
      }

      // check admin using EmployerID
      const employer = Admins.find((adm) => adm.EmployerID === employee.adminID)

      if (!employer) {
        setEmailError('No admin found. Please signup')
        return
      }

      dispatch(setCurrentUser({ ...employee }))
      navigate('/DashBoard')
    }
  }
  //    useUserFinder(user.id)
  // Return the login handler function
  return { loginHandler }
}

export default useLogin
