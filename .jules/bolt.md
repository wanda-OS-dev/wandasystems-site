# Bolt's Journal

## 2026-03-16 - Optimize React Island Hydration
**Learning:** Using `client:load` on heavy React components (like forms) that are lower on the page blocks the main thread during initial page load.
**Action:** Use `client:visible` for components below the fold so they only load and hydrate when they enter the viewport.
