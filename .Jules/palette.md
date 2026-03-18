## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.

## 2024-11-20 - Skip-to-content Link for Keyboard Accessibility
**Learning:** Sites with persistent or lengthy navigation (like the top sticky header here) can be frustrating for keyboard-only users who have to tab through all nav items repeatedly.
**Action:** Always include a 'Skip to main content' link as the first focusable element in the DOM that becomes visible on focus and jumps straight to the `<main>` content area.
