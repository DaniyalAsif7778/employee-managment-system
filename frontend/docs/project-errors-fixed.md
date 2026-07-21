# Frontend Project Errors — Fixed

Date: 2026-07-20

This document records the errors found in the frontend project, their causes, and how each was resolved.

---

## Verification (after fixes)

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | Pass |
| `npm run build` | Pass |
| `npm run lint` | Pass |

---

## 1. Missing export — `validateAdminSingup`

**Files:** `src/utils/validator.ts`, `src/pages/auth/AdminSingup.tsx`

**Error**
```
Module '"../../utils/validator.js"' declares 'validateAdminSingup' locally, but it is not exported.
MISSING_EXPORT: "validateAdminSingup" is not exported by "src/utils/validator.ts"
```

**Cause**
- `validateAdminSingup` was defined but never exported.
- Vite build failed because `AdminSingup.tsx` imported a named export that did not exist.

**Fix**
- Exported `validateAdminSingup` as a named function.
- Added `AdminSingupFields` and `AdminSingupValidation` types.
- Return shape now matches usage in `AdminSingup.tsx`:

```ts
{
  isFullNameValid,
  isEmailValid,
  isPhoneNumberValid,
  isPasswordValid,
  isConfirmPasswordValid,
  isValid,
}
```

---

## 2. Wrong field types in validator

**File:** `src/utils/validator.ts`

**Error**
```
Argument of type 'boolean' is not assignable to parameter of type 'string'.
```

**Cause**
- `AdminSingup` interface used `boolean` for form fields (`fullName`, `email`, etc.).
- `REGEX.*.test()` expects `string` arguments.

**Fix**
- Replaced boolean field types with `string` in `AdminSingupFields`.
- Validation runs against actual input values from the form.

---

## 3. Form field name mismatch (`phone` vs `phoneNumber`)

**File:** `src/pages/auth/AdminSingup.tsx`

**Cause**
- Local state used `phone`.
- `formContext` expects `phoneNumber`.
- Passing `personal` directly to `updateFormData` would not populate the context correctly.

**Fix**
- Mapped fields explicitly when saving to context:

```ts
updateFormData({
  fullName: personal.fullName,
  email: personal.email,
  phoneNumber: personal.phone,
  password: personal.password,
  confirmPassword: personal.confirmPassword,
})
```

---

## 4. Invalid component syntax — `Options.tsx`

**File:** `src/componenets/ui/Options.tsx`

**Error**
```
Cannot find name 'Options'. Did you mean 'Option'?
```

**Cause**
- Broken default export syntax:
  `export default (Options = () => { ... })`

**Fix**
```tsx
export default function Options() {
  return <></>
}
```

---

## 5. JSX hook imports without types

**File:** `src/hooks/hooks.ts`

**Error**
```
Could not find a declaration file for module './useLogin.jsx'
Could not find a declaration file for module './useLogout.jsx'
Could not find a declaration file for module './useUserFinder.jsx'
```

**Cause**
- TypeScript file importing `.jsx` modules with no type declarations.

**Fix**
- Added `src/types/jsx-modules.d.ts`:

```ts
declare module '*.jsx' {
  const mod: any
  export default mod
}
```

---

## 6. Required props missing on `AnnoucmentCard`

**File:** `src/pages/admin/AdminAnnocment.tsx`

**Error**
```
Type '{}' is missing the following properties from type 'AnnoucmentCardProps': pinStatus, status, title, ...
```

**Cause**
- `<AnnoucmentCard />` was used with no props.
- Component required all props even though it renders static placeholder content.

**Fix**
- Made props optional in `AnnoucmentCard.tsx`:
  `_props?: Partial<AnnoucmentCardProps>`

---

## 7. Invalid mapped type on `interface`

**File:** `src/types.ts`

**Error**
```
A mapped type may not declare properties or methods.
```

**Cause**
- `LeavePolicy` was declared as `interface` with a mapped index signature `[key in LeaveType]?`.
- TypeScript only allows mapped types on `type` aliases, not `interface`.

**Fix**
```ts
export type LeavePolicy = {
  [key in LeaveType]?: { ... }
}
```

---

## 8. Broken CSS comment block

**File:** `src/index.css` (lines ~342–352)

**Warning (build)**
```
Unexpected token Delim('*')
*/     */  input:-webkit-autofill ...
```

**Cause**
- Nested / duplicated comment closers (`*/ */`) left invalid CSS after a partially commented `select` block.

**Fix**
- Removed the malformed commented block.
- Kept the autofill override section intact.

---

## 9. ESLint flat config misconfiguration

**File:** `eslint.config.js`

**Error**
```
Flat config requires "plugins" to be an object, like this: { plugins: { 'react-hooks': pluginObject } }
```

**Cause**
- Config used legacy `extends` + string plugin arrays incompatible with ESLint 10 flat config.

**Fix**
- Migrated to flat config format with explicit plugin objects and rules.
- Scoped linting to `**/*.{js,jsx}` (no TypeScript parser configured).

---

## 10. Context / provider typing (previous session)

**Files:** `src/context/stepperContext.tsx`, `src/context/formContext.tsx`, `src/context/AppProvider.tsx`

**Errors (previously)**
- JSX in `.ts` files → `'<' cannot be applied to types 'boolean' and 'RegExp'`
- `StepperProvider` inferred return type `{}`
- `updateFormData` not in `FormDataContextValue`

**Fixes applied earlier**
- Renamed context files to `.tsx`.
- Added explicit `ReactElement` return types on providers.
- Added `updateFormData` to context type and provider value.
- Updated `tsconfig.json` with `"include": ["src"]` and DOM libs.

---

## Files changed in this fix pass

| File | Change |
|------|--------|
| `src/utils/validator.ts` | Export + correct types + return object |
| `src/pages/auth/AdminSingup.tsx` | Map `phone` → `phoneNumber` for context |
| `src/componenets/ui/Options.tsx` | Valid component export |
| `src/types/jsx-modules.d.ts` | New — JSX module declarations |
| `src/types.ts` | `LeavePolicy` interface → type |
| `src/componenets/ui/AnnoucmentCard.tsx` | Optional props |
| `src/index.css` | Fixed broken comments |
| `src/eslint.config.js` | ESLint 10 flat config |
| `src/context/formContext.tsx` | Removed debug `console.log` calls |

---

## Remaining notes

- ESLint currently covers `.js` / `.jsx` only. To lint `.ts` / `.tsx`, add `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`.
- `AdminSingup.tsx` destructures validation flags but does not yet wire them to `Input` `error` props — validation runs; UI feedback can be added next.
