
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

## 2024-05-20 - [Fix CSP connect-src and form-action for n8n Webhook]
**Vulnerability:** The Content Security Policy (CSP) defined in `vercel.json`, `netlify.toml`, and `public/_headers` still explicitly restricted `connect-src` and `form-action` to `'self' https://formspree.io`, which caused modern browsers to block all outgoing requests and form submissions made from `ContactForm.tsx` to the newly deployed n8n webhook at `https://wanda.lazytechlab.de/n8n/webhook/customer-inquiry`. This resulted in a silent, but complete breakage of the site's primary conversion mechanism on production.
**Learning:** Changing integration endpoints in frontend code (`fetch` URLs) necessitates a synchronized update of the deployment configuration's Content Security Policy headers, which are often duplicated across multiple deployment platforms (Vercel, Netlify) to maintain a consistent security posture.
**Prevention:** Whenever changing external integration URLs (e.g., swapping form providers or analytics platforms), explicitly verify that the new domains are allowed within the CSP's `connect-src` and/or `form-action` directives in all relevant configuration files (`vercel.json`, `netlify.toml`, `public/_headers`).
