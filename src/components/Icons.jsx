// Simple hand-drawn monoline icons — no external icon library, so they
// always match the brand's exact stroke weight and color.

const common = {
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'nav-icon',
};

export function HomeIcon() {
  return (
    <svg {...common}>
      <path d="M3.5 9.5L10 4l6.5 5.5" />
      <path d="M5.5 8.5V16h9V8.5" />
    </svg>
  );
}

export function FlightsIcon() {
  return (
    <svg {...common}>
      <path d="M2 12l16-6-6 16-2-7-8-3z" />
    </svg>
  );
}

export function HotelsIcon() {
  return (
    <svg {...common}>
      <path d="M2 16V7a2 2 0 012-2h3a2 2 0 012 2v2" />
      <path d="M11 9V7a2 2 0 012-2h3a2 2 0 012 2v9" />
      <path d="M2 12h16v4" />
    </svg>
  );
}

export function ApartmentsIcon() {
  return (
    <svg {...common}>
      <rect x="4" y="3" width="12" height="14" rx="0.5" />
      <path d="M7 7h1M12 7h1M7 10h1M12 10h1M7 13h1M12 13h1" />
    </svg>
  );
}

export function AskIcon() {
  return (
    <svg {...common}>
      <path d="M3 4h14v9H8l-4 3v-3H3z" />
      <path d="M7 8h6M7 11h4" />
    </svg>
  );
}
