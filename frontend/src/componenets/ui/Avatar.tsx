import React from 'react'
interface avatar {
  color:{ red:number, green:number,blue:number },
  text:string
}
 const  Avatar =({color={red:122, green:122,blue:122},text="D"}:avatar) => {
  return (
    <div className={`bg-${color}-400/10 w-12 h-12 rounded-3xl flex items-center justify-center 
                bg-red-500/50 text-white font-black text-xs 
                shadow-[0_0_10px_rgba(220,38,38,0.3)]  `}> 
        <h1 className={` text-2xl text-${color}-600 text-2xl font-semibold `}>{text}</h1>
    </div>
  )
}

export default Avatar  