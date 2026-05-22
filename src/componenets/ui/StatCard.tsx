
import { Number, CompletionRates } from "../../import.js";
interface StatCardProps {
    title: string;
    value?: number;
    icon?: " React.ComponentType";
    iconColor?: string;
    iconBg?: string;
    trend?: { value: string; isPositive: boolean };
    iconDisplay?: boolean;
    trendDisplay?: boolean;
    height?: string;
    titleClass?:string;
    valueClass?:string;
    trendClass?:string;
    className?:string;
 }
const StatCard = ({
    title = "Total Employees",
    value,
    icon: Icon,
    iconColor = "",
    iconBg = "",
    trend = {},
    iconDisplay = true,
    trendDisplay = true,
    height = "42",
    titleClass= "",
    valueClass= "",
    trendClass= "",
    className,
 }: StatCardProps) => {
    return (
        <div
            className={` h-${height} ${className}    bg-surface flex flex-row  items-center justify-between duration-normal rounded-lg  p-4  border  `}
        >
            <div className=" h-full flex flex-col items-start justify-evenly">
                <h1 className={`${titleClass }text-text-disabled text-base font-light`}> {title}</h1>
                <Number number={value} className={`${valueClass}text-xl`} />
                {trendDisplay && (
                    <CompletionRates
                        className={` ${trendClass}text-primary text-sm`}
                        rate={22}
                        time={"from last month"}
                    />
                )}
            </div>
            <div className='flex justify-end' >

               <span className='w-10 h-10 flex items-center justify-center rounded-full' style={{ backgroundColor: iconBg }}><Icon  style={{ color: iconColor }} />
               </span>
            </div>
        </div>
    );
};

export default StatCard;
