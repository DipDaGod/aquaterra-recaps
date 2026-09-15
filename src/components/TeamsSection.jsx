import Section from "./Section";
import ShowMore from "./ShowMore";
import { Meta } from "./Lockup";
import { TEAMS, cx } from "../lib/utils";

// Rebuilt against a screenshot of the live site on a phone. The things that
// were wrong before: the cards stacked one-up (the site runs two-up from the
// smallest width), the colour block ran edge-to-edge (it is inset, with the
// card's own ground showing around it), the fan motif was a faint hint rather
// than three distinct white tiles, and the arrow sat inline instead of in a
// white disc on the block's corner.
function TeamCard({ entry, tilt }) {
  const team = TEAMS[entry.key];
  if (!team) return null;


  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      style={{ "--tilt": `${tilt}deg` }}
      className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-cream-soft p-2.5 shadow-(--shadow-card) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:rotate-(--tilt) hover:shadow-(--shadow-card-hover)"
    >
      {/* Inset colour block carrying the card-fan motif. */}
      <div className={cx("relative aspect-[5/4] shrink-0 overflow-hidden rounded-[1.25rem]", team.bg)}>
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center"
        >
          {/* Three solid white tiles, fanned. They are opaque on purpose: at
              any transparency they pick up the block colour and read as a
              smudge rather than as cards. */}
          <span className="relative block h-[66%] w-[74%]">
            <span className="absolute bottom-0 left-0 h-[88%] w-[40%] -rotate-[10deg] rounded-[0.9rem] bg-cream-soft shadow-sm" />
            <span className="absolute bottom-0 right-0 h-[88%] w-[40%] rotate-[10deg] rounded-[0.9rem] bg-cream-soft shadow-sm" />
            <span className="absolute bottom-[4%] left-1/2 grid h-full w-[42%] -translate-x-1/2 place-items-center rounded-[0.9rem] bg-cream-soft text-[clamp(1.2rem,4.6vw,1.6rem)] shadow-md">
              {team.emoji}
            </span>
          </span>
        </span>

        <span
          aria-hidden="true"
          className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-cream-soft text-ink shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 sm:h-9 sm:w-9"
        >
          →
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-2 pt-3">
        {/* Display-caps title, as the live site sets it. Rendered from the
            team's explicit `caps` value — never a CSS uppercase, which would
            also hit prose. */}
        <h3 className="u-display text-[clamp(1rem,4.4vw,1.35rem)] leading-[1.05]">
          {team.caps}
        </h3>

        {/* "volunteer team · N members", exactly as the site writes it.
            A normal space BEFORE the dot and non-breaking ones after it: the
            line may break ahead of the separator, so the dot travels down with
            the count and is never stranded at the end of a line. Binding both
            sides instead — the previous version — made "business·2 members" a
            single 118px unbreakable run that overflowed a 100px card column at
            320px, which is exactly how this reached the page. */}
        <Meta className="mt-2 block text-[0.6rem] tracking-[0.08em] text-ink-3">
          {team.kind}
          {" ·\u00A0"}
          {entry.members}&nbsp;{entry.members === 1 ? "member" : "members"}
        </Meta>

        <p className="mt-2.5 line-clamp-3 text-pretty text-[0.8125rem] leading-snug text-ink-2 sm:line-clamp-4">
          {entry.blurb}
        </p>

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
