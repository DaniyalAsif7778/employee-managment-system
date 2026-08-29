import AdminSingup from './auth/AdminSingup.js'
import OrgSingup from './auth/OrgSingup.js'
import FinalSingup from './auth/FinalSingup.js'
import Stepper from '../componenets/ui/Stepper.js'
import {  usestepperSlice } from '../store/stepperSlice.js';

 const Signup = () => {
  const step = usestepperSlice(state => state.step)
   return (
    <div className="min-h-screen w-full bg-bg flex flex-col  items-center  justify-center px-5 sm:px-10 py-10">
    <section className='flex flex-col items-center justify-center'>
      <div>
      <Stepper labels={['Admin','Organization','Review']} steps={Number(1)} />
      </div>
      <div className='w-full '>
      {step === 1 && <AdminSingup />}
      {step === 2 && <OrgSingup />}
      {step === 3 && <FinalSingup />}

      </div>
    </section>
    </div>
  )
}

export default Signup
