# shadcn migration context (do not lose)

Purpose: move from hand-rolled UI to shadcn **without changing page APIs or business logic**. Read this file before any migration work.

Related docs: `doc/components.md` (catalog + tokens), `doc/component-logic.jsx` (logic helpers).

**Status:** plan only. Do not start converting pages until the adapter layer exists.

---

## 1. Current stack (facts)

| Item | Value |
| --- | --- |
| App | Vite + React 19 + TypeScript |
| CSS | Tailwind **v4** (`@import 'tailwindcss'`, `@tailwindcss/vite`) |
| Tokens | `frontend/src/index.css` `@theme` (already shadcn-like names) |
| Folder typo | `frontend/src/componenets/` — **do not rename** during migration |
| Barrel | `frontend/src/componenets/components.ts` → `frontend/src/import.ts` |
| Forms | `react-hook-form` + `@hookform/resolvers` + `zod` |
| Icons | `@tabler/icons-react` (keep; do not force lucide in app screens) |
| Toasts | `react-hot-toast` in `Layout.jsx`; `sonner` is already a dependency unused |
| State | Zustand stepper, Redux slices, `useMenue` context |
| Path alias | **none** yet (`vite.config.js` has no `@/`) |
| shadcn | **not installed** (no `components.json`, no radix, no `cva`, no `tailwind-merge`) |

---

## 2. Strategy that does not break code

**Compatibility adapters, not a big-bang rewrite.**

1. Install shadcn next to existing UI.
2. Put generated primitives in a **new** folder: `frontend/src/componenets/shadcn/`.
3. Keep every existing file path (`ui/Button.tsx`, `ui/Input.tsx`, …).
4. Rewrite those files as **thin wrappers** that:
   - Accept the **same props** pages already pass (`text`, `onclick`, `onchange`, `prefix`, `error`, `inputBase`).
   - Render shadcn primitives internally.
   - Keep the same default export names.
5. Do **not** change pages until a wrapper is proven (auth forms first).
6. Domain composites (`StatCard`, `Stepper`, pickers, headers) stay custom. They only swap inner primitives.

If a caller still works with zero import changes, the migration is safe.

```
pages / Dashboard cards
        ↓  same imports
frontend/src/componenets/ui/Button.tsx   ← adapter (old props)
        ↓
frontend/src/componenets/shadcn/button.tsx  ← real shadcn
```

---

## 3. Public APIs that MUST stay (break if changed)

### `Button` (`ui/Button.tsx`)

Callers: LoginAuth, OrgSingup, AdminSingup, FinalSingup, Header, AuthReview, RecentTasks, AdminDepartment, AdminTasks, AdminEmployees, AdminAnnocment.

```ts
{
  text: string
  className: string
  type: 'button' | 'submit' | 'reset'
  link?: string          // unused in render today
  loading?: boolean      // appends "..." to text
  disabled: boolean      // default false in impl
  onclick?: (e) => void  // lowercase — maps to onClick
}
```

Adapter: map `text` → `children`, `onclick` → `onClick`, `loading` → disabled + `text...`. Keep `className` as override (pages pass full button styles).

### `Input` (`ui/Input.tsx`)

Callers: LoginAuth, OrgSingup, AdminSingup, FinalSingup, AdminTasks, AdminEmployees. **Also export `inputBase`.**

```ts
{
  type: string
  labelClassName?: string
  prefix?: ReactNode
  suffix?: ReactNode
  placeholder?: string
  error?: string
  className?: string     // often `${inputBase} pl-9`
  label?: string
  name?: string
  onclick?: () => void
  disabled?: boolean
  readonly?: boolean     // OrgSingup slug (note: native is readOnly)
  ...InputHTMLAttributes // register(), onChange, value
}
```

Preserve:

- `export const inputBase = 'w-full rounded-md ...'`
- relative wrap only if prefix/suffix
- radio label uses `text-text-primary`; others `text-text-secondary`
- error: `text-xs text-error mt-1`

### `Select` (`ui/Select.tsx`)

