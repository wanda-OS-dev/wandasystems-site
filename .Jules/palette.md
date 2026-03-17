## 2024-03-12 - Accessible Button States
**Learning:** Icon-only buttons or interactive elements like 'loading' states need proper `aria-live` and `aria-busy` attributes, and the mobile menu needs proper `aria-expanded` on the menu element if it is a dialog.
**Action:** Add proper `aria` labels to loading spinners and disabled buttons across the app.

## 2026-03-17 - Skip-to-content links
**Learning:** Adding a "skip to content" link that is only visible when focused (`sr-only focus:not-sr-only`) drastically improves keyboard navigation by letting users bypass repeated navigation elements, without cluttering the visual UI.
**Action:** When implementing a main layout, always add a visually hidden skip link right after the opening `<body>` tag that targets the main content area (which needs `tabindex="-1"` and `focus:outline-none` so it can receive programmatic focus cleanly).
