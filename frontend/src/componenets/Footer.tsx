import React from 'react'
import { NavLink } from 'react-router' // Use 'react-router-dom' if you're routing

const Footer = () => {
  return (
    <footer className="w-full bg-navbar text-text-secondary px-6 py-8 mt-10 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Logo & About */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-text-primary">EmpoManager</h2>
          <p className="text-sm max-w-sm">
            Empowering organizations to manage employees, tasks, and productivity effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-3">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <NavLink to="/" className="hover:text-primary ">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary ">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="hover:text-primary ">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/admindashboard" className="hover:text-primary ">
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info (optional) */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@empomanager.com</li>
            <li>Phone: +92 300 1234567</li>
            <li>Location: Lahore, Pakistan</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-text-disabled mt-8 pt-4 border-t border-border">
        © {new Date().getFullYear()} EmpoManager. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
