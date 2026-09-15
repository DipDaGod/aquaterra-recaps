import Section from "./Section";
import ShowMore from "./ShowMore";
import { Meta } from "./Lockup";
import { TEAMS, cx } from "../lib/utils";

function TeamCard({ entry, tilt }) {
  const team = TEAMS[entry.key];
  if (!team) return null;

  const open = entry.openRoles > 0;

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      style={{ "--tilt": `${tilt}deg` }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream-soft shadow-(--shadow-card) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:rotate-(--tilt) hover:shadow-(--shadow-card-hover)"
    >
      {/* Solid team-colour head with the card-fan motif and a go arrow. */}
      <div className={cx("relative flex h-24 items-center justify-between px-5", team.bg, team.on)}>
        <span className="relative flex h-14 w-20 items-end justify-center" aria-hidden="true">
          <span className="absolute bottom-1 left-1 h-11 w-8 -rotate-12 rounded-lg bg-cream-soft/25" />
          <span className="absolute bottom-1 right-1 h-11 w-8 rotate-12 rounded-lg bg-cream-soft/25" />
          <span className="relative grid h-12 w-9 place-items-center rounded-lg bg-cream-soft/90 text-lg shadow-sm">
            {team.emoji}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="text-xl transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Canonical casing, matching the site's own card titles — and the
            reason no CSS uppercase may ever touch this line. */}
        <h3 className="text-xl font-semibold tracking-tight">{team.name}</h3>

        {/* "volunteer team · N members", exactly as the site writes it. The
            separator is bound to the count with non-breaking spaces so a wrap
            never leaves the middle dot stranded at the end of a line. */}
        <Meta className="mt-1.5 block text-[0.65rem] tracking-[0.1em] text-ink-soft">
          {team.kind}
          {"\u00A0·\u00A0"}
          {entry.members}&nbsp;{entry.members === 1 ? "member" : "members"}
        </Meta>

        <p className="mt-4 line-clamp-4 text-pretty text-sm leading-relaxed text-ink-2">
          {entry.blurb}
        </p>

        <div className="mt-auto pt-5">
          {open ? (
            <span className={cx("font-mono text-xs tracking-[0.08em]", team.ink)}>
              {entry.openRoles} {entry.openRoles === 1 ? "role" : "roles"} open →
            </span>
          ) : (
            <span className="font-mono text-xs tracking-[0.08em] text-ink-soft/50">
              nothing open
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

// Subtle alternating rotation, as on the parent site's grid.
const TILTS = [-0.6, 0.8, -0.4];

export default function TeamsSection({ edition, index, label, accentKey, variant, ground, size }) {
  const teams = edition.teams;
  const roster = teams?.roster || [];
  if (roster.length === 0) return null;

  const volunteer = roster.filter((t) => TEAMS[t.key]?.kind === "volunteer team").length;
  const openRoles = roster.reduce((sum, t) => sum + (t.openRoles || 0), 0);

  return (
    <Section
      id="teams"
      index={index}
      label={label}
      accentKey={accentKey}
      variant={variant}
      ground={ground}
      size={size}
      caps={teams.lockup?.caps}
      accent={teams.lockup?.accent}
      lead={teams.lead}
      aside={`${volunteer} volunteer teams · ${roster.length - volunteer} student businesses · ${openRoles} roles open`}
    >

      <ShowMore
        after={4}
        total={roster.length}
        noun="teams"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {roster.map((entry, i) => (
          <TeamCard key={entry.key} entry={entry} tilt={TILTS[i % TILTS.length]} />
        ))}
      </ShowMore>

      <p className="mt-6">
        <Meta className="text-ink-soft/70">
          Team data mirrored from ngoaquaterra.com · re-check before publishing
        </Meta>
      </p>
    </Section>
  );
}
