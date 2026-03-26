## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.
## 2026-03-19 - Skip Links in Astro Layouts
**Learning:** When dealing with Astro and sites with persistent and sticky headers, adding a visually hidden skip-to-content link right after the `<body>` opening tag is crucial for keyboard navigation and screen reader users. It ensures they don't have to tab through the navigation menu on every page load.
**Action:** Add a `<a href="#main-content" class="sr-only focus:not-sr-only...">Skip to content</a>` and apply `id="main-content" tabindex="-1"` to the `<main>` element in layout templates.
## 2024-03-20 - Contextual Link Labels & Intent Passing
**Learning:** Generic call-to-action links (like "Request scope") fail WCAG criteria for link purpose in context. Furthermore, dropping users onto a generic form after they clicked a specific service creates friction.
**Action:** Added `sr-only` context spans to generic links, and implemented URL query parameter parsing in the Contact form to pre-fill the selected service, bridging the user's intent from the referring page.
## 2024-05-24 - Mobile Menu Accessibility Enhancements
**Learning:** Toggleable mobile menus often lack clear visual state feedback and keyboard accessibility (like standard shortcuts to close them), which causes poor UX for keyboard users and those with visual impairments.
**Action:** Always provide explicit visual state feedback (e.g., swapping a menu icon for a close icon), manage `aria-expanded` attributes correctly, and implement `Escape` key support to improve accessibility and interaction flow. Ensure focus is returned to the trigger button when the menu is closed via keyboard.
## 2026-10-31 - React Error State Auto-Focusing
**Learning:** When programmatically focusing invalid inputs on form submission in React, executing `.focus()` synchronously can cause screen readers to announce the input *before* React has rendered the accompanying error message or updated the `aria-invalid` state.
**Action:** Wrap `.focus()` calls in `setTimeout(..., 0)` during submission validation. This defers the focus shift until the next macrotask, ensuring the component has fully re-rendered its error state, allowing screen readers to accurately announce the newly rendered error context.
## 2026-03-26 - Focus Management During Component Replacement
**Learning:** When a form successfully submits and the component conditionally replaces the `<form>` with a success message `<div/>`, the original focused element (the submit button) unmounts. Browsers typically reset focus to the document `<body>`, forcing screen reader and keyboard users to navigate from the very top of the page again.
**Action:** Add `tabIndex={-1}` to the replacement container (like a success message) and programmatically focus it using `useRef` and `useEffect` when the state changes. This ensures continuity in navigation and immediate context delivery.
