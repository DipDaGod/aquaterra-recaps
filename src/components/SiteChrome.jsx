import { useState } from "react";
import { Link } from "react-router-dom";
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
      alt="AquaTerra"
      className={`rounded-full object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

export function TopBar() {
  return (
    <div className="border-b border-line/80 bg-cream-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-sm font-medium tracking-tight">
            AquaTerra
            <span className="ml-2 rounded-full bg-green px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cream-soft">
              Recaps
            </span>
          </span>
        </Link>
        <a
          href="https://www.ngoaquaterra.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          ngoaquaterra.com
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
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
    <footer className="mt-24 border-t border-line/80">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="font-accent text-3xl italic text-green-deep">Same people. Bigger stories.</p>
            <p className="mt-3 text-sm text-ink-soft">
              AquaTerra Recaps is a monthly record of the projects, teams and people
              behind AquaTerra — a student-led community and NGO in Kolkata.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-4">
            {quickLinks.map(({ label, href, icon: Icon, tone }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`flex flex-col gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${tone}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line/80 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AquaTerra · Kolkata</p>
          <p className="italic">
            Sample content on this site is placeholder — replace it in{" "}
            <code className="rounded bg-paper px-1.5 py-0.5">src/data/editions.js</code> before publishing.
          </p>
        </div>
      </div>
    </footer>
  );
}
