# Test Plan — Conduit Cypress Automation

## Scope
This suite covers core user flows of the Conduit (RealWorld) demo application:
authentication, article management, and account settings.

## Coverage

| Feature | Scenario | Method |
|---|---|---|
| Signup | Valid signup via UI | UI |
| Signup | Re-signup with existing email overwrites account (documented app behavior) | API |
| Login | Valid credentials | UI |
| Login | Invalid credentials show error | UI |
| Logout | Session clears, Sign in link reappears | UI |
| Article | Create via authenticated API session | API + UI |
| Article | Edit existing article | API + UI |
| Article | Delete article | API + UI |
| Navigation | Sign In / Sign Up links route correctly | UI |

## Known Application Behavior
The `/api/users` signup endpoint does not enforce email uniqueness — re-submitting
Signup with an already-registered email returns `201 Created` and overwrites the
existing account (new username, new token) rather than rejecting the request.
Confirmed via direct API testing(Postman) and profile-page verification. Documented as a test case rather than treated as a suite defect.

## Out of Scope (possible future additions)
- Comments on articles
- Profile editing / follow-unfollow
- Tag-based feed filtering