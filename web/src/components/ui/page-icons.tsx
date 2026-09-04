/**
 * Watermark glyphs shown on the right of the page banner.
 * Simple, heavy outlines so they read at ~230px behind the heading.
 */

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 100 100",
  "aria-hidden": true,
};

export const BankIcon = () => (
  <svg {...common}>
    <path d="M12 40 50 18l38 22" />
    <path d="M20 40v34M38 40v34M62 40v34M80 40v34" />
    <path d="M10 82h80" />
  </svg>
);

export const DocumentIcon = () => (
  <svg {...common}>
    <path d="M26 12h30l20 20v56H26z" />
    <path d="M56 12v20h20" />
    <path d="M38 52h24M38 66h24" />
  </svg>
);

export const ChartIcon = () => (
  <svg {...common}>
    <path d="M26 12h30l20 20v56H26z" />
    <path d="M56 12v20h20" />
    <path d="M38 72V56M50 72V44M62 72V62" />
  </svg>
);

export const HandshakeIcon = () => (
  <svg {...common}>
    <path d="M14 44 30 30h18l10 8 10-8h18l14 14" />
    <path d="M58 38 44 52a7 7 0 0 0 10 10l4-4 14 14a7 7 0 0 0 10-10" />
    <path d="M14 44v18M86 44v18" />
  </svg>
);

export const NewsIcon = () => (
  <svg {...common}>
    <rect x="14" y="22" width="72" height="56" rx="6" />
    <rect x="26" y="34" width="22" height="18" rx="2" />
    <path d="M60 34h14M60 46h14M26 64h48" />
  </svg>
);

export const PeopleIcon = () => (
  <svg {...common}>
    <circle cx="34" cy="30" r="12" />
    <circle cx="70" cy="34" r="10" />
    <path d="M14 84V66a20 20 0 0 1 40 0v18" />
    <path d="M62 84V68a16 16 0 0 1 26-12" />
  </svg>
);

export const SupportIcon = () => (
  <svg {...common}>
    <path d="M22 56v-6a28 28 0 0 1 56 0v6" />
    <rect x="12" y="54" width="16" height="24" rx="6" />
    <rect x="72" y="54" width="16" height="24" rx="6" />
    <path d="M78 78v4a8 8 0 0 1-8 8H54" />
  </svg>
);

export const ShieldIcon = () => (
  <svg {...common}>
    <path d="M50 12 20 24v24c0 18 13 32 30 40 17-8 30-22 30-40V24z" />
    <path d="M38 50l9 9 17-17" />
  </svg>
);

export const CompassIcon = () => (
  <svg {...common}>
    <circle cx="50" cy="50" r="36" />
    <path d="M64 36 56 56l-20 8 8-20z" />
  </svg>
);

export const LeafIcon = () => (
  <svg {...common}>
    <path d="M24 76C16 52 32 24 78 20c4 42-20 60-44 58" />
    <path d="M34 84c8-22 20-36 36-46" />
  </svg>
);

export const AwardIcon = () => (
  <svg {...common}>
    <circle cx="50" cy="38" r="22" />
    <path d="M38 56 30 88l20-10 20 10-8-32" />
  </svg>
);

export const BriefcaseIcon = () => (
  <svg {...common}>
    <rect x="14" y="32" width="72" height="50" rx="6" />
    <path d="M36 32V22a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v10" />
    <path d="M14 52h72" />
  </svg>
);
