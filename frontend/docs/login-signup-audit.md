# Login and Signup Flow Audit

Reviewed: 2026-10-15

This report maps the current frontend login and organization signup flow to the backend contracts. Line references point to the current source at the time of review.

## Flow map

- Login screen: `src/pages/Login.tsx` renders `src/pages/auth/LoginAuth.tsx`.
- Signup screen: `src/pages/Singup.tsx` renders `AdminSingup`, `OrgSingup`, then `FinalSingup` using Zustand step state.
- Signup submit: `FinalSingup` merges the two Zustand stores and calls `useRegister`; `auth.service.ts` serializes that object as multipart form data and posts to `/register-org`.
- Login frontend flow: `LoginAuth` stores form data in `LoginSlice`, calls `useLogin`, and posts the credentials to `/login` through `auth.service.ts`.

## Findings

### 1. Frontend login state is not retained after success

**Where:** [LoginAuth.tsx:87](../src/pages/auth/LoginAuth.tsx#L87), [auth.service.ts:17](../src/lib/api/auth.service.ts#L17), [LoginSlice.tsx](../src/store/LoginSlice.tsx), [ProtectedRoutes.jsx:3](../src/ProtectedRoutes.jsx#L3)

The frontend now sends the login mutation and handles pending/error states. React Hook Form owns the transient login fields; Zustand stores the authenticated role for protected routes. That role is held in memory only, so a page refresh clears it and sends the user back to login.

### 2. Login identifier names disagree

**Where:** [LoginAuth.tsx:156](../src/pages/auth/LoginAuth.tsx#L156), [organization.controller.js:147](../../backend/src/controllers/orgnization/organization.controller.js#L147)

The frontend asks for an email, while `loginAdmin` reads `username`. The request contract needs one shared identifier name and matching lookup behavior before the endpoint is connected.

### 3. Backend login does not check the password

**Where:** [organization.controller.js:147](../../backend/src/controllers/orgnization/organization.controller.js#L147), [organization.controller.js:153](../../backend/src/controllers/orgnization/organization.controller.js#L153), [user.models.js:85](../../backend/src/models/user.models.js#L85)

`loginAdmin` looks up a user and generates tokens without comparing the submitted password. The user model already defines `isPasswordCorrect`, but the controller does not use it. Also, `username.replace(...)` runs before the missing-username check.

### 4. Only Admin and Employee have login destinations

**Where:** [LoginAuth.tsx:46](../src/pages/auth/LoginAuth.tsx#L46), [LoginAuth.tsx:100](../src/pages/auth/LoginAuth.tsx#L100), [main.jsx:58](../src/main.jsx#L58), [main.jsx:67](../src/main.jsx#L67)

Login uses the normalized role returned by the API. Admin routes to `/DashBoard/Dashbord`; Employee routes to `/DashBoard/EmployeeDashboard`; Manager and HR route to their corresponding dashboard pages.

`ProtectedRoutes` checks for an authenticated role, and each role route wrapper checks that role before rendering. Persistent authenticated-user state remains a frontend follow-up if sessions should survive refreshes.

### 5. Signup cover-image key has inconsistent casing

**Where:** [Singup_schem.ts:96](../src/schema/Singup_schem.ts#L96), [OrgSingup.tsx:91](../src/pages/auth/OrgSingup.tsx#L91), [routes.js:14](../../backend/src/routes/routes.js#L14), [organization.controller.js:76](../../backend/src/controllers/orgnization/organization.controller.js#L76)

The schema/type use `org_CoverImage`, while the organization form registers `org_coverImage`; the multipart route and controller expect `org_coverImage`. This can make the required schema field appear missing and prevents the picker value from using the backend's expected key.

### 6. Company-size value has incompatible formats

**Where:** [OrgSingup.tsx:24](../src/pages/auth/OrgSingup.tsx#L24), [singupTypes.ts:11](../src/types/singupTypes.ts#L11), [FinalSingup.tsx:41](../src/pages/auth/FinalSingup.tsx#L41), [organization.controller.js:105](../../backend/src/controllers/orgnization/organization.controller.js#L105), [organization.models.js:30](../../backend/src/models/%20organization.models.js#L30)

The form sends labels such as `1–10` as strings, the registration type says `number`, and the Mongo model requires a number. The controller calls `Number(companySize)` but discards the converted value. The current editor diagnostic at the final mutation also reports `string` is not assignable to `number`.

### 7. Signup omits backend-required fields

**Where:** [AdminSingup.tsx:98](../src/pages/auth/AdminSingup.tsx#L98), [AdminSingup.tsx:111](../src/pages/auth/AdminSingup.tsx#L111), [organization.controller.js:14](../../backend/src/controllers/orgnization/organization.controller.js#L14), [organization.controller.js:21](../../backend/src/controllers/orgnization/organization.controller.js#L21), [organization.controller.js:40](../../backend/src/controllers/orgnization/organization.controller.js#L40), [user.models.js:47](../../backend/src/models/user.models.js#L47)

Signup collects name, email, password, and organization fields, but no `phoneNumber`; the user model requires it. The controller also reads and checks `organizationEmail`, but the frontend sends no field under that name. The empty-string check does not catch `undefined`, so missing values may progress until model creation fails.

### 8. Industry is collected but not persisted

**Where:** [OrgSingup.tsx:149](../src/pages/auth/OrgSingup.tsx#L149), [Singup_schem.ts:98](../src/schema/Singup_schem.ts#L98), [organization.controller.js:10](../../backend/src/controllers/orgnization/organization.controller.js#L10), [organization.models.js:1](../../backend/src/models/%20organization.models.js#L1)

The form collects `industry`, but the registration controller does not read it and the organization model has no industry field. The UI marks Industry required, while its schema only checks that it is a string, so the empty option can pass validation.

### 9. Review navigation and terms state are unreliable

**Where:** [FinalSingup.tsx:21](../src/pages/auth/FinalSingup.tsx#L21), [FinalSingup.tsx:88](../src/pages/auth/FinalSingup.tsx#L88), [FinalSingup.tsx:118](../src/pages/auth/FinalSingup.tsx#L118), [FinalSingup.tsx:123](../src/pages/auth/FinalSingup.tsx#L123), [TermsConditionSlce.tsx:10](../src/store/TermsConditionSlce.tsx#L10)

The review step's Previous button has no action. Terms state starts `true`; the checkbox uses the inverse of that value for its disabled state and the Create button uses the value directly. Clicking once sets the shared state to `false`, disables the checkbox, and enables Create, so the user cannot then change that choice.

### 10. Signup naming is inconsistent

**Where:** [main.jsx:79](../src/main.jsx#L79), [LoginAuth.tsx:239](../src/pages/auth/LoginAuth.tsx#L239), [pages.ts:3](../src/pages/pages.ts#L3), [AdminSingup.tsx:33](../src/pages/auth/AdminSingup.tsx#L33)

The route, page, component, and type names use `singup` instead of `signup`. The current route and link spelling match each other, so this is primarily a discoverability and maintenance issue; renaming the route also requires updating every link and import.

## Input normalization applied

- Login email is lowercased as typed and trimmed at both ends on blur and submit. Login password fields trim leading whitespace while typing and both ends on blur and submit.
- Signup text inputs remove leading whitespace while typing and trim both ends on blur. Signup email is lowercased as typed. Zod schemas also trim names, email, organization text, password, and confirmation values before validation/submission.

## Validation

The edited login component and signup schema report no editor errors. The current editor check still reports the company-size type mismatch in `FinalSingup.tsx` described above.
