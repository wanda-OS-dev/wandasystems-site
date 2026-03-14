# Bolt's Journal

## 2024-03-24 - Astro Directives for Better Island Loading
**Learning:** React islands (like the ContactForm) initialized with `client:load` cause Astro to immediately load and execute React on initial page load. In forms placed further down the page, this causes unnecessary JS execution and blocks the main thread.
**Action:** Use `client:visible` for interactive islands located below the fold to lazily load the framework JS only when it scrolls into view, reducing the time-to-interactive (TTI) and initial page load payload.