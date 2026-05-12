import { Number,CompletionRates } from '../../import.js';
  interface StatCardProps { title: string ,
        value:  number, 
        icon:  React.ComponentType, 
        iconColor: string, 
        iconBg:  string,
        trend?: { value:  string, isPositive:  boolean }}
 
const StatCard = ({ title='Total Employees',
        value=  0, 
        icon:Icon, 
        iconColor= '#009F8E', 
        iconBg= '#009F8E1A',
        trend= { value: '+12% from last month', isPositive: true }}: StatCardProps) => {

    return (
        <div className=" h-42  bg-surface flex flex-row  items-center justify-between duration-normal rounded-md  p-4  border  ">
            <div className=" h-full flex flex-col items-start justify-evenly">
                <h1 className='text-text-disabled text-xl'> {title}</h1>
                <Number number={value} className={'text-xl'} />
                <CompletionRates className={'text-primary text-sm' }   rate={22} time={'from last month'}  />
            </div>
            <div className=' h-full flex justify-end  p-2 '   >

               <span className='w-10 h-10   flex items-center justify-center rounded-full' style={{ backgroundColor: iconBg }}><Icon  style={{ color: iconColor }} />
               </span>
            </div>
        </div>
    )
}

export default StatCard;