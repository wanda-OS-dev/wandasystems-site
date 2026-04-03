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

## 2026-04-03 - Preloading async font stylesheets
**Learning:** While the `media="print" onload="this.media='all'"` pattern effectively prevents render-blocking for Google Fonts CSS, the browser assigns the stylesheet a lower download priority initially. This can delay the fetching of the CSS file.
**Action:** Always pair the async `media="print"` trick with an explicit `<link rel="preload" as="style" href="...">` for the same CSS URL. This ensures the critical font CSS is fetched immediately with high priority, accelerating First Contentful Paint (FCP).
