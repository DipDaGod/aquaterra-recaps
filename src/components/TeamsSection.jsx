import { ArrowUpRight } from "lucide-react";
import Section, { SectionHeading } from "./Section";
import { Meta, MetaRow } from "./Lockup";
import { TEAMS, cx } from "../lib/utils";

// The 8 teams, each in its own identity colour. Names, casing, kinds and
// member counts are verified facts (aq.md §2) — do not normalise or retype
// them here; they come from TEAM_ROSTER + the TEAMS registry.
function TeamCard({ entry }) {
  const team = TEAMS[entry.key];
  if (!team) return null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream-soft shadow-(--shadow-card)">
      {/* Solid team-colour block on top, per the parent site's team cards. */}
      <div className={cx("p-5 pb-4", team.bg, team.on)}>
        <h3 className="font-display text-2xl font-bold leading-none tracking-[-0.02em]">
          {team.caps}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <MetaRow
          className="text-ink-soft"
          items={[team.kind, `${entry.members} members`]}
        />
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">{entry.blurb}</p>
        <a
          href="https://www.ngoaquaterra.com/teams"
          target="_blank"
          rel="noreferrer"
          className={cx(
            "mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-xs tracking-[0.08em]",
            team.text
          )}
        >
          {team.name}
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

export default function TeamsSection({ edition }) {
  const teams = edition.teams;
  if (!teams?.roster?.length) return null;

  const volunteer = teams.roster.filter((t) => TEAMS[t.key]?.kind === "volunteer team").length;
  const businesses = teams.roster.length - volunteer;

  return (
    <Section id="teams">
      <SectionHeading
        eyebrow="The teams"
        caps={teams.lockup?.caps}
        accent={teams.lockup?.accent}
        lead={teams.lead}
        aside={`${volunteer} volunteer teams · ${businesses} student businesses`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teams.roster.map((entry) => (
          <TeamCard key={entry.key} entry={entry} />
        ))}
      </div>

      <p className="mt-6">
        <Meta className="text-ink-soft/70">
          Member counts verified against ngoaquaterra.com · re-check before publishing
        </Meta>
      </p>
    </Section>
  );
}
