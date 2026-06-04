<div align="center">

# 🏢 EmpoManager

### Employee Management System — Frontend

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)

<br/>

A full-featured employee management platform with role-based dashboards, secure authentication, task management, leave tracking, and real-time team visibility.

<br/>

![Dashboard Preview](/src/assets/readme.png)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Routing Architecture](#routing-architecture)
- [State Management](#state-management)
- [Data Shapes](#data-shapes)
- [Build Steps](#build-steps)
- [App Flow](#app-flow)

---

## Overview

EmpoManager is a **React + TypeScript** frontend for managing employees, tasks, departments, and leave — built with low-level design principles, secure authentication, and a clean component architecture.

| Role | Access |
|------|--------|
| **Admin** | Full dashboard · Manage employees · Assign tasks · View reports · Manage departments |
| **Employee** | Personal dashboard · View own tasks · Apply for leave · View schedule & colleagues |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Routing | React Router v6 |
| State | Redux Toolkit |
| Styling | Tailwind CSS |
| Build tool | Vite |
| HTTP | Axios (or fetch) |
| Notifications | React Hot Toast |
| SEO | React Helmet |

---

## Features

### 🔐 Secure Authentication
- Redux Toolkit stores all auth state — user info, role, login status, token
- Email and password validated with regex before any form submission
- Auth token stored in `localStorage` — **never plain passwords**
- Role-based route guards block cross-role access automatically
- `GuestRoute` prevents logged-in users from revisiting login or signup

### 🗂 Redux Toolkit State
- **`authSlice`** — `user`, `loginStatus`, `role`, `token`
- **`employeeSlice`** — employee list, selected employee, loading, error states
- Async thunks simulate real API calls for all CRUD operations
- Selectors provide clean access to state without prop drilling

### 👨‍💼 Admin Dashboard
- Stat overview — employee count, active tasks, completion rate, departments
- Employee table — search, department filter, add / edit / delete with confirm dialog
- Task management — create, assign to employee, filter by status, mark done, delete
- Reports — completion by department, employee performance table, CSV export
- Department management — workload cards, add / edit departments

### 👤 Employee Dashboard
- Personal stats — my tasks, completed count, leave balance, next meeting time
- Task list scoped to logged-in employee only — mark in-progress or done
- Leave management — balance cards (annual/sick/casual), apply form, history table
- Schedule — 7-day week strip, click any day to see its meetings
- Colleagues — team grid with online / away / offline status
- Announcements — company-wide notices filtered by type

### 🎨 UI/UX Standards
- Fully responsive — mobile, tablet, and desktop layouts
- Reusable component library: `Button`, `Input`, `Modal`, `Table`, `Badge`, `EmptyState`, `Loader`
- Inline form validation errors, success toasts, and loading indicators
- Accessible — proper `aria-label`, focus outlines, sufficient contrast ratios
- Debounced inputs — validation doesn't fire on every keystroke

### ⚡ SEO & Performance
- Unique `<title>` and `<meta description>` per page via React Helmet
- Semantic HTML — `<header>`, `<main>`, `<section>`, `<nav>` used correctly
- All pages lazy-loaded with `React.lazy` + `Suspense`
- SVG icons used throughout — zero extra image HTTP requests
- Environment variables separate dev, staging, and production API base URLs

---

## Folder Structure

```
src/
├── components/
│   ├── shared/          # StatCard, TaskItem, StatusBadge, Avatar, ProgressBar
│   ├── admin/           # EmployeeTable, CreateTaskForm, ActivityFeed, DepartmentCard
│   ├── employee/        # LeaveBalanceCards, ScheduleList, ColleagueCard, AnnouncementCard
│   └── ui/              # Button, Input, Modal, Loader, EmptyState, FilterBar
│
├── pages/
│   ├── public/          # Home, About, Login, Signup
│   ├── admin/           # AdminDashbord, AdminEmployees, AdminTasks, AdminReports, AdminDepartment
│   └── employee/        # EmpolyDashBoard, EmployeeTasks, EmployeeLeave, EmployeeSchedule, Colleagues, Annoucments
│
├── store/
│   ├── store.js         # Redux store config
│   ├── authSlice.js     # Auth state — user, role, loginStatus, token
│   └── employeeSlice.js # Employee list, CRUD async thunks, loading/error states
│
├── hooks/
│   ├── useAuth.js       # Access auth state and actions
│   ├── useLogout.js     # Clear state + localStorage + redirect
│   └── useValidator.js  # Email/password regex validation helpers
│
├── context/
│   └── AuthProvider.jsx # Auth context wrapping the app
│
├── utils/
│   ├── validators.js    # Regex patterns for email and password
│   └── formatters.js    # Date, name, and number formatters
│
├── imports.js           # Central re-export file for all pages and components
├── Layout.jsx           # Root layout with Outlet
├── main.jsx             # App entry — providers + router
└── index.css            # Tailwind imports + CSS design tokens
```

---

 
 
## Routing Architecture

```
/ (Layout)
├── /                     → Home             [public]
├── /about                → About            [public]
├── /login                → Login            [guest only — redirects if logged in]
├── /signup               → Signup           [guest only — redirects if logged in]
│
└── /DashBoard            → Dashboard shell  [protected — must be logged in]
    ├── index             → RoleRedirect     [admin → AdminDashbord, employee → employeedashboard]
    ├── /overview         → OverView         [any logged-in user]
    ├── /settings         → Settings         [any logged-in user]
    │
    ├── [AdminRoute]      → admin role only
    │   ├── /AdminDashbord
    │   ├── /AdminEmployees
    │   ├── /AdminTasks
    │   ├── /AdminReports
    │   ├── /AdminDepartment
    │   └── /AdminProfile
    │
    └── [EmployeeRoute]   → employee role only
        ├── /employeedashboard
        ├── /EmployeeTasks
        ├── /EmployeeLeave
        ├── /EmployeeSchedule
        ├── /Colleagues
        └── /Annoucments
```

### Route Guards

| Guard | Behaviour |
|-------|-----------|
| `ProtectedRoute` | Redirects to `/login` if not logged in |
| `GuestRoute` | Redirects to `/DashBoard` if already logged in |
| `AdminRoute` | Redirects employee → `/DashBoard/employeedashboard` |
| `EmployeeRoute` | Redirects admin → `/DashBoard/AdminDashbord` |
| `RoleRedirect` | Reads role and sends user to the correct index page |

 

 

## Build Steps

Follow these steps in order for the cleanest development experience:

| # | Step | What to build |
|---|------|---------------|
| 1 | **Setup & Base Layout** | Init Vite + TypeScript, configure React Router, create outer shell (navbar + sidebar + main), make responsive from day one |
| 2 | **Design System** | Tailwind config with color variables, typography scale, CSS design tokens in `index.css` |
| 3 | **Authentication UI** | Login + Signup pages, regex validation, password toggle, role selection, disable submit on invalid |
| 4 | **Route Guards** | `ProtectedRoute`, `GuestRoute`, `AdminRoute`, `EmployeeRoute`, `RoleRedirect`, 404 fallback |
| 5 | **Redux Setup** | `authSlice`, `employeeSlice`, async thunks, selectors, connect `Provider` in `main.jsx` |
| 6 | **Admin Pages** | `AdminDashbord`, `AdminEmployees`, `AdminTasks`, `AdminReports`, `AdminDepartment` |
| 7 | **Employee Pages** | `EmpolyDashBoard`, `EmployeeTasks`, `EmployeeLeave`, `EmployeeSchedule`, `Colleagues`, `Annoucments` |
| 8 | **Data States** | `Loader`, `EmptyState`, error banners, disable-during-fetch patterns |
| 9 | **TypeScript Strict** | Interfaces for all data shapes, typed props, typed Redux state, remove all `any` |
| 10 | **Responsiveness** | Mobile bottom nav, single-column stacking, test at 375px / 768px / 1280px |
| 11 | **SEO & Performance** | React Helmet per page, `React.lazy` all pages, SVG icons, `.env` config |

---

## App Flow

```
User opens app
      │
      ▼
  Logged in?
  ├── NO  → Public pages (Home, About, Login, Signup)
  └── YES → Check role
              ├── admin    → /DashBoard/AdminDashbord
              └── employee → /DashBoard/employeedashboard
                                      │
                              User works in dashboard
                                      │
                              Clicks Logout
                                      │
                              Clear token + state
                                      │
                              Redirect to /  (Home)

                              
 
 ```
 
 

<div align="center">

Built with ❤️ using React · TypeScript · Redux Toolkit · Tailwind CSS

</div>
