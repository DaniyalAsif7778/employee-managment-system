import React, { useEffect } from 'react'
import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'

import { HeaderDrawer } from './components.js'
import { Button } from './components.js'
import { useLogout, useMenue } from '../hooks/hooks.js'
import type { RootState } from '../store/store.js'

const Header = () => {
  const { headerDrawer, toggleHeaderDrawer } = useMenue()
  const currentUser = useSelector((state: RootState) => state.currentUser.user)
  const { logOutHandler } = useLogout()

  useEffect(() => {
    console.log(currentUser, 'admin')
  }, [currentUser])

  const isLoggedIn = currentUser?.loginStatus

  return (
    <header className="w-full bg-navbar text-text-primary border-b border-border px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <HeaderDrawer />

          <h1 className=" font-bold text-xl whitespace-nowrap">
            <span className="text-primary ">Emplo</span>
            <span className="text-text-primary">Manager</span>
          </h1>
        </div>

        {/* Hamburger Button (Mobile) */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={toggleHeaderDrawer}
            className="text-text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {headerDrawer ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <ul className="flex gap-5">
            <li>
              <NavLink to="/" className="hover:text-primary-hover transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary-hover transition">
                About
              </NavLink>
            </li>
            {currentUser?.role == 'admin' && (
              <li>
                <NavLink to="/DashBoard" className="hover:text-primary-hover transition">
                  Dashboard
                </NavLink>
              </li>
            )}
            {currentUser?.role == 'employee' && (
              <li>
                <NavLink to="/DashBoard" className="hover:text-primary-hover transition">
                  Dashboard
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/DashBoard/settings" className="hover:text-primary-hover transition">
                  Settings
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/singup" className="hover:text-primary-hover transition">
                  Sign up
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/login" className="hover:text-primary-hover transition">
                  Login
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <Button
                onclick={() => {
                  logOutHandler()
                }}
                text="Logout"
                className={`  py-2.5 rounded-md font-medium transition
              bg-primary text-white
              hover:bg-primary-hover`}
                type="button"
                disabled={false}
              />
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {headerDrawer && (
        <div className="sm:hidden mt-4">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li>
              <NavLink to="/" className="hover:text-primary-hover transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary-hover transition">
                About
              </NavLink>
            </li>
            {currentUser?.role == 'admin' && (
              <li>
                <NavLink to="/DashBoard" className="hover:text-primary-hover transition">
                  Dashboard
                </NavLink>
              </li>
            )}
            {currentUser?.role == 'employee' && (
              <li>
                <NavLink to="/DashBoard" className="hover:text-primary-hover transition">
                  Dashboard
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/DashBoard/settings" className="hover:text-primary-hover transition">
                  Settings
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/singup" className="hover:text-primary-hover transition">
                  Sign up
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/login" className="hover:text-primary-hover transition">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
