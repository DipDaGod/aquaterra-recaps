// The little ghost character AquaTerra uses across its own site. Decorative.
//
// `smiling` is opt-in and off everywhere except the ghost buddy, which the desk
// asked to smile. The face is AquaTerra's own artwork, so the default mascot
// stays exactly as it was drawn in all six other places it appears — one prop,
// one user, and nothing to unpick if the real mouth arrives and differs.
export default function Mascot({ className = "", color = "var(--color-green-bright)", smiling = false }) {
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
      {smiling && (
        <path
          d="M24.5 36.5Q32.5 43.8 40.5 36.5"
          fill="none"
          stroke="#17251d"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
