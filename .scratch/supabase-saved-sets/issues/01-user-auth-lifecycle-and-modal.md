# 01 — User Auth Lifecycle and Modal

**What to build:** A complete user authentication workflow. Users can click a sign-in trigger in Chroma Chords to open a warm, accessible Lit modal where they can sign up with Email and Password, sign in with existing credentials, or sign in with Google OAuth. Authentication state persists across page reloads, displays the active user email in the application, and allows logging out cleanly.

**Blocked by:** None — can start immediately

**Status:** completed

- [x] Users can open the Auth Modal from the application header and Sets library screen.
- [x] Users can toggle between "Sign In" and "Create Account" tabs inside the modal.
- [x] Users can sign up with a valid email and password (minimum 6 characters) and receive clear success or error feedback.
- [x] Users can sign in with their email and password and have their session stored in browser storage.
- [x] Users can click "Continue with Google" to authenticate via Supabase OAuth redirect.
- [x] The app shell updates immediately when authentication state changes, displaying the logged-in email and offering a "Sign Out" action.
- [x] Session automatically refreshes and restores on page reload without requiring the user to log in again.
- [x] Automated tests verify auth state transitions and session listener subscriptions.
