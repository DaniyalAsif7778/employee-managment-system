import React, { forwardRef,type ComponentPropsWithRef ,type ReactNode} from 'react'

interface InputProps {

 type:string ;labelClassName?:string; value:string;   prefix?:ReactNode;
    suffix?:ReactNode;placeholder?:string; error?:string; className?:string; onchange:(e:React.ChangeEvent<HTMLInputElement>)=> void   ;label:string ; name:string ; required?:boolean ; checked?:boolean;  
}

const Input = forwardRef<HTMLInputElement, InputProps>(( {type="text" ,labelClassName="", value="",   prefix="",
    suffix= "",placeholder="", error="", className="", onchange=(e)=>  void {} ,label="" ,name="" , required ,checked}, ref  ) => {
    return (
       < >
         {label &&   <label className={type == "radio" ? `text-sm text-text-primary ${labelClassName}`:`text-sm text-text-secondary ${labelClassName}`} htmlFor={name}>{label}</label> }
        <input type={type}  onChange={onchange} ref={ref}  value={value}     className={className} name={name} placeholder={placeholder} required={required} checked={checked} /> 
        { error && (
              <p className="text-xs text-error">{ error }</p>
            )}
       </>
    )
})

export default Input;
 