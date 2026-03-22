## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.
## 2026-03-19 - Skip Links in Astro Layouts
**Learning:** When dealing with Astro and sites with persistent and sticky headers, adding a visually hidden skip-to-content link right after the `<body>` opening tag is crucial for keyboard navigation and screen reader users. It ensures they don't have to tab through the navigation menu on every page load.
**Action:** Add a `<a href="#main-content" class="sr-only focus:not-sr-only...">Skip to content</a>` and apply `id="main-content" tabindex="-1"` to the `<main>` element in layout templates.

## 2026-10-27 - Accessible Mobile Menu Dialogs
**Learning:** For interactive mobile menus, simply toggling `aria-expanded` and visibility is not enough. Screen reader and keyboard users expect native dialog-like behavior, which includes closing the menu when the Escape key is pressed and returning focus back to the menu toggle button.
**Action:** Always bind an 'Escape' key listener to mobile menus that toggles the menu closed and calls `.focus()` on the toggle button element. Add "click outside" listeners for mouse users.
