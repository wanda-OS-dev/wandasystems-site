## 2024-05-17 - Astro Hydration Bottlenecks
**Learning:** In Astro, using `client:load` on heavy React components (like forms) that are below the fold unnecessarily blocks the main thread during initial page load, delaying Time to Interactive (TTI).
**Action:** Default to `client:visible` for interactive components that are not immediately visible in the viewport, saving `client:load` only for critical above-the-fold interactivity (like navigation menus).
