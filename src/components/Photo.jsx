import { useState } from "react";
import { PHOTO_ICONS, FALLBACK_ICON } from "../lib/photoIcons";
import { TONES } from "../lib/utils";

// A real photo when `src` is set, an on-brand placeholder tile until then —
// never a broken image and never a stock photo. See public/recaps/README.md.
export default function Photo({ item, className = "", imgClassName = "" }) {
  const { src, tone = "cream", icon = "Image", label, alt } = item || {};
  const tones = TONES[tone] || TONES.cream;
  const Icon = PHOTO_ICONS[icon] || FALLBACK_ICON;
  // A lazily loaded frame snapping in at full opacity is the thing that makes a
  // gallery feel like a web page rather than a magazine. It fades instead.
  const [shown, setShown] = useState(false);
  const show = () => setShown(true);

  if (src) {
    return (
      <img
        // A cached image can finish before React attaches onLoad, and then the
        // event never fires and the frame stays invisible. `complete` catches
        // that on the way in. onError shows it too — a broken frame must still
        // render its alt text rather than nothing at all.
        ref={(el) => { if (el?.complete) show(); }}
        onLoad={show}
        onError={show}
        src={src}
        alt={alt || label || ""}
        className={`h-full w-full object-cover transition-opacity duration-500 ease-(--ease-rise) ${
          shown ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
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
