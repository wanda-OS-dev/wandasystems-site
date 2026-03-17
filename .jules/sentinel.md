## 2024-05-24 - Input Length Limits
**Vulnerability:** Missing input length validation on form submissions, potential for minor Denial of Service (DoS) or application degradation.
**Learning:** Forms utilizing external submission handlers (like Formspree) still need robust client-side and structural validation to prevent oversized payloads and abuse.
**Prevention:** Always add `maxLength` constraints to HTML inputs and corresponding length checks in JavaScript validation logic before submission.
