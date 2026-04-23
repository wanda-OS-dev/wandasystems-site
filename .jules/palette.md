## 2026-03-21 - [Boring vs. Professional Balance]
**Learning:** For business-oriented sites like WandaSystems, purely static layouts can feel "boring" or "stagnant". While a professional brand identity is key, users (including the owner) appreciate visual "catchiness". GPU-based 3D background rendering is a desired future enhancement to address this, provided it is executed with "glance" quality and doesn't become unprofessionally distracting.

**Action:**
1. Short-term: Use high-performance CSS-variable-based spotlight effects on key cards to add immediate "life" without compromising site speed.
2. Long-term: Explore subtle, high-end GPU/3D background effects that maintain the "technical partner" vibe while removing the "boring" feel. Avoid "over-decoration" that loses the professional edge.

## 2026-03-31 - [Conditional Character Count Announcements]
**Learning:** For inputs with character limits (like the 2000-character Contact Form message), having a constant `aria-live` region for the character count can overwhelm screen reader users on every keystroke.
**Action:** Implement a visually hidden `aria-live="polite"` region that conditionally renders only when the user approaches the maximum length (e.g. >= 95% full or >= 1900 characters) to prevent fatigue while still providing critical context.

## 2026-04-23 - [Keyboard Shortcuts Accessibility]
**Learning:** When adding keyboard shortcuts like Cmd/Ctrl+Enter for form submission, visual hints in the label should be hidden from screen readers using `aria-hidden="true"` to prevent clunky announcements. Instead, use the semantic `aria-keyshortcuts` attribute on the input element itself to properly inform Assistive Technologies.
**Action:** Always pair visual keyboard shortcut hints with the `aria-keyshortcuts` attribute on the target element.
