# Bolt's Journal

## 2026-03-19 - Render-Blocking @import in Global CSS
**Learning:** Using `@import` inside a main CSS file to load Google Fonts creates a sequential bottleneck. Even if fonts are preloaded in the HTML `<head>`, the CSS parser will halt and wait for the `@import` resolution, negating the async loading benefits and artificially delaying First Contentful Paint (FCP).
**Action:** Never use `@import` for external fonts in global stylesheets if the fonts are already properly preloaded and linked in the HTML document head.

## 2025-02-14 - Throttle mousemove style updates with requestAnimationFrame
**Learning:** Updating CSS custom properties synchronously inside high-frequency event handlers like `mousemove` causes layout thrashing and blocks the main thread because these events often fire faster than the screen refresh rate (e.g., 1000Hz vs 60Hz).
**Action:** Always wrap DOM style updates tied to continuous events in `requestAnimationFrame` and use a frame cache (`cancelAnimationFrame`) to match the display refresh rate and ensure smooth 60fps rendering without main thread blocking.

## 2026-03-20 - Expensive synchronous DOM operations in the <head> block rendering
**Learning:** Creating a `<canvas>` element and requesting a WebGL context (`canvas.getContext('webgl')`) is an expensive and synchronous operation. When placed inline within the document `<head>`, it forces the browser to initialize the graphics pipeline immediately, delaying First Paint (FP) and First Contentful Paint (FCP) noticeably on subsequent page loads.
**Action:** Cache the result of expensive capability checks (like WebGL support) in `sessionStorage` so the operation only executes once per user session, keeping the critical rendering path fast on subsequent navigations.
## 2026-03-22 - Inline object instantiation and data transformation in Astro templates
**Learning:** Defining objects, arrays, or performing data transformations like `Object.entries()` inline within an Astro template's markup (e.g., inside curly braces `{}`) causes these objects and computations to be redundantly evaluated on every render cycle.
**Action:** Extract all static data declarations and data transformations into the Astro component's frontmatter (the `---` block at the top). This ensures they execute only once at build time, optimizing memory usage and keeping the template logic clean.

## 2026-04-05 - Preloading with Async CSS
**Learning:** Using the `media="print" onload="this.media='all'"` pattern for asynchronous CSS loading without a `<link rel="preload">` hint means the browser won't start fetching the stylesheet until the HTML parser encounters the tag and realizes it's needed for the print media type, slowing down the eventual FCP/text rendering compared to immediately prioritizing it via preload.
**Action:** Always pair asynchronous CSS loading patterns (like `media="print" onload="..."`) with a `<link rel="preload" as="style">` tag right before it to ensure the highest network priority while still avoiding render blocking.

## 2026-04-10 - Event delegation for global link tracking
**Learning:** Attaching individual event listeners to every matched element via `document.querySelectorAll` inside a `DOMContentLoaded` event creates unnecessary memory overhead and blocks the main thread during the critical initial page load, delaying Time to Interactive (TTI).
**Action:** Always use event delegation on the `document` object with `e.target.closest(selector)` instead of looping over elements on load. This is significantly faster, reduces memory usage, and handles dynamically added elements automatically without needing to re-attach listeners.
