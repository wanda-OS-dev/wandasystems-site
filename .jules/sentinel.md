## 2024-03-14 - [Contact Form Input Length Limits]
**Vulnerability:** The contact form component (`src/components/ContactForm.tsx`) lacked maximum length constraints on its input fields, leaving it vulnerable to potential denial-of-service (DoS) or memory exhaustion attacks by malicious actors submitting excessively large payloads.
**Learning:** Even simple, third-party powered forms (like Formspree) need explicit client-side length limits to protect the client application state and prevent abuse.
**Prevention:** Always set `maxLength` attributes on UI form elements (`<input>`, `<textarea>`) and enforce matching string length checks in the component's internal validation logic.
