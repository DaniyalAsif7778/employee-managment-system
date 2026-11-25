import { Number, CompletionRates } from '../../import.js'
import type { LucideIcon } from 'lucide-react'
interface StatCardProps {
  title: string
  value?: number | string
  // icon?: " React.ComponentType";
  iconColor?: string
  iconBg?: string
  trend?: { value: string; isPositive: boolean }
  iconDisplay?: boolean
  trendDisplay?: boolean
  height?: string
  titleClass?: string
  valueClass?: string
  trendClass?: string
  className?: string
  icon?: LucideIcon
}

const StatCard = ({
  title = 'Total Employees',
  value,
  iconColor = '',
  iconBg = '',
  trend,
  iconDisplay = true,
  trendDisplay = true,
  height = '42',
  titleClass = '',
  valueClass = '',
  trendClass = '',
  className,
  icon,
}: StatCardProps) => {
  const Icon = icon
  return (
    <div
      className={` h-${height} ${className}    bg-surface flex flex-row  items-center justify-between duration-normal rounded-lg  p-4  border  `}
    >
      <div className=" h-full flex flex-col items-start justify-evenly">
        <h1 className={`${titleClass}text-text-disabled text-base font-light`}> {title}</h1>
        {typeof value === 'number' ? (
          <Number number={value} className={`${valueClass}text-xl`} />
        ) : (
          <span className={`${valueClass}text-xl`}>{value ?? '—'}</span>
        )}
        {trendDisplay && (
          <CompletionRates
            className={` ${trendClass}text-primary text-sm`}
            rate={22}
            time={'from last month'}
          />
        )}
      </div>
      <div className=" h-full flex justify-end  p-2 ">
        <span
          className="w-10 h-10   flex items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          {iconDisplay && Icon ? <Icon className="size-5" style={{ color: iconColor }} /> : null}
        </span>
      </div>
    </div>
  )
}

export default StatCard
