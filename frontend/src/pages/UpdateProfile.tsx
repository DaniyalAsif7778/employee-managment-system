import { useState } from 'react'

const UpdateProfile = () => {
  const [name, setName] = useState<string>('')
  const [oldname, setOldName] = useState<string>('')
  const [email, setEmail] = useState()

  return (
    <section className="bg-surface p-6 md:p-8 rounded-2xl border border-border  mb-8 shadow-md">
      <h3 className="text-xl font-semibold mb-6">Update Profile</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          value={oldname}

          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setOldName(e.target.value)
          }}
          placeholder=" Old Name"
          className="bg-navbar  text-white px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary  transition"
        />

        <input
          type="text"
          value={name}

          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
          }}
          placeholder="Full Name"
          className="bg-navbar  text-white px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary  transition"
        />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            value={name}

            onChange={(e)=>{
               setName(e.target.value)
            }}
            placeholder="Full Name"
            className="bg-navbar text-white px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          <input
            type="email"
            value={email}

            onChange={(e)=>{
               setEmail(e.target.value)
           }}
            placeholder="Email Address"
            className="bg-navbar text-white px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div> */}

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {}}
          className="bg-primary  hover:bg-primary-hover  text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Save Changes
        </button>
      </div>
    </section>
  )
}

export default UpdateProfile
