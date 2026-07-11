import React from 'react'
import ProgressBar from './ProgressBar.js'
import {
  IconDotsVertical as EllipsisVertical,
  IconUsers,
  IconTrendingUp,
} from '@tabler/icons-react'
interface DepartmentCardProps {
  themeColor: string
  title: string
  leadName: string
  employeesNo: number
  budget: number
  performance: number
  link?: string

  onclick?: (event: React.MouseEvent<HTMLButtonElement>) => {}
}

const DepartmentCard = ({
  themeColor = 'red',
  title = 'Project Alpha',
  leadName = 'John Doe',
  employeesNo = 15,
  budget = 50000,
  performance = 85,
  link,

  onclick,
}: DepartmentCardProps) => {
  return (
    <>
      <div className=" bg-surface  relative  w-68 flex flex-col justify-evenly border   h-82 rounded-lg px-5 py-5">
        <div
          className={`w-full absolute top-0 left-0 -z-0  h-2.5 bg-primary rounded-tr-lg rounded-tl-lg `}
        ></div>
        <div className="flex flex-row justify-between   items-start  ">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl">Engineering</h1>
            <p className="text-base ">David Wilson</p>
          </div>
          <div className="mt-2">
            {/*options fo more tasks */} <EllipsisVertical size={18} />
          </div>
        </div>
        <div className="flex flex-row justify-between   items-center   ">
          <h3 className="font-light text-text-secondary text-base flex flex-row gap-1 ">
            {' '}
            <IconUsers size={18} /> Employees
          </h3>
          <p className="text-text-primary text-base">45</p>
        </div>
        <div className="flex flex-row justify-between   items-center   ">
          <h3 className="font-light text-text-secondary text-base">Budget</h3>
          <p className="text-text-primary text-base">$2.4M</p>
        </div>
        <div>
          <div className="flex flex-row justify-between   items-center   ">
            <h2 className="font-light text-text-secondary text-base flex flex-row items-center  gap-1 ">
              <IconTrendingUp size={20} />
              Performance
            </h2>
            <p className="text-text-primary text-base">94%</p>
          </div>
          <div className="ml-2">
            {/*progress bar here*/}
            <ProgressBar
              label={''}
              value={0}
              max={100}
              className={'w-full mt-2'}
              themeColor={themeColor}
            />
          </div>
        </div>
        <div className="text-center mt-5">{/*Link here*/}View Details</div>
      </div>
    </>
  )
}

export default DepartmentCard
