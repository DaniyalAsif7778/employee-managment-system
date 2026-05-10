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
        <div className="bg-surface flex flex-row  justify-between duration-normal rounded-md p-2   border  ">
            <div>
                <h3 className='text-text-disabled text-sm'> {title}</h3>
                <Number number={value} className={'text-xl'} />
                <CompletionRates className={'text-primary text-sm' }   rate={22} time={'from last month'}  />
            </div>
            <div className='flex justify-end'   >

               <span className='w-10 h-10 flex items-center justify-center rounded-full' style={{ backgroundColor: iconBg }}><Icon  style={{ color: iconColor }} />
               </span>
            </div>
        </div>
    )
}

export default StatCard;