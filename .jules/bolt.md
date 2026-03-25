# Bolt's Journal

## 2026-03-19 - Render-Blocking @import in Global CSS
**Learning:** Using `@import` inside a main CSS file to load Google Fonts creates a sequential bottleneck. Even if fonts are preloaded in the HTML `<head>`, the CSS parser will halt and wait for the `@import` resolution, negating the async loading benefits and artificially delaying First Contentful Paint (FCP).
**Action:** Never use `@import` for external fonts in global stylesheets if the fonts are already properly preloaded and linked in the HTML document head.

## 2025-02-14 - Throttle mousemove style updates with requestAnimationFrame
**Learning:** Updating CSS custom properties synchronously inside high-frequency event handlers like `mousemove` causes layout thrashing and blocks the main thread because these events often fire faster than the screen refresh rate (e.g., 1000Hz vs 60Hz).
**Action:** Always wrap DOM style updates tied to continuous events in `requestAnimationFrame` and use a frame cache (`cancelAnimationFrame`) to match the display refresh rate and ensure smooth 60fps rendering without main thread blocking.
