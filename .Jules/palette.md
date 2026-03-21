## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.
## 2026-03-19 - Skip Links in Astro Layouts
**Learning:** When dealing with Astro and sites with persistent and sticky headers, adding a visually hidden skip-to-content link right after the `<body>` opening tag is crucial for keyboard navigation and screen reader users. It ensures they don't have to tab through the navigation menu on every page load.
**Action:** Add a `<a href="#main-content" class="sr-only focus:not-sr-only...">Skip to content</a>` and apply `id="main-content" tabindex="-1"` to the `<main>` element in layout templates.
## 2026-03-21 - Mobile Menu Dismissal UX
**Learning:** Mobile menus without quick dismissals (like clicking outside the container or pressing the Escape key) create significant friction, especially when the menu covers a large portion of the viewport. Focus management is also crucial when transitioning out of menus.
**Action:** Always include keyboard dismissals (Escape key) and outside-click dismissals for overlays or dropdown menus. When dismissing via keyboard, return focus back to the originating button.
