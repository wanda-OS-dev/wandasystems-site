## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.

## 2026-03-14 - Skip to Content Links
**Learning:** Skip to content links are essential for keyboard navigation, allowing screen reader and keyboard users to bypass repetitive navigation elements on every page.
**Action:** Always add a visually hidden 'Skip to main content' link that becomes visible on focus at the top of the body tag, pointing to the main content area.
