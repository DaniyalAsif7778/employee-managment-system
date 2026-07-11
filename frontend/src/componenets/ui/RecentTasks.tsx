import Button from './Button.js'
import StatusBatch from './StatusBatch.js'
import { IconDotsVertical as EllipsisVertical } from '@tabler/icons-react'
const RecentTasks = () => {
  return (
    <div className=" border   rounded-md flex flex-col gap-3  outline-none bg-[#121212]">
      <div className="w-full    flex flex-row justify-between items-center p-3 border-b border-text-disabled">
        <div className=" ">
          <h2 className="font-semibold text-text-primary">Recent Tasks</h2>
          <p className="text-sm">Track ongoing project tasks</p>
        </div>
        <div>
          <Button
            text="+ Add Task"
            className={'bg-primary px-3 py-1.5 rounded-md'}
            type={'button'}
            disabled={false}
          />
        </div>
      </div>
      <div>
        <table className="w-full  table-fixed border-collapse text-center ">
          <thead className="border-b border-text-disabled">
            <tr className=" ">
              <th className="  py-4 px-6 ">Task</th>
              <th className="  py-4 px-6 ">Assignee</th>
              <th className="  py-4 px-6 ">Status</th>
              <th className="  py-4 px-6 ">Due Date</th>
              <th className="  py-4 px-6 "> </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-[#1F1F1F] transition-colors border-text-disabled">
              <td className="  truncate py-4 px-6 ">Update employee handbook</td>
              <td className="truncate  py-4 px-6 ">Sarah Johnson</td>
              <td className=" truncate  py-4 px-6 ">
                <StatusBatch task={{ status: 'done' }} />
              </td>
              <td className=" truncate  py-4 px-6 "> 30 March</td>
              <td className="  truncate py-4 px-6 ">
                {' '}
                <EllipsisVertical size={17} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentTasks
