// Base URL helper for GitHub Pages deployment
// In production: /wandasystems-site, in dev: ""
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path}`;
