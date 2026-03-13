# Bolt's Journal
## 2026-03-13 - CSS @import vs HTML preload in Astro
**Learning:** Astro projects using Tailwind CSS often include a global.css file that inadvertently re-introduces render-blocking @import statements for Google Fonts, even when the main layout (Layout.astro) correctly implements async <link rel="preload">. This creates a hidden sequential request chain (HTML -> CSS -> Font) that hurts LCP.
**Action:** Always check src/styles/global.css for @import statements when a <link> tag already exists in the head, and remove the @import to enforce parallel font loading.
