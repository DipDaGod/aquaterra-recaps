import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { TEAMS, cx } from "../lib/utils";

// How a student actually joins. The parent site's own line — "Pick a team,
// show up, and get to work" — is the whole pitch, so the section stays short.
export default function OpeningsSection({ edition, index, label }) {
  const openings = edition.openings;
  const roles = openings?.roles || [];
  if (roles.length === 0) return null;

  return (
    <Section
      id="openings"
      index={index}
      label={label}
      caps={openings.lockup?.caps}
      accent={openings.lockup?.accent}
      lead={openings.lead}
    >

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role, i) => {
          const team = TEAMS[role.team];
          return (
            <li key={`${role.team}-${i}`}>
              <a
                href={openings.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-line bg-cream-soft p-5 shadow-(--shadow-card) transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-(--shadow-card-hover)"
              >
                <span
                  className={cx(
                    "inline-flex w-fit rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.08em]",
                    team?.bg,
                    team?.on
                  )}
                >
                  {team?.name || role.team}
                </span>
                <h3 className="mt-4 text-balance text-xl font-semibold tracking-tight">{role.role}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{role.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-xs uppercase tracking-[0.12em] text-green">
                  Apply
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
