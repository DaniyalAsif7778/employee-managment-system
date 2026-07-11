import React from 'react'
import UpdateProfile from './UpdateProfile.js'
import ChangePassword from '../componenets/ui/ChangePassword.js'
// import Delete from "../componenets/ui/Delete.js";
const Settings = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto py-10 px-6 text-text-primary font-sans">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Settings</h2>

        <UpdateProfile />
        <ChangePassword />

        {/* Preferences Section */}

        {/* Danger Zone */}
        {/* <Delete /> */}
      </div>
    </div>
  )
}

export default Settings
