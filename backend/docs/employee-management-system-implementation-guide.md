# Employee Management System

## Implementation Guide

> Multi-tenant, permission-based Employee Management System
>
> **Stack:** React · TypeScript · Tailwind CSS  |  Node.js · Express · TypeScript · MongoDB/Mongoose  |  JWT (Access + Refresh) · HttpOnly Cookies

  


---

  


# Table of Contents

**Part I — Foundations**

- [1. System Overview](#1-system-overview)
- [2. Data Models](#2-data-models)

**Part II — Core Flows**

- [3. Registration Flow](#3-registration-flow--step-by-step)
- [4. Login Flow](#4-login-flow--step-by-step)
- [5. Token Strategy](#5-token-strategy--step-by-step)
- [6. Employee Invitation Flow](#6-employee-invitation-flow--step-by-step)
- [7. Employee Activation Flow](#7-employee-activation-flow--step-by-step)
- [8. Permission System](#8-permission-system--step-by-step)
- [9. Logout & Session Management](#9-logout--session-management)

**Part III — Security**

- [10. Security Risks & Solutions Reference](#10-security-risks--solutions-reference)

**Part IV — Practices & Roadmap**

- [11. Best Practices Checklist](#11-best-practices-checklist)
- [12. Future Features Backlog](#12-future-features-backlog)

  


---

  
  


# Part I — Foundations

  


# 1. System Overview

  



| Aspect           | Decision                                                        |
| ---------------- | --------------------------------------------------------------- |
| Tenancy          | Multi-tenant — each Organization is isolated                    |
| Ownership        | Exactly one Owner per Organization                              |
| User Model       | Single unified `User` model for all roles                       |
| Authorization    | Permission-based (not role-based)                               |
| Auth Tokens      | JWT Access Token (short-lived) + JWT Refresh Token (long-lived) |
| Token Storage    | HttpOnly, Secure, SameSite cookies                              |
| Login Identifier | Email + Password (phone is secondary info only)                 |
| Password Policy  | Minimum 12 characters                                           |
| Org Identifier   | Unique slug (e.g. `ems.com/acme-solutions`)                     |


  


---

  
  


# 2. Data Models

  


## 2.1 Organization

  


```
Organization {
  _id
  name
  slug (unique, indexed)
  address
  companySize
  ownerId (ref: User)
  createdAt
  updatedAt
}
```

  


## 2.2 User

*(single model, shared by every role)*

  


```
User {
  _id
  organizationId (ref: Organization, indexed)
  fullName
  email (unique per organization)
  phone
  passwordHash
  role            // label only, e.g. "Owner", "Admin", "HR"
  permissions[]    // e.g. ["employee.create", "payroll.view"]
  status           // "pending" | "active" | "locked" | "disabled"
  isOwner (boolean)
  otp: { codeHash, expiresAt }
  loginAttempts: { count, lockedUntil }
  refreshTokens[]  // hashed, with device metadata (for rotation/revocation)
  createdAt
  updatedAt
}
```

  


> **Why one model?** Behavior differs by *permissions*, not by *type*. This avoids duplicated schemas and simplifies queries, joins, and permission checks.

  


---

  
  


# Part II — Core Flows

  


# 3. Registration Flow — Step by Step

Registration creates **Organization + Owner User** together, in a single atomic request, via a 3-step frontend wizard.

  


## Frontend Steps

  


**Step 1 — Owner Information**

1. Collect: Full Name, Email, Phone, Password, Confirm Password.
2. Client-side validation (format only — never trusted as final validation):
  - Email format check
  - Password ≥ 12 characters
  - Password === Confirm Password
3. Store values in local wizard state (not submitted yet).

  


**Step 2 — Organization Information**

1. Collect: Organization Name, Organization Slug, Address, Company Size.
2. Slug auto-suggested from Organization Name (slugify), editable by user.
3. Optional: live-check slug availability via a lightweight `GET /api/organizations/check-slug?slug=...` debounced call (UX only — real check happens server-side again on submit).

  


**Step 3 — Review**

1. Show a summary of Steps 1 & 2 for user confirmation.
2. On "Create Organization" click → send **one combined payload** to the backend.

  


## Backend Steps — `POST /api/auth/register`

  


1. **Validate request shape** — schema validation (e.g. Zod/Joi) for all required fields and types.
2. **Validate password strength** — length ≥ 12, reject common/breached passwords if a check is available.
3. **Check email uniqueness** — ensure email isn't already used.
4. **Check phone uniqueness** — ensure phone isn't already used (if enforced).
5. **Check organization slug uniqueness** — reject if taken; suggest alternatives if needed.
6. **Begin a database transaction** (Mongoose session) — registration must be atomic: either both Organization and Owner are created, or neither is.
7. **Hash the password** — bcrypt/argon2 with a strong cost factor.
8. **Create Organization document** within the transaction.
9. **Create Owner User document** within the transaction:
  - `isOwner = true`
    - `role = "Owner"`
    - `permissions = [ALL_PERMISSIONS]` (Owner implicitly has full access)
    - `status = "active"` (no activation step needed for the Owner)
10. **Link User → Organization** (`organizationId`, and `Organization.ownerId`).
11. **Commit transaction.** On any failure, roll back everything.
12. **Generate JWT Access Token** (short expiry, e.g. 15 min) containing `userId`, `organizationId`, minimal claims.
13. **Generate JWT Refresh Token** (long expiry, e.g. 7–30 days), store a hashed reference server-side (for rotation/revocation).
14. **Set HttpOnly, Secure, SameSite cookies** for both tokens.
15. **Return success response** (user + organization summary, no sensitive data) → frontend redirects to Dashboard. Registration effectively **auto-logs in** the Owner.

  


## Sequence Summary

```
Frontend Wizard (3 steps)
   → Single POST /api/auth/register
      → Validate → Hash Password → [TRANSACTION: Create Org + Create Owner + Link]
      → Generate Tokens → Set Cookies → Return Success
```

  


---

  
  


# 4. Login Flow — Step by Step

  


## Frontend

  


1. User enters Email + Password on Login page.
2. Client-side validation for format only.
3. Submit `POST /api/auth/login` with `{ email, password }` — **cookies included, no tokens handled in JS**.

  


## Backend — `POST /api/auth/login`

  


1. **Rate-limit the endpoint** per IP and per email (protects against brute force/credential stuffing before doing any DB work).
2. **Look up user by email.** If not found, proceed to Step 6 anyway with a dummy hash comparison (prevents timing/enumeration attacks) and return a **generic error**: "Invalid email or password."
3. **Check account status:**
  - If `status = "pending"` → return a generic error (do not reveal account exists/is unactivated, to avoid enumeration) or a neutral "check your email to activate your account" message, per your enumeration-risk tolerance.
  - If `status = "locked"` → return a generic error and do not proceed with password check.
4. **Compare password** against stored hash (bcrypt/argon2 compare).
5. **On failure:**
  - Increment `loginAttempts.count`.
  - If threshold exceeded (e.g. 5 attempts), set `lockedUntil` (account lock / exponential backoff).
  - Log the failed attempt (audit log) with IP/user-agent metadata.
  - Return generic error.
6. **On success:**
  - Reset `loginAttempts.count` to 0.
  - Generate **JWT Access Token** (short-lived).
  - Generate **JWT Refresh Token** (long-lived), store hashed + device/session metadata.
  - Set both as **HttpOnly, Secure, SameSite=Strict/Lax cookies**.
  - Log successful login (audit log).
7. **Return success** with minimal user profile (id, name, role, permissions, organization) — never return password hash or token values in the JSON body.

  


## Sequence Summary

```
User → Email + Password
     → Rate Limit Check
     → Lookup User → Check Status → Compare Password
     → [Fail: increment attempts / lock / generic error]
     → [Success: generate tokens → store refresh token → set cookies → login success]
```

  


---

  
  


# 5. Token Strategy — Step by Step

  


## 5.1 Access Token (JWT)

- Short expiry (e.g. 15 minutes).
- Payload: `userId`, `organizationId`, `permissions` (or a version/hash of them), `iat`, `exp`.
- Sent as an HttpOnly cookie on every request; read by middleware to authenticate.

  


## 5.2 Refresh Token (JWT)

- Long expiry (e.g. 7–30 days).
- Stored **hashed** in the database (per device/session), never stored in plaintext.
- Sent only as HttpOnly cookie, scoped to a refresh-only endpoint path (e.g. `/api/auth/refresh`) where possible.

  


## 5.3 Refresh Endpoint — `POST /api/auth/refresh`

1. Reads refresh token from cookie.
2. Validates signature + expiry.
3. Confirms the hashed token still exists and is not revoked in the DB.
4. **Rotates** the refresh token: issues a new refresh token, invalidates (deletes) the old one, stores the new hash. (Refresh Token Rotation — detects token replay/reuse.)
5. If an **already-used/rotated-out** refresh token is presented again → treat as a stolen-token signal, revoke **all** sessions for that user, and force re-login.
6. Issues a new Access Token.

  


## 5.4 Token Revocation

- Logout deletes the corresponding refresh token record server-side and clears cookies.
- "Log out of all devices" (future feature) deletes all refresh token records for the user.

  


## 5.5 Cookie Configuration (both tokens)

- `HttpOnly: true` — inaccessible to JavaScript (mitigates XSS token theft).
- `Secure: true` — HTTPS only.
- `SameSite: Strict` or `Lax` — mitigates CSRF.
- `Path` scoped appropriately (e.g. refresh cookie scoped to `/api/auth/refresh`).

  


---

  
  


# 6. Employee Invitation Flow — Step by Step

Only users with `employee.create` permission (typically the Owner, or delegated Admin) can invite.

  


1. **Owner/Admin submits invitation form**: Name, Email, Role (label), Permissions (list).
2. **Backend** `POST /api/employees/invite`:
  - Verify requester has `employee.create` permission.
  - Validate email format and uniqueness within the organization.
3. **Create a Pending User** record:
  - `status = "pending"`
  - `role`, `permissions` set as specified by the inviter
  - `organizationId` = inviter's organization
  - No password set yet.
4. **Generate Activation Token/Link** — a signed, single-use, expiring token (e.g. JWT or random token stored hashed) embedded in a URL like `https://ems.com/acme-solutions/activate?token=...`.
5. **Generate OTP** — a random 6-digit code, **hashed** before storing, with `expiresAt = now + 5 minutes`.
6. **Send Email** containing both the Activation Link and the OTP.
7. **Owner can manage pending invites:**
  - **Resend Invitation** → regenerate OTP + activation token (invalidate the old ones), resend email, rate-limited to prevent abuse.
  - **Cancel Invitation** → delete the pending user record or mark as `disabled`.

  


---

  
  


# 7. Employee Activation Flow — Step by Step

  


1. Employee clicks the **Activation Link** from the email.
2. Frontend Activation Page opens, extracting the token from the URL.
3. Frontend calls a validation endpoint (or defers validation to submission) to confirm the token corresponds to a valid pending user.
4. Employee **enters the OTP** received by email.
5. Employee **creates a password** (+ confirm password), validated client-side (≥12 chars) — never trusted as the real check.
6. Employee submits → `POST /api/employees/activate`:
  - Verify activation token is valid, not expired, and matches a pending user.
  - Verify OTP hash matches and `expiresAt` has not passed. Rate-limit OTP attempts (prevent brute-forcing a 6-digit code).
  - Validate the new password against policy.
  - Hash the new password.
  - Update user: set `passwordHash`, `status = "active"`, clear OTP fields and activation token.
7. **Account Activated** → redirect to Login page (or optionally auto-login, matching the Owner registration pattern, if desired).
8. Employee logs in via the standard [Login Flow](#4-login-flow--step-by-step).

  


---

  
  


# 8. Permission System — Step by Step

  


1. **Define a permission catalog** as constants, e.g.:
  ```
   employee.create, employee.update, employee.delete, employee.view,
   payroll.view, payroll.manage,
   attendance.manage, attendance.view,
   organization.manage
  ```
2. **Role is a label only** — stored on the user for display/grouping purposes (e.g. "HR", "Manager"). It does **not** drive access checks directly.
3. **Permissions array is the source of truth** — each user has an explicit `permissions[]` list assigned at invite time (and editable later by the Owner/Admin).
4. **Optional: Role Templates** — predefined permission sets (e.g. "HR" → `[employee.create, employee.view, attendance.manage]`) used only to **pre-fill** the permissions field when inviting; the actual grant is still the individual's `permissions[]`.
5. **Authorization middleware** — e.g. `requirePermission("employee.create")`:
  - Reads `userId` from the verified access token.
  - Loads (or reads from token claims) the user's current permissions.
  - Rejects with `403 Forbidden` if the permission is missing.
  - Applied per-route, on every protected endpoint.
6. **Organization scoping** — every query is additionally filtered by `organizationId` from the token, so permission checks never leak across tenants (defense against IDOR/broken access control).
7. **Owner override** — `isOwner = true` bypasses granular permission checks entirely (full access), but is still subject to organization scoping.

  


---

  
  


# 9. Logout & Session Management

  


1. `POST /api/auth/logout`:
  - Identify the refresh token from the cookie.
  - Delete/invalidate the matching refresh token record in the DB.
  - Clear both Access and Refresh cookies (`Set-Cookie` with `Max-Age=0`).
2. Access tokens are short-lived, so no server-side action is needed for them beyond expiry — they simply stop being valid soon after logout even if somehow retained.

  


---

  
  


# Part III — Security

  


# 10. Security Risks & Solutions Reference

  



| #   | Risk                                        | What It Means                                                                             | Solution / Mitigation                                                                                                                                                |
| --- | ------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **SQL / NoSQL Injection**                   | Malicious input alters database queries (e.g. crafted MongoDB operators in login payload) | Use Mongoose schemas with strict typing; never build queries from raw string concatenation; sanitize/strip operator-like input (`$`, `.`) from user-supplied objects |
| 2   | **Cross-Site Scripting (XSS)**              | Attacker injects scripts that run in another user's browser                               | Output encoding on render; React's default escaping; sanitize any rendered HTML; strict CSP headers; never store tokens in `localStorage`/JS-accessible storage      |
| 3   | **Cross-Site Request Forgery (CSRF)**       | Attacker tricks a logged-in user's browser into making unwanted requests                  | `SameSite=Strict/Lax` cookies; CSRF tokens on state-changing requests; verify `Origin`/`Referer` headers                                                             |
| 4   | **Brute Force Attack**                      | Repeated password guesses against login                                                   | Rate limiting per IP/account; progressive delays; account locking after N failed attempts                                                                            |
| 5   | **Credential Stuffing**                     | Attacker tries leaked email/password pairs from other breaches                            | Rate limiting; CAPTCHA after repeated failures; optional breached-password checks; encourage/support future 2FA                                                      |
| 6   | **Password Spraying**                       | Few common passwords tried across many accounts                                           | Account lockout thresholds; monitoring for distributed failed-login patterns; rate limiting by IP                                                                    |
| 7   | **Session Hijacking**                       | Attacker steals a valid session/token to impersonate a user                               | HttpOnly + Secure cookies; short access token expiry; refresh token rotation; bind sessions to device/IP metadata where feasible                                     |
| 8   | **JWT Theft**                               | Stolen access token used to impersonate the user                                          | Short expiry access tokens; HttpOnly cookies (not accessible via JS/XSS); HTTPS-only transmission                                                                    |
| 9   | **Refresh Token Theft**                     | Stolen refresh token used to mint new sessions indefinitely                               | Store hashed in DB; rotate on every use; detect reuse of an already-rotated token and revoke all sessions                                                            |
| 10  | **Token Replay Attack**                     | A captured valid token/request is resent later to repeat an action                        | Short-lived tokens; refresh rotation with reuse detection; nonces/timestamps on sensitive operations                                                                 |
| 11  | **Broken Authentication**                   | Weak or flawed login/session mechanisms overall                                           | Follow this guide's full Login/Token flows; consistent hashing, expiry, and cookie configuration                                                                     |
| 12  | **Broken Access Control**                   | Users can perform actions or view data beyond their permissions                           | Enforce `requirePermission()` middleware on every route; organization scoping on every query; default-deny                                                           |
| 13  | **IDOR (Insecure Direct Object Reference)** | Guessing/altering an ID in a request exposes another tenant's/user's data                 | Always scope lookups by `organizationId` + ownership check, not just by the record's own `_id`                                                                       |
| 14  | **Clickjacking**                            | Site embedded in a hidden iframe to trick clicks                                          | `X-Frame-Options: DENY` and/or CSP `frame-ancestors 'none'` via Helmet                                                                                               |
| 15  | **Mass Assignment**                         | Attacker sends extra fields (e.g. `isOwner: true`) that get saved unintentionally         | Explicit allow-lists (DTOs/schemas) for what fields can be set from client input — never `Object.assign` raw body onto a model                                       |
| 16  | **Rate Limit Bypass**                       | Attacker rotates IPs/headers to evade rate limiting                                       | Rate limit by multiple keys (IP + account + device fingerprint); use a robust store (Redis) rather than in-memory only                                               |
| 17  | **Email Enumeration**                       | Different responses reveal whether an email is registered                                 | Identical generic responses/timing for "user not found" vs "wrong password"; identical messaging for registration/activation where feasible                          |
| 18  | **Timing Attack**                           | Response-time differences leak information (e.g. valid vs invalid email)                  | Constant-time comparison for secrets (bcrypt naturally helps); perform a dummy hash compare even when user isn't found                                               |
| 19  | **MITM (Man-in-the-Middle)**                | Traffic intercepted between client and server                                             | Enforce HTTPS everywhere (HSTS); Secure cookie flag; no sensitive data over plain HTTP                                                                               |
| 20  | **Account Takeover**                        | Attacker gains full control of a user's account                                           | Combination of the above: strong passwords, rate limiting, token rotation, lockouts, audit logging, future 2FA                                                       |
| 21  | **Cookie Theft**                            | Stolen cookie value used to impersonate a session                                         | HttpOnly (blocks JS access), Secure (HTTPS only), SameSite (blocks cross-site leakage), short expiry                                                                 |
| 22  | **Insecure Direct Object Reference**        | *(see IDOR, #13 — duplicate entry in source requirements, same mitigation applies)*       | Same as #13                                                                                                                                                          |


  


---

  
  


# Part IV — Practices & Roadmap

  


# 11. Best Practices Checklist

  


- [ ] Validate **all** user input server-side — never trust frontend validation alone.

- [ ] Hash all passwords (bcrypt/argon2); never store or log plaintext.

- [ ] Store all secrets (JWT signing keys, DB URIs) in environment variables, never in code.

- [ ] Never expose sensitive fields (`passwordHash`, `otp`, raw tokens) in any API response.

- [ ] Return **generic** authentication error messages ("Invalid email or password").

- [ ] Sanitize all input; strip/escape dangerous characters and Mongo operators.

- [ ] Validate request bodies with a schema library on every endpoint.

- [ ] Use **database transactions** for multi-document critical operations (e.g. registration).

- [ ] Log important security events (failed logins, lockouts, token reuse, permission denials) — audit trail.

- [ ] Keep response shapes/timing consistent to avoid leaking information.

- [ ] Protect **every** private route with authentication + permission middleware.

- [ ] Implement proper, centralized authorization checks — never per-route ad hoc logic.

- [ ] Use Secure, HttpOnly, SameSite cookies for all tokens.

- [ ] Rotate refresh tokens on every use; detect and respond to reuse.

- [ ] Invalidate tokens/sessions on logout.

- [ ] Keep the access-token layer stateless; keep refresh tokens stateful (DB-tracked) for revocation.

- [ ] Follow the Principle of Least Privilege for default permission grants.

- [ ] Follow OWASP Top 10 / ASVS recommendations throughout.

- [ ] Apply Helmet for secure headers; configure CORS explicitly (no wildcard `*` with credentials); set a strict CSP.

  


---

  
  


# 12. Future Features Backlog

  



| Feature                         | Notes                                                     |
| ------------------------------- | --------------------------------------------------------- |
| Two-Factor Authentication (2FA) | TOTP-based, optional per user or enforced by Owner policy |
| Social Login                    | OAuth providers (Google, Microsoft)                       |
| SSO                             | Enterprise SAML/OIDC integration                          |
| Password Reset                  | Secure token-based flow, similar pattern to activation    |
| Change Email                    | Requires re-verification of new email                     |
| Change Password                 | Requires current password confirmation                    |
| Device Management               | List/revoke active refresh-token sessions per device      |
| Login History                   | Audit log surfaced to the user                            |
| Active Sessions                 | "Log out of all devices"                                  |
| Organization Branding           | Custom logo/colors per tenant                             |
| Custom Roles                    | Owner-defined role templates mapped to permission sets    |
| Audit Logs                      | Org-level activity log, viewable by Owner/Admin           |
| Activity Timeline               | Per-user or per-record change history                     |
| Email Templates                 | Configurable transactional email content                  |


  


---

  


*End of Implementation Guide.*