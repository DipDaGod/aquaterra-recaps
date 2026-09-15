import { useEffect, useRef } from "react";
import { TEAM_ROSTER } from "../data/editions";
import { TEAMS } from "../lib/utils";

// AQUATERRA set enormous, with eight circular windows drifting around it. Each
// window is a different horizontal slice of the SAME video frame — one decoder,
// eight views into it — drawn to a canvas rather than eight <video> elements.
//
// Kept cheap on purpose:
//  - one <video>, `preload="none"`, not fetched at all until the banner is
//    near the viewport
//  - one requestAnimationFrame loop for all eight canvases, capped at 15fps.
//    It is decoration; 60fps would burn four times the CPU for nothing
//  - both the loop and the video stop the moment the banner scrolls out of
//    view or the tab is hidden, which lets the decoder release its buffers
//  - 160x160 backing stores (1.6MB for all eight) and no readbacks
//  - under reduced motion the video is never loaded: the poster is drawn once
//    and that is the whole effect
//
// Before the video exists — or if it fails — each bubble keeps its team-colour
// tint, so the banner is complete-looking either way.
const VIDEO_SRC = "/assets/footer-vid.mp4";
// Optional. Only fetched under reduced motion, and its absence is silent —
// the bubbles keep their team-colour tint.
const POSTER_SRC = "/assets/footer-vid.jpg";

// What the footage shows. If footer-vid.mp4 is replaced with something else,
// this has to change with it — it is the only description a screen reader gets.
const DESCRIPTION = "Students and kids from AquaTerra drives waving hello";

const SIZE = 160;
const FRAME_MS = 1000 / 15;

// Positions from the desk's own markup, kept exactly. The sample point for each
// is its index across the row, which is what the original's background-position
// percentages (0%, 14.28%, … 100%) were expressing.
const BUBBLES = [
  { size: "lg", left: 10, top: 26 },
  { size: "md", left: 26, top: 78 },
  { size: "sm", left: 39, top: 8 },
  { size: "sm", left: 56, top: 90 },
  { size: "md", left: 69, top: 13 },
  { size: "lg", left: 89, top: 29 },
  { size: "md", left: 92, top: 75 },
  { size: "sm", left: 7, top: 68 },
];

export default function OrbitBanner() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const ctxs = canvasRefs.current.filter(Boolean).map((c) => c.getContext("2d"));
    if (ctxs.length === 0) return;

    let raf = 0;
    let last = 0;
    let running = false;
    let onScreen = false;

    // Each bubble takes a square crop, stepping left to right across the frame.
    function paint(source, sw, sh) {
      if (!sw || !sh) return;
      const side = Math.min(sw, sh);
      const spare = sw - side;
      const top = (sh - side) / 2;
      for (let i = 0; i < ctxs.length; i++) {
        const at = ctxs.length > 1 ? i / (ctxs.length - 1) : 0;
        ctxs[i].drawImage(source, at * spare, top, side, side, 0, 0, SIZE, SIZE);
      }
    }

    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME_MS) return;
      last = now;
      if (video.readyState >= 2) paint(video, video.videoWidth, video.videoHeight);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      video.pause();
    }

    function start() {
      if (running || !onScreen || document.hidden) return;
      running = true;
      // preload="none" means this is also what fetches the file.
      video.play().catch(() => stop());
      last = 0;
      raf = requestAnimationFrame(tick);
    }

    // One still, no decoding, no loop.
    function paintPoster() {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => paint(img, img.naturalWidth, img.naturalHeight);
      img.src = POSTER_SRC;
    }

    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      paintPoster();
      return undefined;
    }

    // If the file isn't there yet, the tints stay and nothing else happens.
    video.addEventListener("error", stop);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    let observer;
    if (typeof IntersectionObserver === "undefined") {
      onScreen = true;
      start();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
          if (onScreen) start();
          else stop();
        },
        // Warm up just before it arrives, so the first frames aren't blank.
        { rootMargin: "200px 0px" }
      );
      observer.observe(root);
    }

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("error", stop);
    };
  }, []);

  return (
    <div ref={rootRef} className="aq-orbit">
      <video
        ref={videoRef}
        className="aq-orbit-src"
        src={VIDEO_SRC}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="aq-orbit-ring" role="img" aria-label={DESCRIPTION}>
        {BUBBLES.map((bubble, i) => (
          <span
            key={i}
            className={`aq-bubble aq-bubble--${bubble.size}`}
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              // The palette, as the state before any frame is drawn.
              background: TEAMS[TEAM_ROSTER[i % TEAM_ROSTER.length].key].raw,
              animationDelay: `${(i * 0.7).toFixed(2)}s`,
              animationDuration: `${(9 + (i % 4) * 1.6).toFixed(1)}s`,
            }}
          >
            <canvas
              ref={(el) => (canvasRefs.current[i] = el)}
              width={SIZE}
              height={SIZE}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>

      <p className="aq-orbit-word">AQUATERRA</p>
    </div>
  );
}
