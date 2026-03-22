
## 2024-03-19 - Missing Content Security Policy
**Vulnerability:** The application was missing a Content-Security-Policy header in its deployment configurations (`vercel.json` and `netlify.toml`).
**Learning:** Even static/Jamstack applications need CSP to mitigate XSS and data injection attacks. The policy must account for external services like Google Fonts and Formspree.
**Prevention:** Ensure deployment configuration files include a restrictive CSP that only allows necessary external domains and inline scripts/styles required by the framework (Astro).

## 2026-03-22 - [XSS in JSON-LD Script Tag]
**Vulnerability:** XSS vulnerability through unescaped `<` characters in JSON.stringify() output used within a `<script type="application/ld+json">` tag.
**Learning:** `JSON.stringify()` does not escape HTML entities. If user input or props (like description) contain `</script>`, it can break out of the `<script>` tag and execute arbitrary JavaScript.
**Prevention:** Always escape angle brackets in stringified JSON within script tags using `.replace(/</g, '\\u003c')`.
