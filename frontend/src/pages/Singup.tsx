import AdminSingup from './auth/AdminSingup.js'
import Stepper from '../componenets/ui/Stepper.js'
const Signup = () => {
  return (
    <div className="min-h-screen w-full bg-bg flex flex-col  items-center  justify-center px-5 sm:px-10 py-10">
      <Stepper labels={['Admin','Organization','Review']} steps={Number(4)} />
      <AdminSingup />
    </div>
  )
}

export default Signup
