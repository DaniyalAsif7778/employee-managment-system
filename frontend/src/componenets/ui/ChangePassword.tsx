import React from 'react'
import { useState } from 'react'
const ChangePassword = () => {
  const [newpassword, setNewPassword] = useState<string>('')
  const [conformpassword, setConformPassword] = useState<string>('')

  return (
    <section className="bg-surface p-6 md:p-8 rounded-2xl border border-border mb-8 shadow-md">
      <h3 className="text-xl font-semibold mb-6">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="password"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="bg-navbar text-white px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <input
          type="password"
          value={conformpassword}
          onChange={(e) => setConformPassword(e.target.value)}
          placeholder="Confirm Password"
          className="bg-navbar text-white px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {}}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Update Password
        </button>
      </div>
    </section>
  )
}

export default ChangePassword
