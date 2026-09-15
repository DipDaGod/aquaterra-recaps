import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { Globe2, Users2, PenSquare, Hash, X, MoreHorizontal } from "lucide-react";
import { Meta } from "./Lockup";
import { cx } from "../lib/utils";

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

const SITE = "https://www.ngoaquaterra.com";

// The parent site's own menu, mirrored from a screenshot of it on a phone:
// a floating pill bar, then a panel with EXPLORE over a two-column grid of
// display-caps links, each trailing an arrow, with the current page as a
// filled pill carrying a dot instead.
//
// RECAPS is this site, so it takes the active slot — the magazine reads as one
// more destination in the same nav rather than a detached satellite.
//
// Paths: /projects, /teams, /blog and /members were already in use here.
// /openings and /about are inferred from the menu's own labels and could not
// be checked (no outbound network from this environment) — worth confirming.
const NAV = [
  { label: "HOME", href: SITE },
  { label: "PROJECTS", href: `${SITE}/projects` },
  { label: "RECAPS", to: "/" },
  { label: "TEAMS", href: `${SITE}/teams` },
  { label: "GROUNDWORK DIARIES", href: `${SITE}/blog` },
  { label: "MEMBERS", href: `${SITE}/members` },
  { label: "OPENINGS", href: `${SITE}/openings` },
  { label: "ABOUT", href: `${SITE}/about` },
];

function NavItem({ item, active, onNavigate }) {
  const body = (
    <>
      {/* Long labels wrap rather than shrink the whole scale — the grid row
          takes the height and both cells stay aligned. */}
      <span className="u-display text-[0.8rem] leading-[1.15] sm:text-[0.95rem]">{item.label}</span>
      {active ? (
        <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-cream-soft" />
      ) : (
        <span aria-hidden="true" className="shrink-0 text-lg leading-none text-ink-3">→</span>
      )}
    </>
  );
  const cls = cx(
    "flex min-h-12 items-center justify-between gap-2 rounded-full px-3.5 py-2.5 transition-colors sm:px-4",
    active ? "bg-ink text-cream-soft" : "text-ink hover:bg-paper"
  );

  if (item.to) {
    return (
      <Link to={item.to} onClick={onNavigate} aria-current={active ? "page" : undefined} className={cls}>
        {body}
      </Link>
    );
  }
  return (
    <a href={item.href} target="_blank" rel="noreferrer" onClick={onNavigate} className={cls}>
      {body}
    </a>
  );
}

export function TopBar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Escape closes, as a menu should.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-3xl">
        {/* Floating pill bar */}
        <div className="flex items-center justify-between gap-3 rounded-full border border-line/70 bg-cream-soft/95 py-2 pl-3 pr-2 shadow-(--shadow-card) backdrop-blur-md sm:pl-4">
          <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5" aria-label="AquaTerra Recaps — home">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="flex min-w-0 items-center gap-2">
              <span className="hidden truncate text-sm font-semibold tracking-tight min-[380px]:inline">AquaTerra</span>
              <span className="shrink-0 rounded-full bg-green px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream-soft">
                Recaps
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5">
            {/* The site's own APPLY pill, with its solid offset shadow. */}
            <a
              href={`${SITE}/teams`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-green px-3.5 py-2.5 font-display text-xs font-bold uppercase tracking-tight text-cream-soft shadow-[0_3px_0_0_var(--color-green-deep)] transition-transform active:translate-y-[2px] active:shadow-[0_1px_0_0_var(--color-green-deep)] sm:px-4 sm:text-sm"
            >
              Apply <span aria-hidden="true">→</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-paper"
            >
              {open ? <X className="h-5 w-5" strokeWidth={2} /> : <MoreHorizontal className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Menu panel */}
        {open && (
          <nav
            id={panelId}
            aria-label="Site menu"
            className="reveal mt-2 rounded-[1.75rem] border border-line/70 bg-cream-soft p-3 shadow-(--shadow-card-hover) sm:p-4"
          >
            <Meta className="block px-2 pb-2 pt-1 text-ink-3">Explore</Meta>

            <div className="grid grid-cols-2 gap-1">
              {NAV.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  active={Boolean(item.to)}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>

            <a
              href={`${SITE}/teams`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-between gap-3 rounded-full bg-green px-5 py-3.5 text-cream-soft shadow-[0_3px_0_0_var(--color-green-deep)] transition-transform active:translate-y-[2px] active:shadow-[0_1px_0_0_var(--color-green-deep)]"
            >
              <span className="u-display text-base sm:text-lg">JOIN THE WORK</span>
              <span aria-hidden="true" className="text-lg leading-none">→</span>
            </a>
          </nav>
        )}
      </div>
    </div>
  );
}

const quickLinks = [
  { label: "Projects", href: "https://www.ngoaquaterra.com/projects", icon: Globe2, tone: "bg-tint-green text-green-deep" },
  { label: "Teams", href: "https://www.ngoaquaterra.com/teams", icon: Users2, tone: "bg-tint-blue text-ink" },
  { label: "Groundwork Diaries", href: "https://www.ngoaquaterra.com/blog", icon: PenSquare, tone: "bg-tint-lavender text-ink" },
  { label: "Members", href: "https://www.ngoaquaterra.com/members", icon: Hash, tone: "bg-tint-yellow text-ink" },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line/80 bg-cream-soft/50">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-md">
            {/* Both lines below are the parent site's own copy (aq.md §2). */}
            <p className="font-accent text-3xl italic text-green">
              started in Kolkata. got out of hand.
            </p>
            <p className="mt-3 text-pretty text-sm text-ink-soft">
              Free forever. No donations, no fees. Pick a team, show up, and get to work.
            </p>
            {/* aq.md §4: the script face is used exactly once, for the sign-off. */}
            <p className="mt-5 font-hand text-2xl text-green">love, the AquaTerra team</p>
          </div>

          <nav aria-label="AquaTerra elsewhere" className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-4">
            {quickLinks.map(({ label, href, icon: Icon, tone }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`flex flex-col gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:w-28 ${tone}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Meta className="text-ink-soft">
            © {new Date().getFullYear()} AQUATERRA · OPEN COMMUNITY, NO RIGHTS RESERVED.
          </Meta>
          <Meta className="text-ink-soft/70">Ages 14–19 · Kolkata</Meta>
        </div>
      </div>
    </footer>
  );
}
