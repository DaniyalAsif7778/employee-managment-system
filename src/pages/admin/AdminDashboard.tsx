import React from 'react'
import { AdminForm ,  EmployeesList} from '../../import.js'
 const   AdminDashboard=() =>{
 

  return (
    <div >
     <div className='w-full h-full p-2 '>
     
    
   <AdminForm/>
<EmployeesList/> 
     </div>
  
    </div >
  )
}

export default  AdminDashboard;