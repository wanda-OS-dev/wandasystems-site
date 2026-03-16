## 2024-03-16 - Contact Form Resource Exhaustion Prevention
**Vulnerability:** Contact forms missing maximum length constraints and API timeouts.
**Learning:** Third-party form integrations without timeouts can hang indefinitely, and missing length checks allow users to submit arbitrarily large payloads.
**Prevention:** Implement client-side `maxLength` attributes, validation error handling for sizes, and an `AbortController` timeout for external API requests.
