# Component documentation

Source of truth for UI in this app:

- Components live in `frontend/src/componenets/`
- Design tokens live in `frontend/src/index.css` (`@theme`)
- Shared drawer state lives in `frontend/src/hooks/useMenue.tsx`
- Signup step state lives in `frontend/src/store/stepperSlice.ts`

This folder is documentation only. Do not import these files into the app.

---

## 1. Component list

### Layout

| Component | Path | Role |
| --- | --- | --- |
| `Layout` | `frontend/src/Layout.jsx` | App shell: route `Outlet` + toast |
| `Header` | `frontend/src/componenets/Header.tsx` | Public navbar, mobile drawer |
| `Footer` | `frontend/src/componenets/Footer.tsx` | Links, contact, copyright |
| `DashBoard` | `frontend/src/componenets/DashBoard/DashBoard.tsx` | Dashboard shell + nested `Outlet` |
| `OverView` | `frontend/src/componenets/DashBoard/OverView.tsx` | Chooses admin/employee dashboard |
| `DashBordHeader` | `frontend/src/componenets/ui/DashBordHeader.tsx` | Dashboard sidebar / bottom nav |
| `HeaderDrawer` | `frontend/src/componenets/ui/HeaderDrawer.tsx` | Toggle dashboard nav |

### Primitives

| Component | Path | Role |
| --- | --- | --- |
| `Button` | `frontend/src/componenets/ui/Button.tsx` | Submit / action button, loading text |
| `Input` | `frontend/src/componenets/ui/Input.tsx` | Labeled field, prefix/suffix, error |
| `Select` | `frontend/src/componenets/ui/Select.tsx` | Native select using `inputBase` |
| `Icon` | `frontend/src/componenets/ui/Icon.tsx` | Wraps an icon component |
| `Avatar` | `frontend/src/componenets/ui/Avatar.tsx` | Initials circle |
| `Number` | `frontend/src/componenets/ui/Number.tsx` | Numeric heading |
| `Error` | `frontend/src/componenets/ui/error.tsx` | Simple error page |
| `Options` | `frontend/src/componenets/ui/Options.tsx` | Placeholder (empty) |

### Feedback and status

| Component | Path | Role |
| --- | --- | --- |
| `ProgressBar` | `frontend/src/componenets/ui/ProgressBar.tsx` | Native `<progress>` bar |
| `StatusBatch` | `frontend/src/componenets/ui/StatusBatch.tsx` | Task status dot |
| `CompletionRates` | `frontend/src/componenets/ui/CompletionRates.tsx` | Trend text (`+rate% time`) |
| `Stepper` | `frontend/src/componenets/ui/Stepper.tsx` | Signup / wizard steps |

### Cards and lists

| Component | Path | Role |
| --- | --- | --- |
| `StatCard` | `frontend/src/componenets/ui/StatCard.tsx` | KPI tile (title, value, trend, icon) |
| `AnnoucmentStatCard` | `frontend/src/componenets/ui/AnnoucmentStatCard.tsx` | Announcement KPI tile |
| `AnnoucmentCard` | `frontend/src/componenets/ui/AnnoucmentCard.tsx` | Announcement body card |
| `DepartmentCard` | `frontend/src/componenets/ui/DepartmentCard.tsx` | Department summary + progress |
| `RecentTasks` | `frontend/src/componenets/ui/RecentTasks.tsx` | Recent tasks table |
| `RecentHiers` | `frontend/src/componenets/ui/RecentHiers.tsx` | Recent hires list |
| `EmployeesList` | `frontend/src/componenets/ui/EmployeesList.tsx` | Empty file (not implemented) |

### Auth and settings

| Component | Path | Role |
| --- | --- | --- |
| `AuthReviewSection` | `frontend/src/componenets/ui/AuthReview.tsx` | Review block on signup |
| `AuthReviewRow` | same | Label + value row with check icon |
| `AuthTermsModal` | same | Terms overlay + close |
| `ChangePassword` | `frontend/src/componenets/ui/ChangePassword.tsx` | New / confirm password |
| `CoverImagePicker` | `frontend/src/componenets/ui/CoverImagePicker.tsx` | Cover image file + preview |
| `ProfilePicturePicker` | `frontend/src/componenets/ui/ProfilePicturePicker.tsx` | Avatar file + preview |
| `Delete` | `frontend/src/componenets/ui/Delete.tsx` | Account delete (commented out) |

---

## 2. Design tokens

