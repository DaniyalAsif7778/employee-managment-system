import React, { useState } from "react";
 
   import toast from "react-hot-toast";
   import { v4 as uuidv4 } from "uuid";
 const  AdminForm = ()=>{
  

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  

  return (
    <div className="h-max w-full bg-surface mt-10">
      <form
         className="flex flex-col justify-start sm:flex-row items-between"
      >
        <div className="w-full p-2 sm:w-1/2">
          <div className="w-5/5 sm:w-4/5 flex flex-col items-start justify-center gap-2 p-3.5">
            <label htmlFor="task-title" className="text-text-primary">
              Task Title:
            </label>
            <input
              id="task-title"
              name="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Create Title"
              className="text-text-disabled bg-navbar border outline-none w-full p-1 border-border-secondary"
            />
          </div>

          <div className="w-5/5 sm:w-4/5 flex flex-col items-start justify-center gap-2 p-3.5">
            <label htmlFor="date" className="text-text-primary">
              Date:
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-text-disabled border bg-navbar outline-none w-full p-1 border-border-secondary"
            />
          </div>

          <div className="w-5/5 sm:w-4/5 flex flex-col items-start justify-center gap-2 p-3.5">
  <label htmlFor="assign-to" className="text-text-primary">
    Assign To:
  </label>
  <input
    id="assign-to"
    name="assign-to"
    type="text"
    value={assignedTo}
     placeholder="Employee username"
    list="employee-list"
    className="text-text-disabled border bg-navbar outline-none w-full p-1 border-border-secondary"
  />
  <datalist id="employee-list">
    {/* {currentadmin.Employees.map((emp) => (
      <option key={emp.id} value={emp.userName} />
    ))} */}
  </datalist>
</div>
          <div className="w-5/5 sm:w-4/5 flex flex-col items-start justify-center gap-2 p-3.5">
            <label htmlFor="category" className="text-text-primary">
              Category:
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="text-text-disabled border bg-navbar outline-none w-full p-1 border-border-secondary"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <div className="w-full h-full flex flex-col items-start justify-end">
            <div className="w-full flex flex-col items-start sm:items-center sm:justify-between gap-2 p-4">
              <label htmlFor="description" className="text-text-primary">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-4/5 h-109.75 text-text-secondary bg-navbar outline-none rounded border border-border"
              ></textarea>
            </div>
            <div className="w-full flex justify-start p-4">
              <button
                type="submit"
                className="text-text-primary p-2 w-full bg-primary"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export  default  AdminForm  
