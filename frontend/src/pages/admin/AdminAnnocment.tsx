import React from 'react'
import { Button , AnnoucmentStatCard,AnnoucmentCard } from '../../import.js'


 
function AdminAnnocment() {
  return (
    <div>
    <section className="w-full">
    <div className="w-full    flex flex-row justify-between items-center p-3  ">
      <div className=" ">
        <h1 className="text-text-primary font-bold text-4xl  mb-1 ">Announcements</h1>
        <p className="text-text-disabled text-base  ml-1 mb-4 ">
        Create and manage company announcements
        </p>
      </div>
      <div>
        <Button
          text="+ New Announcement"
          className={'bg-primary px-3 py-1.5 rounded-md'}
          type={'button'}
          disabled={false}
        />
      </div>
    </div>
  </section> 
  {/* Section starts here for StatsCard */}

  <section>
    <AnnoucmentStatCard/>
  </section>

  {/* Annoucment section starts from here  */}
   <section className='mt-10 p-2'>
    <AnnoucmentCard/>
   </section>
     </div>
)
}

export default AdminAnnocment