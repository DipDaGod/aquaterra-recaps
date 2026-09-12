// A small decorative "blob" mascot — echoes the little ghost-like
// character used throughout the AquaTerra dashboard (notice board,
// avatars, corners of cards). Purely decorative, aria-hidden.
export default function Mascot({ className = "", color = "var(--color-green-bright)" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M32 4c15 0 24 10.5 24 24.5V52c0 2.5-2.8 3.9-4.8 2.4l-3.9-3a3 3 0 0 0-3.6 0l-3.9 3a3 3 0 0 1-3.6 0l-3.9-3a3 3 0 0 0-3.6 0l-3.9 3a3 3 0 0 1-3.6 0l-3.9-3a3 3 0 0 0-3.6 0l-3.9 3C8.8 55.9 6 54.5 6 52V28.5C6 14.5 17 4 32 4Z"
        fill={color}
      />
      <circle cx="24" cy="28" r="4.2" fill="#17251d" />
      <circle cx="41" cy="28" r="4.2" fill="#17251d" />
      <circle cx="25.4" cy="26.6" r="1.3" fill="#fbf8ef" />
      <circle cx="42.4" cy="26.6" r="1.3" fill="#fbf8ef" />
    </svg>
  );
}
