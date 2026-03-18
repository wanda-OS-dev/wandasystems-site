## 2024-05-15 - [Formspree Integration Lack of Constraints]
**Vulnerability:** The contact form lacked input length limits and did not enforce an API timeout on the client side when submitting data to the external Formspree service.
**Learning:** Client-side forms integrated with third-party services can be vectors for payload-based Denial of Service (DoS) attacks or can cause the client to hang indefinitely if the third-party service is unresponsive. Even if the backend handles this eventually, the client experience and resource usage is impacted.
**Prevention:** Always enforce strict validation boundaries (e.g. `maxLength`) on user inputs and employ timeout mechanisms (e.g. `AbortController`) for all external API requests on the client side to fail securely.
