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
//
// Readiness drives the loop, rather than the loop polling for it: the paint
// pauses the moment there is no frame to draw (`waiting`) and starts again when
// there is (`playing`). Everything that can halt it is recoverable, because the
// banner mounts once for the whole app (App.jsx keeps it outside the routed
// div) — anything permanent here is permanent until a reload.
const VIDEO_SRC = "/assets/footer-vid.mp4";
// Optional. Only fetched under reduced motion, and its absence is silent —
// the bubbles keep their team-colour tint.
const POSTER_SRC = "/assets/footer-vid.jpg";

// What the footage shows. If footer-vid.mp4 is replaced with something else,
// this has to change with it — it is the only description a screen reader gets.
const DESCRIPTION = "Students and kids from AquaTerra drives waving hello";

const SIZE = 160;
const FRAME_MS = 1000 / 15;

// How much warning the fetch gets. The file is ~584KB and faststart, so it can
// play from the first packets, but 200px of lead time on a phone meant the
// banner regularly arrived before its first frame did. Still lazy: a reader who
// never reaches the footer never downloads it.
const WARM_MARGIN = "600px 0px";

// A decoration is not worth hammering the network for, but one dropped
// connection should not cost the rest of the visit either. After a media error
// `play()` keeps failing until the element is reloaded, so a retry has to call
// `load()` — that is the part that actually recovers.
const RETRY_MS = [1500, 4000, 10000];

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
    let painting = false;
    let onScreen = false;
    let attempt = 0;
    let retry = 0;
    // A play() rejection is only ours if nothing has superseded it. Without
    // this, a rejection from a play() we already abandoned arrives late and
    // stops the run that replaced it.
    let generation = 0;
    let gesture = null;
    let gone = false;

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

    // Worth drawing at all: on screen, tab in front, still mounted.
    function wanted() {
      return onScreen && !document.hidden && !gone;
    }

    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME_MS) return;
      last = now;
      paint(video, video.videoWidth, video.videoHeight);
    }

    // Nothing new to draw, or nowhere worth drawing it. The canvases keep the
    // last frame either way, so this reads as a pause rather than a blank.
    function stopPainting() {
      if (!painting) return;
      painting = false;
      cancelAnimationFrame(raf);
    }

    // HAVE_CURRENT_DATA or better. Below it there is no frame, and the loop
    // would spin at 15fps drawing nothing until there was one.
    function startPainting() {
      if (painting || !wanted() || video.readyState < 2) return;
      painting = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    }

    function pauseVideo() {
      stopPainting();
      generation++;
      video.pause();
    }

    function playVideo() {
      if (!wanted() || !video.paused) return;
      const mine = ++generation;
      // preload="none" means this is also what fetches the file.
      video.play().catch(() => {
        if (mine !== generation || !wanted()) return;
        scheduleRetry();
      });
    }

    function resume() {
      playVideo();
      startPainting();
    }

    function scheduleRetry() {
      if (retry || !wanted()) return;
      if (attempt >= RETRY_MS.length) {
        armGesture();
        return;
      }
      retry = window.setTimeout(() => {
        retry = 0;
        if (!wanted()) return;
        video.load();
        resume();
      }, RETRY_MS[attempt++]);
    }

    // Some devices refuse autoplay outright however muted the video is — iOS in
    // Low Power Mode is the common one — and no amount of retrying clears that.
    // A gesture does, so spend the next one on it.
    function armGesture() {
      if (gesture) return;
      const go = () => {
        gesture = null;
        attempt = 0;
        resume();
      };
      gesture = () => window.removeEventListener("pointerdown", go);
      window.addEventListener("pointerdown", go, { once: true, passive: true });
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

    // Loaded and not-loaded, as events. `playing` covers both the first start
    // and every recovery from a stall, so it is what restarts the paint.
    const onLoaded = () => startPainting();
    // Only actual playback clears the retry count. `canplay` must not: a device
    // that refuses autoplay reaches it on every load() and would retry forever.
    const onPlaying = () => {
      attempt = 0;
      startPainting();
    };
    const onStarved = () => stopPainting();
    const onFailed = () => {
      stopPainting();
      scheduleRetry();
    };
    const media = [
      ["loadeddata", onLoaded],
      ["canplay", onLoaded],
      ["playing", onPlaying],
      ["waiting", onStarved],
      ["emptied", onStarved],
      ["error", onFailed],
    ];
    for (const [type, fn] of media) video.addEventListener(type, fn);

    const onVisibility = () => (document.hidden ? pauseVideo() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    let observer;
    if (typeof IntersectionObserver === "undefined") {
      onScreen = true;
      resume();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          // The LAST record, not the first. A fling can deliver several
          // crossings in one callback, and acting on the oldest leaves the
          // banner stopped while it is sitting there on screen.
          onScreen = entries[entries.length - 1].isIntersecting;
          if (onScreen) resume();
          else pauseVideo();
        },
        { rootMargin: WARM_MARGIN }
      );
      observer.observe(root);
    }

    return () => {
      gone = true;
      clearTimeout(retry);
      pauseVideo();
      gesture?.();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      for (const [type, fn] of media) video.removeEventListener(type, fn);
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

      <div className="aq-orbit-stage">
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
    </div>
  );
}
