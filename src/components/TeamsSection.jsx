import Section from "./Section";
import ShowMore from "./ShowMore";
import { Meta } from "./Lockup";
import { TEAMS, cx } from "../lib/utils";

// Built against a screenshot of the live site on a phone: two-up from the
// smallest width, the colour block inset with the card's ground showing around
// it, three distinct white tiles in the fan, and the arrow in a white disc on
// the block's corner.
//
// A card points at that team's own story in this issue. With no story it is
// plain text — no link, and no arrow promising one.
function TeamCard({ entry, tilt, storyId }) {
  const team = TEAMS[entry.key];
  if (!team) return null;

  const Tag = storyId ? "a" : "div";

  return (
    <Tag
      {...(storyId ? { href: `#${storyId}` } : {})}
      style={{ "--tilt": `${tilt}deg` }}
      className={cx(
        "group flex h-full flex-col rounded-[1.75rem] border border-line bg-cream-soft p-2.5 shadow-(--shadow-card)",
        storyId &&
          "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:rotate-(--tilt) hover:shadow-(--shadow-card-hover)"
      )}
    >
      <div className={cx("relative aspect-[5/4] shrink-0 overflow-hidden rounded-[1.25rem]", team.bg)}>
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center"
        >
          {/* Opaque on purpose: at any transparency the tiles pick up the block
              colour and read as a smudge rather than as cards. */}
          <span className="relative block h-[66%] w-[74%]">
            <span className="absolute bottom-0 left-0 h-[88%] w-[40%] -rotate-[10deg] rounded-[0.9rem] bg-cream-soft shadow-sm" />
            <span className="absolute bottom-0 right-0 h-[88%] w-[40%] rotate-[10deg] rounded-[0.9rem] bg-cream-soft shadow-sm" />
            <span className="absolute bottom-[4%] left-1/2 grid h-full w-[42%] -translate-x-1/2 place-items-center rounded-[0.9rem] bg-cream-soft text-[clamp(1.2rem,4.6vw,1.6rem)] shadow-md">
              {team.emoji}
            </span>
          </span>
        </span>

        {storyId && (
          <span
            aria-hidden="true"
            className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-cream-soft text-ink shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 sm:h-9 sm:w-9"
          >
            →
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-2 pt-3">
        {/* Rendered from the team's explicit `caps` — never a CSS uppercase,
            which would also hit prose (CLAUDE.md §2). */}
        <h3 className="u-display text-[clamp(1rem,4.4vw,1.35rem)] leading-[1.05]">
          {team.caps}
        </h3>

        {/* A normal space BEFORE the dot and non-breaking ones after it, so
            the line may break ahead of the separator and the dot travels down
            with the count. Binding both sides made "business·2 members" one
            118px unbreakable run that overflowed a 100px column at 320px. */}
        <Meta className="mt-2 block text-[0.6rem] tracking-[0.08em] text-ink-3">
          {team.kind}
          {" ·\u00A0"}
          {entry.members}&nbsp;{entry.members === 1 ? "member" : "members"}
        </Meta>

        <p className="mt-2.5 text-pretty text-[0.8125rem] leading-snug text-ink-2">
          {entry.blurb}
        </p>

      </div>
    </Tag>
  );
}

// Subtle alternating rotation, as on the parent site's grid.
const TILTS = [-0.6, 0.8, -0.4];

export default function TeamsSection({ edition, index, label, accentKey, variant, ground, size }) {
  const teams = edition.teams;
  const roster = teams?.roster || [];
  if (roster.length === 0) return null;

  // Which teams have a story in this issue to point at.
  const storyFor = new Set((edition.featured || []).map((f) => f.team).filter(Boolean));

  const volunteer = roster.filter((t) => TEAMS[t.key]?.kind === "volunteer team").length;

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
      aside={`${volunteer} volunteer teams · ${roster.length - volunteer} student businesses`}
    >

      <ShowMore
        after={4}
        total={roster.length}
        noun="teams"
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        {roster.map((entry, i) => (
          <TeamCard
            key={entry.key}
            entry={entry}
            tilt={TILTS[i % TILTS.length]}
            storyId={storyFor.has(entry.key) ? `feature-${entry.key}` : null}
          />
        ))}
      </ShowMore>

    </Section>
  );
}
