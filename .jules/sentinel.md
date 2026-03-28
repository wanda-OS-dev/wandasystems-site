
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