Defined in `frontend/src/index.css` inside `@theme`. Use CSS variables or the matching Tailwind class (`bg-surface`, `p-4`, `rounded-lg`, `text-text-primary`).

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#000000` | Page background |
| `--color-surface` | `#121212` | Cards, panels, modals |
| `--color-navbar` | `#1f1f1f` | Navbar, sidebar, inputs |
| `--color-popover` | `#121212` | Dropdowns |
| `--color-border` | `#333333` | Default border |
| `--color-border-secondary` | `#444444` | Stronger border |
| `--color-text-primary` | `#e0e0e0` | Headings, body |
| `--color-text-secondary` | `#9ca3af` | Descriptions |
| `--color-text-disabled` | `#6b7280` | Disabled, helper |
| `--color-primary` | `#009f8e` | Buttons, links, active nav |
| `--color-primary-hover` | `#12c4d3` | Hover |
| `--color-primary-pressed` | `#0e939e` | Pressed |
| `--color-primary-fg` | `#ffffff` | Text on primary |
| `--color-success` | `#00bf6b` | Success |
| `--color-warning` | `#ffc107` | Warning |
| `--color-error` | `#ef4444` | Errors, danger |
| `--color-info` | `#3b82f6` | Info |
| `--color-ring` | `#009f8e` | Focus ring |

### Spacing, padding, margin, gap

Use these instead of one-off pixel values.

| Token | Size | Typical use |
| --- | --- | --- |
| `--spacing-0` | `0px` | Reset |
| `--spacing-1` | `4px` | Icon padding, tight gap (`p-1`, `gap-1`) |
| `--spacing-2` | `8px` | Badge padding, inline gap (`p-2`, `gap-2`) |
| `--spacing-3` | `12px` | Compact input padding (`px-3`, `p-3`) |
| `--spacing-4` | `16px` | Default card padding (`p-4`, `mb-4`) |
| `--spacing-5` | `20px` | Section inner (`p-5`, `px-5`) |
| `--spacing-6` | `24px` | Card / form section (`p-6`, `gap-6`) |
| `--spacing-8` | `32px` | Section gaps (`mb-8`, `p-8`) |
| `--spacing-10` | `40px` | Major section gap |
| `--spacing-12` | `48px` | Page vertical rhythm |
| `--spacing-16` | `64px` | Large gaps |
| `--spacing-20` | `80px` | Page top/bottom |
| `--spacing-24` | `96px` | Hero / full-bleed |

**Component defaults**

| Component | Padding | Margin / gap |
| --- | --- | --- |
| `Button` | caller `className` (often `px-3 py-1.5` or `py-2.5`) | none |
| `Input` | `px-3 py-2.5` (`inputBase`) | error `mt-1` |
| `Select` | same as input, extra `pr-9` | wrapper `mb-4`, label `mb-1.5` |
| `StatCard` | `p-4`, icon wrap `p-2` | flex `justify-between` |
| `AuthReviewSection` | `p-4` | `mb-4`, inner `gap-2.5` |
| `AuthTermsModal` | overlay `p-4`, header `px-5 py-4` | overlay `z-50` |
| `ChangePassword` | `p-6` / `md:p-8` | `mb-8`, grid `gap-6` |
| `Header` | `px-6 py-4` | nav `gap-6` |
| `Footer` | `px-6 py-8` | `mt-10`, columns `gap-8` |
| `Stepper` | circle `m-1.5`, connector `mx-2 mb-4` | wrapper `mb-8` |
| `DepartmentCard` | `px-5 py-5` | inner row `gap-1` |
| `RecentTasks` | header `p-3`, cells `py-4 px-6` | list `gap-3` |

### Sizing

| Token | Size | Use |
| --- | --- | --- |
| `--size-icon-sm` | `16px` | Small icons |
| `--size-icon-md` | `20px` | Default icons |
| `--size-icon-lg` | `24px` | Header hamburger |
| `--size-icon-xl` | `32px` | Feature icons |
| `--size-avatar-sm` | `28px` | Compact avatar |
| `--size-avatar-md` | `36px` | List avatar |
| `--size-avatar-lg` | `48px` | `Avatar` (`w-12 h-12`) |
| `--size-sidebar` | `240px` | Open sidebar |
| `--size-sidebar-collapsed` | `60px` | Collapsed sidebar |
| `--size-navbar-height` | `56px` | Top bar |
| `--size-md` | `640px` | Forms, cover picker max width |
| `--size-lg` | `768px` | Tablet |
| `--size-xl` | `1024px` | Desktop content |

### Typography

| Token | Size | Use |
| --- | --- | --- |
| `--text-xs` | `11px` | Badges, stepper labels |
| `--text-sm` | `13px` | Captions, labels |
| `--text-base` | `15px` | Body, buttons |
| `--text-md` | `16px` | Inputs |
| `--text-lg` | `18px` | Card titles |
| `--text-xl` | `20px` | Section headings |
| `--text-2xl` | `24px` | Page titles |
| `--text-3xl` | `30px` | Hero |

Weights: `--font-weight-regular` 400, `--font-weight-medium` 500, `--font-weight-semibold` 600, `--font-weight-bold` 700.

### Radius, shadow, motion, z-index

