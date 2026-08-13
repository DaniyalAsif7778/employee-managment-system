# Project Packages Documentation

This document explains every major package used in the Employee Management System and why it exists.

| Package | Purpose | Example Use |
|---------|---------|-------------|
| react-hook-form | Form state management | Login, Register, Employee Forms |
| @hookform/resolvers | Connects React Hook Form with Zod | Form validation |
| zod | Schema validation | Validate API and forms |
| axios | HTTP client | API requests |
| @tanstack/react-query | Server state management | Fetching employees |
| sonner | Toast notifications | Success & error messages |
| lucide-react | SVG icons | Sidebar, Navbar |
| date-fns | Date utilities | Attendance, Payroll |
| clsx | Conditional Tailwind classes | Dynamic styling |
| class-variance-authority | Component variants | Buttons, Badges |
| tailwind-merge | Merge Tailwind classes safely | Custom components |
| cmdk | Command palette | Ctrl+K search |
| recharts | Dashboard charts | Analytics |
| react-day-picker | Calendar component | Leave requests |
| @dnd-kit/* | Drag and Drop | Task ordering |
| react-dropzone | File uploads | Avatar, Documents |
| motion | UI animations | Page transitions |
| next-themes | Theme switching | Light/Dark mode |
| husky | Git hooks | Pre-commit checks |
| lint-staged | Lint only staged files | Faster commits |
| commitlint | Enforce commit message format | Team collaboration |
| vitest | Testing framework | Unit tests |
| @testing-library/react | Component testing | UI testing |
| @testing-library/jest-dom | Extra DOM matchers | Better assertions |
| @testing-library/user-event | Simulate user interactions | Clicks, typing |

---

## Runtime Dependencies

These packages are included in the production build because the application uses them while running.

- React Router
- Axios
- TanStack Query
- React Hook Form
- Zod
- Sonner
- Lucide React
- date-fns
- clsx
- class-variance-authority
- tailwind-merge
- cmdk
- Recharts
- React Day Picker
- DnD Kit
- React Dropzone
- Motion
- next-themes

---

## Development Dependencies

These packages are used only during development and are not shipped to users.

- Husky
- lint-staged
- Commitlint
- Vitest
- Testing Library
- ESLint
- Prettier
- TypeScript
- Vite

---

## Why this stack?

This stack follows modern React development practices:

- Type-safe forms with React Hook Form + Zod.
- Efficient server state management using TanStack Query.
- Fast, accessible UI with shadcn/ui and Tailwind CSS.
- Reusable, maintainable components using CVA and Tailwind Merge.
- Better user experience with animations, notifications, calendars, and drag-and-drop.
- Consistent code quality through ESLint, Husky, Commitlint, and automated testing.
- Optimized development workflow with Vite and Vitest.