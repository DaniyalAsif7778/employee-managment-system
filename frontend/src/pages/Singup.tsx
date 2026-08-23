import AdminSingup from './auth/AdminSingup.js'
import OrgSingup from './auth/OrgSingup.js'
import FinalSingup from './auth/FinalSingup.js'
import Stepper from '../componenets/ui/Stepper.js'
import { useStepper } from '../context/stepperContext.js'
const Signup = () => {
  const { stepperCount } = useStepper()
  return (
    <div className="min-h-screen w-full bg-bg flex flex-col  items-center  justify-center px-5 sm:px-10 py-10">
    <section className='flex flex-col items-center justify-center'>
      <div>
      <Stepper labels={['Admin','Organization','Review']} steps={Number(1)} />
      </div>
      <div className='w-full '>
      {stepperCount === 1 && <AdminSingup />}
      {stepperCount === 2 && <OrgSingup />}
      {stepperCount === 3 && <FinalSingup />}

      </div>
    </section>
    </div>
  )
}

export default Signup
