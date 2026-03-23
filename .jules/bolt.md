# Bolt's Journal

## 2026-03-19 - Render-Blocking @import in Global CSS
**Learning:** Using `@import` inside a main CSS file to load Google Fonts creates a sequential bottleneck. Even if fonts are preloaded in the HTML `<head>`, the CSS parser will halt and wait for the `@import` resolution, negating the async loading benefits and artificially delaying First Contentful Paint (FCP).
**Action:** Never use `@import` for external fonts in global stylesheets if the fonts are already properly preloaded and linked in the HTML document head.

## 2026-03-23 - DOM Style Updates on High-Frequency Events
**Learning:** Even when layout calculations (like `getBoundingClientRect`) are cached, updating DOM styles (`target.style.setProperty`) synchronously inside high-frequency event handlers like `mousemove` can cause main-thread blocking and jank. The event fires more frequently than the browser can paint (e.g. 1000Hz vs 60Hz screen refresh rate).
**Action:** Always wrap style property updates for high-frequency interactions inside `requestAnimationFrame`. Maintain a cache of the pending frame and use `cancelAnimationFrame` to drop redundant updates that occur before the next paint cycle.