Callers: OrgSingup (`label`, `placeholder`, `{...register('companySize')}`, `options`).

```ts
{
  label: string
  name?: string
  value?: string
  placeholder?: string
  options: { value: string; label: string }[]
  error?: string
  onchange?: (e) => void  // lowercase
}
```

Phase 1: wrap native `<select>` with shadcn `Input`/`cn` styles (safest with RHF `register`).  
Phase 2 optional: Radix Select, still emit the same props.

### `Stepper` (`ui/Stepper.tsx`)

Caller: `Singup.tsx` — `<Stepper labels={['Admin','Organization','Review']} steps={Number(step)} />`.

Logic to preserve (Zustand `usestepperSlice`):

- `step` starts at `1`
- `setStepper`: increment if `step < 3`
- `setStepperDown`: decrement if `step >= 2`
- UI: `n = index + 1`, `done = step > n`, `active = step === n`

Do not replace this with shadcn Tabs. Optional later: shadcn for circles only.

### Image pickers

`CoverImagePicker` / `ProfilePicturePicker`: keep File validation (type list, 5 MB), object URL create/revoke, `register` / `onRemove`, cover preview modal vs profile circle hover. shadcn: `Button`, `Dialog` for cover preview only.

### Auth review

`AuthReviewSection`, `AuthReviewRow`, `AuthTermsModal`: keep overlay click-to-close, `stopPropagation` on panel. Swap overlay to shadcn `Dialog`.

### Menu / layout (do not rewrite)

- `useMenue`: `dashBoardDrawer`, `headerDrawer`, toggles
- `DashBordHeader` renders only if `dashBoardDrawer`
- `OverView` `useEffect` → `setDashBoardStatus(true)`
- `Layout.jsx` toaster — leave until a dedicated sonner phase

---

## 4. What maps to shadcn vs what stays custom

| Existing | shadcn primitive | Action |
| --- | --- | --- |
| Button | `button` | Adapter, keep old props |
| Input | `input` + `label` + `field` | Adapter + prefix/suffix |
| Select | `select` (later) | Style first, Radix later |
| Avatar | `avatar` | Map `text` initials to `AvatarFallback` |
| StatusBatch | `badge` | Map status → variant |
| ProgressBar | `progress` | Keep `value`/`max`/`label` |
| AuthTermsModal | `dialog` | Same onClose |
| Cover preview | `dialog` | Same file logic |
| ChangePassword | `input` + `button` + `card` | Same two-state fields |
| StatCard | `card` | Keep title/value/trend/icon props |
| DepartmentCard | `card` + `progress` | Keep props; data still hardcoded |
| AnnoucmentCard / StatCard | `card` | Visual only |
| RecentTasks | `table` + `button` + badge | Keep table rows |
| RecentHiers | `card` + `avatar` | Keep list |
| Stepper | none (or custom) | Keep Zustand logic |
| Header / Footer / DashBordHeader | `sheet` later for mobile | Keep nav arrays + `useMenue` |
| Icon, Number, CompletionRates | none | Keep |
| Options, Delete, EmployeesList | empty / stub | Skip |
| File pickers | dialog + button | Keep validation |

Install in this order: `button`, `input`, `label`, `card`, `badge`, `progress`, `avatar`, `dialog`, `separator`, `table`, `sheet`.

Skip until needed: calendar, dropdown-menu, sidebar, form (RHF already works).

---

## 5. Token mapping (our `@theme` → shadcn)

Our tokens already exist. Map shadcn CSS vars onto them instead of replacing the palette.

| shadcn var | Our token |
| --- | --- |
| `--background` | `--color-bg` `#000000` |
| `--foreground` | `--color-text-primary` `#e0e0e0` |
| `--card` / `--popover` | `--color-surface` `#121212` |
| `--primary` | `--color-primary` `#009f8e` |
| `--primary-foreground` | `--color-primary-fg` `#ffffff` |
| `--secondary` / `--muted` | `--color-navbar` `#1f1f1f` |
| `--muted-foreground` | `--color-text-secondary` `#9ca3af` |
| `--destructive` | `--color-error` `#ef4444` |
| `--border` | `--color-border` `#333333` |
| `--ring` | `--color-ring` `#009f8e` |
| `--radius` | `--radius-md` `8px` |

