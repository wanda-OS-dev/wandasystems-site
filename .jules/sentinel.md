## 2024-05-24 - [Strict SVG Sanitization]
**Vulnerability:** XSS risk via SVG sanitization allowing default HTML tags and attributes.
**Learning:** `sanitizeHtml` by default merges custom allowed tags/attributes with its default list (which includes dangerous tags like `a` with `href` if used in an SVG context incorrectly).
**Prevention:** When using `sanitize-html` for specific contexts like SVG, explicitly define all allowed tags and attributes, and do not use or spread `sanitizeHtml.defaults`.
