import sanitizeHtml from 'sanitize-html';

export function sanitizeSVG(html: string): string {
  // Security: Remove default allowed tags/attributes to strictly enforce SVG-only elements
  // This prevents malicious HTML injection (like <a> or <img>) inside SVG payloads.
  return sanitizeHtml(html, {
    allowedTags: [
      'svg', 'path', 'circle', 'rect', 'polygon', 'polyline', 'line', 'g', 'defs', 'clipPath', 'use'
    ],
    allowedAttributes: {
      'svg': ['width', 'height', 'viewBox', 'viewbox', 'fill', 'xmlns', 'class', 'aria-hidden'],
      'path': ['d', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'clip-rule', 'fill-rule'],
      'rect': ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'stroke', 'stroke-width'],
      'circle': ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width'],
      'line': ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width', 'stroke-linecap'],
      'polyline': ['points', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'],
      'polygon': ['points', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'],
      'g': ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'clip-path'],
    }
  });
}
