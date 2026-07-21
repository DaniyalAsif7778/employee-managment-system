import React from 'react'
import { IconDotsVertical, IconPinned, IconSpeakerphone } from '@tabler/icons-react'


interface AnnoucmentCardProps {
pinStatus: boolean,
status:string,
title:string,
description:string,
creatorStatus:string,
creationDate:string,
createTime:string,
views:string,


}

function AnnoucmentCard(_props?: Partial<AnnoucmentCardProps>) {
  return (
    <div className="border  rounded-md bg-surface p-2   flex flex-row gap-4 ">
      <div className="h-full w-10 ">
        <IconSpeakerphone
          stroke={2}
          width={50}
          height={50}
          color="yellow"
          style={{
            backgroundColor: 'rgba(255, 235, 59, 0.2)', // 20% transparent yellow
            borderRadius: '50%',
            padding: '8px',
          }}
        />{' '}
      </div>
      <div className="p-3">
        <div className="flex flex-row justify-between mb-3 ">
          <div className='flex flex-row gap-4  '>
            <div className='flex flex-row justify-center items-center   rounded-lg px-4 py-1'>
              
              <IconPinned stroke={2} />
              <span>Pinned</span>
            </div>
            <div className='flex flex-row justify-center items-center    bg-gray-100/5  rounded-lg px-4 py-1'>
              <span>Company-wide</span>
            </div>
          </div>
          <IconDotsVertical stroke={1} color="grey" />
        </div>
        <div className=''>
          <h1>Pinned Company-wide Company All-Hands Meeting</h1>
          <p className='mt-2'>
            Join us for our quarterly all-hands meeting this Friday at 10 AM PST. We'll discuss Q1
            247 views{' '}
          </p>
        </div>
        <div className='mt-2'>
          <p>
            <span>Admin User .</span>
            <span> Mar 28, 2026 at 2:30 PM .</span>
            <span> 247 views</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnnoucmentCard
