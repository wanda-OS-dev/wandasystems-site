
## 2024-03-19 - Missing Content Security Policy
**Vulnerability:** The application was missing a Content-Security-Policy header in its deployment configurations (`vercel.json` and `netlify.toml`).
**Learning:** Even static/Jamstack applications need CSP to mitigate XSS and data injection attacks. The policy must account for external services like Google Fonts and Formspree.
**Prevention:** Ensure deployment configuration files include a restrictive CSP that only allows necessary external domains and inline scripts/styles required by the framework (Astro).

## 2026-03-22 - [XSS in JSON-LD Script Tag]
**Vulnerability:** XSS vulnerability through unescaped `<` characters in JSON.stringify() output used within a `<script type="application/ld+json">` tag.
**Learning:** `JSON.stringify()` does not escape HTML entities. If user input or props (like description) contain `</script>`, it can break out of the `<script>` tag and execute arbitrary JavaScript.
**Prevention:** Always escape angle brackets in stringified JSON within script tags using `.replace(/</g, '\\u003c')`.
## 2025-03-22 - Security Headers Enhancement and Consistency
**Vulnerability:** Inconsistent Content-Security-Policy across deployment configs (`vercel.json`, `netlify.toml`, `public/_headers`), with missing critical directives (`object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, and `upgrade-insecure-requests`). Additionally, Formspree connections were blocked in `public/_headers` due to missing `connect-src`.
**Learning:** Configurations for different hostings can easily drift apart, creating security gaps depending on where the site is deployed. The CSP must uniformly block plugins, base tag injection, and modern clickjacking.
**Prevention:** Always maintain unified security headers across all infrastructure configuration files. Use `frame-ancestors` in CSP as a modern replacement for `X-Frame-Options`.
