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
## 2026-03-27 - Character Limit Warnings & Required Asterisks
**Learning:** Screen readers announce the '*' character for required fields as "star", creating auditory noise when `aria-required` is already present. Additionally, character limits without visual feedback cause users to hit a hard stop unexpectedly when typing long inputs.
**Action:** Add `aria-hidden="true"` to required asterisks to clean up screen reader output. Implement dynamic visual feedback (like changing text color to warning/red) on character counters when users approach the maximum length limit.

## 2026-03-29 - [Lang Attribute Fix]
**Learning:** The entire site was written in English, but the base Layout had `lang="de"` and a default German description. Screen readers use the `lang` attribute to determine pronunciation; reading English text with German rules causes severe accessibility issues and unintelligible speech.
**Action:** Always verify that the `lang` attribute matches the primary language of the content, especially on boilerplate templates or translated sites.

## 2024-05-30 - Global Sticky Header Anchor Link Offset
**Learning:** When navigating via anchor links on a page with a fixed or sticky header, the browser's default scroll behavior places the target element at the very top of the viewport, causing the header to obscure the section's title.
**Action:** Apply a global `scroll-padding-top` (e.g., `scroll-pt-24`) to the `html` element rather than adding individual `scroll-mt-*` classes to every section. This ensures all anchor links consistently account for the sticky header offset globally.

## 2026-04-01 - Equivalent Visual Feedback for Keyboard Focus
**Learning:** Tailwind `group-hover` styles are often applied to interactive elements (like anchor tags acting as cards) without an equivalent focus state. This creates an inconsistent and poor experience for keyboard-only users navigating via focus, as they miss visual cues provided to mouse users. Additionally, mouse-dependent CSS variables (like `--mouse-x`) can break styles if they lack fallback values.
**Action:** When applying `group-hover` utility classes to interactive components, always include corresponding `group-focus-visible` classes to ensure keyboard-only users receive equivalent visual feedback. Explicitly provide fallback values (e.g., `var(--mouse-x, 50%)`) for mouse-tied CSS variables.
## 2024-04-15 - Contextual Screen Reader Text for Repeated Links
**Learning:** Generic call-to-action links in mapped list components (like "Learn more" on service cards) fail WCAG criteria for "link purpose in context." Screen reader users navigating by landmarks or jumping from link to link hear "Learn more... Learn more... Learn more..." without understanding what each link points to.
**Action:** When using generic link text like "Learn more" or "Read more" in mapped card components, always append visually hidden (`sr-only`) context spans (e.g., `<span class="sr-only"> about {title}</span>`) to ensure screen readers announce a complete, contextual phrase.
## 2024-04-22 - Visual List Numbers
**Learning:** Screen readers announce semantic `<ol>` list items with numbers by default. Adding visual custom numbers inside the `<li>` causes the number to be announced twice.
**Action:** Add `aria-hidden="true"` to visual number elements when they are inside a semantic ordered or unordered list.
