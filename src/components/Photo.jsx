import { PHOTO_ICONS, FALLBACK_ICON } from "../lib/photoIcons";
import { TONES } from "../lib/utils";

// Renders a real photo when `src` is present (drop files into
// /public/recaps/<year>/<month>/ and set the data's `src` field).
// Until then, shows a soft, on-brand placeholder tile instead of a
// broken image or a stock photo, per the brief's placeholder-image rule.
export default function Photo({ item, className = "", imgClassName = "" }) {
  const { src, tone = "cream", icon = "Image", label, alt } = item || {};
  const tones = TONES[tone] || TONES.cream;
  const Icon = PHOTO_ICONS[icon] || FALLBACK_ICON;

  if (src) {
    return (
      <img
        src={src}
        alt={alt || label || ""}
        className={`h-full w-full object-cover ${imgClassName}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 border p-3 ${tones.line} ${tones.bg} ${className}`}
      role="img"
      aria-label={label || "Placeholder photo"}
    >
      <Icon className={`h-6 w-6 shrink-0 ${tones.fg} opacity-70`} strokeWidth={1.5} />
      {label && (
        <span className={`text-balance text-center font-mono text-[0.7rem] leading-snug tracking-[0.04em] ${tones.fg} opacity-70`}>
          {label}
        </span>
      )}
    </div>
  );
}