| Kind | Tokens |
| --- | --- |
| Radius | `xs` 2px, `sm` 4px (inputs), `md` 8px (cards), `lg` 12px, `xl` 16px, `2xl` 24px, `full` pills/avatars |
| Shadow | `xs`–`xl`, `--shadow-accent` focus ring |
| Duration | instant 50ms, fast 100ms, normal 200ms, slow 350ms |
| Z-index | dropdown 100, sticky 200, overlay 300, modal 400, toast 500 |

### Token usage rules

1. Surfaces: `bg-bg` page, `bg-surface` card, `bg-navbar` nav/input.
2. Text: primary for titles, secondary for body, disabled for helpers, error for validation.
3. Interactive: `bg-primary` / `hover:bg-primary-hover`, focus `ring` with `--shadow-accent`.
4. Spacing: prefer the scale above (`p-4`, `gap-3`, `mb-8`) over raw pixels.
5. Radius: inputs `rounded-md` / `radius-sm`; cards `rounded-lg`; modals `rounded-xl`.

---

## 3. Component logic (step by step)

Working copies of these helpers live in `doc/component-logic.jsx`. That file is valid JS and is **not** imported by the app, so it cannot break the build.

### Button

1. Receive `text`, `type`, `disabled`, `loading`, `onclick`, `className`.
2. Render a native `<button>` with those props.
3. If `loading` is true, show `text...`; otherwise show `text`.
4. Keep the button disabled while `disabled` is true (caller should also disable during load).

### Input

1. Merge extra HTML attributes via `...props` (value, onChange, ref).
2. If `label` exists, render a `<label htmlFor={name}>`. Radio labels use primary text; others use secondary.
3. If `prefix` or `suffix` exists, wrap the field in `relative` and pin icons left/right.
4. Apply `className` or the shared `inputBase` styles.
5. If `error` is set, show it under the field in error color with `mt-1`.

### Select

1. Reuse `inputBase` from Input so fields look the same.
2. Always render a placeholder option with empty `value`.
3. Map `options` to `<option value={option.value}>`.
4. Call `onchange` on native `onChange`.
5. If `error` is set, add `border-error` and show the message.

### Stepper

1. Read current `step` from `usestepperSlice` (Zustand). Store starts at `1`. `setStepper` increments up to 3. `setStepperDown` decrements down to 1.
2. For each label, `n = index + 1`.
3. `done = step > n`. `active = step === n`.
4. Done: primary fill + check icon. Active: primary border. Else: navbar fill.
5. Draw a connector after every step except the last; fill it only when `done`.

### Header / HeaderDrawer / DashBordHeader

1. `MenueProvider` holds `headerDrawer` and `dashBoardDrawer`.
2. Header hamburger toggles `headerDrawer`. When true, show the mobile link list.
3. HeaderDrawer button toggles `dashBoardDrawer`.
4. DashBordHeader renders only when `dashBoardDrawer` is true.
5. Map `adminLinks` (or later `employeeLinks`) to `NavLink`. Active link uses primary color and left border.

### OverView / DashBoard

1. On mount, OverView calls `setDashBoardStatus(true)` so the dashboard nav can open.
2. DashBoard renders `DashBordHeader` plus nested `Outlet` for child routes.

### StatCard

1. Left column: title, `Number` for the value, optional `CompletionRates` if `trendDisplay`.
2. Right column: optional icon in a circle whose background is `iconBg`.
3. Card uses `bg-surface`, `p-4`, `rounded-lg`, border.

### StatusBatch

1. Map status keys to color classes (`done`, `inProgress`, `overDue`).
2. Currently only `done` renders the green dot.

### CoverImagePicker / ProfilePicturePicker

1. Hidden file input; click a button to open the picker.
2. Accept listed image types only; max size 5 MB.
3. Invalid file: set local error, clear `input.value`, stop.
4. Valid file: store File, create an object URL for preview, call `register.onChange`.
5. On unmount or file change, revoke the object URL.
6. Remove: clear file, input, preview, then `onRemove()`.
7. Cover picker can open a full-screen preview modal. Profile picker shows a circular preview with hover edit/delete.

### AuthReview / AuthTermsModal

1. Section wraps children in a bordered surface.
2. Row shows a check icon, label, and value (or an em dash).
3. Terms modal: overlay click closes; inner panel `stopPropagation`; Close button calls `onClose`.

### ChangePassword

1. Two pieces of local state: new password and confirm password.
2. Controlled inputs update those strings.
3. Update button is a stub (`onClick` empty) until an API is wired.

### Delete

1. Logic is commented out. Intended path: if logged-in admin or employee, clear current user, delete that account, navigate to signup.

---

## 4. Shared class: `inputBase`

```
w-full rounded-md text-base px-3 py-2.5
bg-navbar border-[1.5px] border-border
text-text-primary placeholder:text-text-disabled
focus:border-primary focus:ring-[3px] focus:ring-primary/30
```

Use this for Input, Select, and any new text field so spacing and focus match.
