
## 2024-03-19 - Missing Content Security Policy
**Vulnerability:** The application was missing a Content-Security-Policy header in its deployment configurations (`vercel.json` and `netlify.toml`).
**Learning:** Even static/Jamstack applications need CSP to mitigate XSS and data injection attacks. The policy must account for external services like Google Fonts and Formspree.
**Prevention:** Ensure deployment configuration files include a restrictive CSP that only allows necessary external domains and inline scripts/styles required by the framework (Astro).

## 2026-03-22 - [XSS in JSON-LD Script Tag]
**Vulnerability:** XSS vulnerability through unescaped `<` characters in JSON.stringify() output used within a `<script type="application/ld+json">` tag.
**Learning:** `JSON.stringify()` does not escape HTML entities. If user input or props (like description) contain `</script>`, it can break out of the `<script>` tag and execute arbitrary JavaScript.
**Prevention:** Always escape angle brackets in stringified JSON within script tags using `.replace(/</g, '\\u003c')`.

## 2024-11-20 - [Missing buy.stripe.com in CSP connect-src]
**Vulnerability:** The Content Security Policy (CSP) defined in `vercel.json`, `netlify.toml`, and `public/_headers` restricts `connect-src` to `'self' https://formspree.io;`. However, the app integrates with Stripe for checkouts via `https://buy.stripe.com`. As a security enhancement, adding `https://buy.stripe.com` to `connect-src` ensures that any interactive checkout scripts or preconnections to Stripe will not be blocked by the CSP.
**Learning:** CSP headers must be kept synchronized across all deployment configurations (`vercel.json`, `netlify.toml`, `public/_headers`) and accurately reflect all third-party services the frontend interacts with.
**Prevention:** Always audit external integrations (like Stripe, Formspree) and ensure their domains are explicitly allowed in the appropriate CSP directives across all header configuration files.

## 2024-03-24 - [XSS via Insecure SVG Sanitization Allowlist]
**Vulnerability:** XSS risk via SVG rendering due to expanding upon `sanitizeHtml.defaults` in `src/utils/sanitize.ts` rather than overriding it. Default allowed tags like `<a>` and attributes like `href` could permit `javascript:` payloads nested inside SVGs.
**Learning:** `sanitize-html` defaults are not safe for isolated SVG rendering contexts as they allow active navigation elements that shouldn't be permitted in simple icons.
**Prevention:** When sanitizing specifically for an SVG context, define strict, exhaustive allowlists for `allowedTags` and `allowedAttributes`, omitting the spread of default permissions entirely.

## 2026-04-06 - [Hardcoded API Key in Client Scripts]
**Vulnerability:** A Supabase API key was hardcoded in an inline `<script>` tag within `src/layouts/Layout.astro`.
**Learning:** Inline scripts (`<script is:inline>`) in Astro components execute directly on the client and expose any hardcoded secrets.
**Prevention:** Always use Astro's `define:vars` directive with `import.meta.env` references to securely inject environment variables, ensuring secrets aren't checked into version control.
## 2024-05-24 - [CSP and Service Migration]
**Vulnerability:** The Content-Security-Policy restricted `connect-src` and `form-action` to the legacy `https://formspree.io` domain, while the app was updated to use a new n8n webhook (`https://wanda.lazytechlab.de`). This prevented successful form submissions in compliant browsers.
**Learning:** When migrating external services (e.g., APIs, webhooks), all security headers, specifically CSP directives (`connect-src`, `form-action`, etc.), must be updated simultaneously across all deployment configuration files (`vercel.json`, `netlify.toml`, `public/_headers`).
**Prevention:** Add a checklist step for third-party integration changes to review and update CSP rules to avoid breaking functionality or leaving unused domains whitelisted.

## 2024-04-27 - [Ineffective Honeypot Placement]
**Vulnerability:** The honeypot validation check (`_gotcha`) was positioned after form validation (`validate()`) and state updates in `handleSubmit`.
**Learning:** Bots could trigger validation errors or detect loading states, revealing the form's logic and potentially bypassing the honeypot.
**Prevention:** Always place honeypot checks at the very beginning of submission handlers to fail early and silently before any real processing or validation occurs.
