# NexPlay

## Current State
The AuthPage already has email, username, and password fields for both Sign In and Create Account. The login flow uses localStorage to verify email/password locally, then calls `login()` (Internet Identity) and creates a backend profile. The register flow validates email domain (@gmail.com or @comptonusd.net), stores user credentials in localStorage, and calls the backend `saveCallerUserProfile`.

The previous user request was to "Add login and register with password and email and usernames" which has already been implemented.

The current request is simply "Yes" -- confirming to proceed.

## Requested Changes (Diff)

### Add
- Nothing new to add; the feature is already implemented.

### Modify
- Ensure the AuthPage is clean and fully functional with email + password + username for both sign in and register.
- Make sure the login flow properly matches username display in the UI after login.

### Remove
- Nothing to remove.

## Implementation Plan
1. Verify AuthPage has all three fields (username, email, password) working correctly for both tabs.
2. Ensure no leftover references to the old username-only flow.
3. Validate and deploy.
