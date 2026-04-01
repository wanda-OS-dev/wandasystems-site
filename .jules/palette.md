## 2026-03-21 - [Boring vs. Professional Balance]
**Learning:** For business-oriented sites like WandaSystems, purely static layouts can feel "boring" or "stagnant". While a professional brand identity is key, users (including the owner) appreciate visual "catchiness". GPU-based 3D background rendering is a desired future enhancement to address this, provided it is executed with "glance" quality and doesn't become unprofessionally distracting.

**Action:**
1. Short-term: Use high-performance CSS-variable-based spotlight effects on key cards to add immediate "life" without compromising site speed.
2. Long-term: Explore subtle, high-end GPU/3D background effects that maintain the "technical partner" vibe while removing the "boring" feel. Avoid "over-decoration" that loses the professional edge.

## 2026-04-01 - [ARIA Dialog Triggers for Mobile Navigation]
**Learning:** Found that the mobile menu toggle button lacked the `aria-haspopup="dialog"` attribute, despite the target menu correctly using `role="dialog"`. Missing this attribute prevents screen readers from announcing that activating the button will open a dialog, which is critical context for non-visual navigation of mobile menus.
**Action:** Always ensure that trigger elements (buttons, links) that control elements with `role="dialog"` explicitly declare `aria-haspopup="dialog"`. This is a common oversight in custom responsive navigation menus.