Keep spacing scale (`--spacing-1` = 4px …). Do not switch pages to new spacing in the same PR as adapters.

---

## 6. Bootstrap steps (when implementing)

1. In `frontend/`: add `class-variance-authority`, `tailwind-merge`, `clsx` (clsx already there), Radix packages as shadcn CLI adds them.
2. Add `cn()` helper: `frontend/src/lib/utils.ts`.
3. Add Vite + TS path alias `@` → `./src` (needed by shadcn CLI).
4. `components.json` with:
   - `tailwind.css`: `src/index.css`
   - `tailwind.cssVariables`: true
   - `aliases.ui`: `@/componenets/shadcn` (keep typo folder)
   - `iconLibrary`: keep default lucide for generated files; app screens stay Tabler
5. Generate primitives into `componenets/shadcn/`.
6. Wire CSS variables in `index.css` without deleting existing `--color-*`.
7. Convert wrappers one file at a time. After each: auth Login + Org signup still type-check.

**Do not** import `doc/component-logic.jsx` into the app.

---

## 7. Phase plan

### Phase 0 — scaffold (no UI change)

utils, alias, components.json, one unused shadcn Button in `shadcn/` to prove CLI.

### Phase 1 — primitive adapters (zero page edits)

`Button`, `Input` (+ `inputBase`), `Select`. Verify Login, Org, Admin, Final signup.

### Phase 2 — feedback primitives

`Avatar`, `StatusBatch`→Badge, `ProgressBar`→Progress. Verify RecentHiers, AdminEmployees, DepartmentCard.

### Phase 3 — surfaces

`StatCard`, announcement cards, `ChangePassword`, Auth review/modal → Card/Dialog. Same props.

### Phase 4 — tables / lists

`RecentTasks` uses shadcn Table + Button + Badge. Data and Add Task handler stay.

### Phase 5 — optional chrome

Mobile Header drawer → Sheet. Dashboard nav unchanged until explicitly requested.

### Phase 6 — cleanup (later, breaking by nature)

Only after adapters are stable: migrate pages from `text`/`onclick` to shadcn `children`/`onClick`. Separate PR. Not required for “faster development”.

---

## 8. Per-file logic to preserve (quick)

| File | Must keep |
| --- | --- |
| Button | loading suffix `...`, disabled, onclick |
| Input | affixes, label htmlFor=name, error, spread props, inputBase export |
| Select | placeholder empty option, options map, inputBase, error border |
| Stepper | Zustand step, done/active, connectors |
| Cover/Profile pickers | types, 5MB, object URL, register.ref merge, onRemove |
| AuthTermsModal | overlay close, inner stopPropagation |
| ChangePassword | two useState strings |
| Header | headerDrawer toggle, admin dashboard links |
| DashBordHeader | adminLinks map, NavLink isActive classes, gated by dashBoardDrawer |
| OverView | setDashBoardStatus(true) on mount |
| StatCard | Number + CompletionRates + icon circle |
| StatusBatch | done → green dot (extend via Badge variants) |

---

## 9. Risk list

- Changing `Button` to `children` only → every page breaks.
- Dropping `inputBase` export → Login/Org/Admin signup break.
- Radix Select without bridging `register()` → company size field breaks.
- Renaming `componenets` → every import breaks.
- Replacing Stepper store with local state → signup wizard breaks.
- Recreating object URLs without revoke → memory leaks (logic already correct).
- Forcing lucide in Header → visual/icon inconsistency; keep Tabler.

---

## 10. How to resume in a new chat

1. Read this file.
2. Read `doc/components.md`.
3. Implement **Phase 0**, then **Phase 1 adapters only**.
4. Do not edit pages in the same change as the first adapters.
5. Confirm Login + Organization signup still render and submit.
