/** Inline SVG icons — no icon font, no network request. */

type P = { className?: string };
const box = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const SearchIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

export const SunIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>
);

export const MoonIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8" /></svg>
);

export const GithubIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
    <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
);

export const CloseIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
);

export const LangIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><path d="M4 5h10M9 3v2c0 4-2 7-5 8M7 10c0 3 3 5 6 6M13 21l4-9 4 9M15.5 17h5" /></svg>
);

export const CopyIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
);

export const CheckIcon = (p: P) => (
  <svg {...box} {...p} aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
);
