## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.
## 2026-03-19 - Skip Links in Astro Layouts
**Learning:** When dealing with Astro and sites with persistent and sticky headers, adding a visually hidden skip-to-content link right after the `<body>` opening tag is crucial for keyboard navigation and screen reader users. It ensures they don't have to tab through the navigation menu on every page load.
**Action:** Add a `<a href="#main-content" class="sr-only focus:not-sr-only...">Skip to content</a>` and apply `id="main-content" tabindex="-1"` to the `<main>` element in layout templates.
## 2024-03-20 - Contextual Link Labels & Intent Passing
**Learning:** Generic call-to-action links (like "Request scope") fail WCAG criteria for link purpose in context. Furthermore, dropping users onto a generic form after they clicked a specific service creates friction.
**Action:** Added `sr-only` context spans to generic links, and implemented URL query parameter parsing in the Contact form to pre-fill the selected service, bridging the user's intent from the referring page.

## 2026-03-23 - Interactive Menu UX and Keyboard Accessibility
**Learning:** Custom interactive components like mobile menus can be confusing for screen reader and keyboard users if the visual state is not clearly indicated and standard keyboard interactions (like `Escape` to close) are missing.
**Action:** Always ensure that toggleable components provide clear visual feedback (e.g., swapping a hamburger icon for a close icon), accurately manage `aria-expanded` attributes, and support expected keyboard shortcuts (like `Escape` for menus/modals) to quickly exit without mouse interaction.
