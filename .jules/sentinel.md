
## 2024-03-19 - Missing Content Security Policy
**Vulnerability:** The application was missing a Content-Security-Policy header in its deployment configurations (`vercel.json` and `netlify.toml`).
**Learning:** Even static/Jamstack applications need CSP to mitigate XSS and data injection attacks. The policy must account for external services like Google Fonts and Formspree.
**Prevention:** Ensure deployment configuration files include a restrictive CSP that only allows necessary external domains and inline scripts/styles required by the framework (Astro).
