import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Globe2, Users2, PenSquare, Hash } from "lucide-react";

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

export function TopBar() {
  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 z-30 border-b border-line/80 bg-cream-soft/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-10">
        <Link
          to="/"
          aria-label="AquaTerra Recaps — home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="flex items-center gap-2.5"
        >
          <Logo />
          <span className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            AquaTerra
            <span className="rounded-full bg-green px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-cream-soft">
              Recaps
            </span>
          </span>
        </Link>

        <a
          href="https://www.ngoaquaterra.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          <span className="hidden sm:inline">ngoaquaterra.com</span>
          <span className="sm:hidden">Main site</span>
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

const quickLinks = [
  { label: "Projects", href: "https://www.ngoaquaterra.com/projects", icon: Globe2, tone: "bg-pastel-green text-green-deep" },
  { label: "Teams", href: "https://www.ngoaquaterra.com/teams", icon: Users2, tone: "bg-pastel-blue text-ink" },
  { label: "Blog", href: "https://www.ngoaquaterra.com/blog", icon: PenSquare, tone: "bg-pastel-lavender text-ink" },
  { label: "Members", href: "https://www.ngoaquaterra.com/members", icon: Hash, tone: "bg-pastel-yellow text-ink" },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line/80 bg-cream-soft/50">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-md">
            <p className="font-accent text-3xl italic text-green-deep">Same people. Bigger stories.</p>
            <p className="mt-3 text-pretty text-sm text-ink-soft">
              AquaTerra Recaps is a monthly record of the projects, teams and people
              behind AquaTerra — a student-led community and NGO in Kolkata.
            </p>
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

        <div className="mt-10 flex flex-col gap-2 border-t border-line/80 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AquaTerra · Kolkata</p>
          <p>
            Sample content — real recaps and photography are on the way.
          </p>
        </div>
      </div>
    </footer>
  );
}
