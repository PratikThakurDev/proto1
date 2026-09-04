export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
export const percent = (n) => `${Math.round(Number(n))}%`;
