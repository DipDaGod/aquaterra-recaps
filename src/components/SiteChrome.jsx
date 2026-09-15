import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { Meta } from "./Lockup";
import Mascot from "./Mascot";
import { sectionAccent } from "../lib/utils";
import { getEdition } from "../data/editions";
import { issueSections } from "../lib/issueSections";

// Renders the real logo once it exists at /public/assets/logo.png; falls
// back to a simple monogram so the build/site never breaks on a missing file.
function Logo({ className = "h-8 w-8" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={`grid place-items-center rounded-full bg-green text-cream-soft ${className}`}>
        <span className="font-accent text-lg italic leading-none">a</span>
      </span>
    );
  }
  return (
    <img
      src="/assets/logo.png"
      alt=""
      className={`rounded-full object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

// The menu is this issue's index. It used to mirror the parent site's own nav,
// which meant a second front door to pages the magazine has no part in — and a
// separate "in this issue" block further down doing the real job. The menu now
// reads the same section manifest the page numbers itself from, so it can
// never list a section the issue doesn't carry.
//
// Nothing here links out to ngoaquaterra.com.
function useIssueSections() {
  const { pathname } = useLocation();
  const [, year, month] = pathname.split("/");
  const edition = year && month ? getEdition(year, month) : null;
  return edition ? issueSections(edition) : [];
}

function MenuItem({ section, onNavigate }) {
  const a = sectionAccent(section.accent);
  return (
    <a
      href={`#${section.id}`}
      onClick={onNavigate}
      className="flex items-center justify-between gap-2 rounded-full px-3.5 py-2.5 text-ink transition-colors hover:bg-paper sm:px-4"
    >
      <span className="flex min-w-0 items-baseline gap-2.5">
        <Meta className={a.text}>{String(section.index).padStart(2, "0")}</Meta>
        <span className="truncate text-[0.9rem] font-semibold">{section.label}</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-ink-3">→</span>
    </a>
  );
}

export function TopBar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const sections = useIssueSections();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const hasMenu = sections.length > 0;

  return (
    <div className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3 rounded-full border border-line/70 bg-cream-soft/95 py-2 pl-3 pr-2 shadow-(--shadow-card) backdrop-blur-md sm:pl-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex min-w-0 items-center gap-2.5"
            aria-label="AquaTerra Recaps — all editions"
          >
            <Logo className="h-7 w-7 shrink-0" />
            <span className="flex min-w-0 items-center gap-2">
              <span className="hidden truncate text-sm font-semibold tracking-tight min-[380px]:inline">AquaTerra</span>
              <span className="shrink-0 rounded-full bg-green px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream-soft">
                Recaps
              </span>
            </span>
          </Link>

          {hasMenu && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close the issue index" : "Open the issue index"}
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-ink transition-colors hover:bg-paper"
            >
              <Meta className="hidden sm:inline">In this issue</Meta>
              {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          )}
        </div>

        {open && hasMenu && (
          <nav
            id={panelId}
            aria-label="In this issue"
            className="reveal mt-2 rounded-[1.75rem] border border-line/70 bg-cream-soft p-3 shadow-(--shadow-card-hover) sm:p-4"
          >
            <Meta className="block px-2 pb-2 pt-1 text-ink-3">In this issue</Meta>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {sections.map((section) => (
                <MenuItem key={section.id} section={section} onNavigate={() => setOpen(false)} />
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

// Rebuilt against a screenshot of the parent site's own footer, supplied by
// the desk. Two parts, exactly as it runs there: a cream letter panel inset on
// a black ground, then a black bar carrying the wordmark, the two socials and
// the legal lines.
//
// The handwritten sign-off is back. It came out of the previous version as
// "corny" — it turns out to be the live site's own, and aq.md §4 reserves
// Caveat for precisely this one use. Still once. Don't spread it.
//
// Every string below is AquaTerra's own copy: the letter is aq.md §3's
// reference passage verbatim, the legal line and "est. 2021 · 1,300+ members"
// are §2.
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/ngo.aquaterra" },
  // aq.md §2 confirms the LinkedIn exists and is named "NGO AquaTerra" but
  // publishes no URL, and a company slug is not something to guess. Renders as
  // a plain pill until the desk supplies it.
  { label: "LinkedIn", href: null },
];

function Social({ label, href }) {
  const skin =
    "inline-flex items-center justify-center rounded-full border border-cream-soft/15 bg-cream-soft/5 px-5 py-2.5 text-cream-soft";
  if (!href) {
    return (
      <span className={`${skin} opacity-55`} title="[LinkedIn URL]">
        <Meta>{label}</Meta>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${skin} transition-colors hover:border-cream-soft/35 hover:bg-cream-soft/15`}
    >
      <Meta>{label}</Meta>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 bg-near-black">
      <div className="mx-auto max-w-6xl px-3 py-3 sm:px-5 sm:py-5">
        {/* The letter. Centred, on cream, inset so the black shows around it. */}
        <div className="rounded-[1.75rem] bg-cream px-6 py-12 text-center sm:rounded-[2rem] sm:px-10 sm:py-16 lg:py-20">
          <p className="u-display text-[clamp(1.75rem,6vw,3rem)] text-ink">
            welcome, <span className="font-accent italic text-green">friend</span>
          </p>

          <div className="mx-auto mt-7 max-w-2xl space-y-5 text-pretty text-[0.975rem] leading-relaxed text-ink-2 sm:text-base">
            <p>
              AquaTerra exists because a few students in Kolkata decided a Saturday afternoon
              could go to a feeding drive instead of nothing in particular, and then showed up
              again the next one.
            </p>
            <p>
              whether it is your first drive or your fiftieth, this is a letter to the people
              who make AQ what it is: <strong className="font-semibold text-ink">you</strong>.
              not the org account, not the desk, the volunteer who turned up.
            </p>
            <p className="text-ink">thank you for making it real.</p>
          </div>

          {/* The one handwritten thing on the site. */}
          <p className="mt-8 font-hand text-[clamp(1.75rem,5vw,2.5rem)] leading-none text-green">
            love, the AquaTerra team
          </p>
        </div>

        {/* The bar. */}
        <div className="flex flex-col items-center gap-6 px-2 py-8 text-center sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
          <div className="flex shrink-0 items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="u-display text-xl text-cream-soft sm:text-2xl">AQUATERRA</span>
            <Mascot className="h-6 w-6" color="var(--color-team-social)" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SOCIALS.map((s) => (
              <Social key={s.label} {...s} />
            ))}
          </div>

          <div className="lg:text-right">
            <Meta className="block text-cream-soft/70">
              © {new Date().getFullYear()} AQUATERRA · OPEN COMMUNITY, NO RIGHTS RESERVED.
            </Meta>
            <Meta className="mt-1.5 block text-cream-soft/40">
              Kolkata · est. 2021 · 1,300+ members
            </Meta>
          </div>
        </div>
      </div>
    </footer>
  );
}
