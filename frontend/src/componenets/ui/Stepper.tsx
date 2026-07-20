import React from 'react'
import { IconCheck } from '@tabler/icons-react'
interface StepperProps {
  labels: string[]
  steps: number
}

function Stepper({ labels = [], steps }: StepperProps) {
  return (
    <div className="flex w-full items-center mb-8">
      {labels.map((label, index) => {
        const n = index + 1

        const done = steps > n
        const active = steps === n
        return (
          <React.Fragment key={label}>
            <div className="flex  items-center">
              <div className="    flex flex-col items-center justify-center gap-2  m-1.5">
                <div
                  className={`  h-10 w-10 rounded-full flex items-center  justify-center ${done ? 'bg-primary ' : active ? 'border-2 border-primary bg-navbar text-primary' : 'bg-navbar'}`}
                >
                  {done ? (
                    <IconCheck size={10} color="white" />
                  ) : (
                    <h1 className="text-center text-sm font-medium">{n}</h1>
                  )}
                </div>
                <h1 className="text-[11px] ">{label}</h1>
              </div>

              {index < labels.length - 1 && (
                <div
                  className=" w-[400px]    h-[2px] mx-2 mb-4  bg-navbar overflow-hidden"
                 >
                  <div
                    className={`h-full w-[400px]  transition-all duration-300 ${done ? 'w-full h-[2px] bg-primary' : 'w-0 bg-navbar'}`}
                  ></div>
                </div>
              )}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Stepper
