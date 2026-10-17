import { Building2, Users, Briefcase } from 'lucide-react'
import AdminSingup from './auth/AdminSingup.js'
import OrgSingup from './auth/OrgSingup.js'
import FinalSingup from './auth/FinalSingup.js'
import Stepper from '../componenets/ui/Stepper.js'
import { usestepperSlice } from '../store/stepperSlice.js'
import  {Link} from 'react-router'
import wordmarkLogo from '../assets/logo-dark.svg'
export default function Singup() {
  const step = usestepperSlice((state) => state.step)

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-120 xl:w-130 flex-col justify-between p-12 bg-[#121212] border-r border-[#1F1F1F] relative overflow-hidden">
        {/* decorative blobs */}
        <div
          className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #009F8E, transparent)' }}
        />
        <div
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <img src={wordmarkLogo} alt="EmpoManager" className="h-13 w-70 max-w-full object-contain object-left" />
          </div>

          <h2 className="text-[36px] font-semibold text-[#E0E0E0] leading-tight mb-4">
            One platform for your entire workforce
          </h2>
          <p className="text-mdt-[#9CA3AF] leading-relaxed mb-12">
            Register your organization and bring together admins, managers, HR, and employees under
            one roof.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: Building2,
                title: 'Multi-role access',
                desc: 'Admin, Manager, HR, and Employee portals',
              },
              {
                icon: Briefcase,
                title: 'Task & leave management',
                desc: 'Assign tasks, approve leaves, track progress',
              },
              {
                icon: Users,
                title: 'Team collaboration',
                desc: 'Messaging, announcements, and org-wide visibility',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#009F8E1A] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#009F8E]" />
                </div>
                <div>
                  <div className="text-[15px] font-medium text-[#E0E0E0]">{title}</div>
                  <div className="text-[14px] text-[#6B7280]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-[13px] text-[#4B5563]">© 2026 EMS. All rights reserved.</p>
      </div>

      {/* Right panel: place your existing form/content inside children */}
      <div className="flex-1 flex items-center justify-center  p-6 lg:p-12">
        <div className="w-full  ">
          <div className="min-h-screen w-full bg-bg flex flex-col     justify-center px-5 sm:px-10 py-10">
            <section className="w-full flex flex-col items-center ">
              <div>
                <Stepper labels={['Admin', 'Organization', 'Review']} steps={Number(step)} />
              </div>
              <div className="w-full">
                {step === 1 && <AdminSingup />}
                {step === 2 && <OrgSingup />}
                {step === 3 && <FinalSingup />}
              </div>

          <p className="text-[14px] text-[#6B7280] text-center mt-6">
            Already registered?{' '}
            <Link to="/login" className="text-[#009F8E] font-medium hover:underline">Sign in</Link>
          </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
