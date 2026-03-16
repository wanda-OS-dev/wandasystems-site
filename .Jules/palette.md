## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.

## 2024-11-20 - Skip to Main Content Link Accessibility
**Learning:** Sticky headers and global atmospheric backgrounds can pose an accessibility issue for keyboard and screen reader users, who have to repeatedly tab through the main navigation on every page. Providing a hidden "Skip to main content" link that becomes visible on focus greatly enhances usability. The main tag also needs `tabindex="-1"` and focus removal so it can receive focus programmatically.
**Action:** Always ensure high-level layouts containing sticky headers include a visible-on-focus skip link.
