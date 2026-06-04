import React from 'react'
import { NavLink } from 'react-router'

interface ButonProps {
  text:string;className:string;  type: "button" | "submit" | "reset"; link?:string; loading?:boolean;disabled:boolean, onclick?:(e:React.MouseEvent<HTMLButtonElement>)=> void
}
function Button({  text,className , type, link ,loading=false,disabled=false , onclick}:ButonProps) {
   
  return (
    
          <button  type={type} disabled={disabled} className={`${className}`}  onClick={onclick}>
        {loading ? `${text}...`: text }
    </button>
   
  
  )
}

export default Button;