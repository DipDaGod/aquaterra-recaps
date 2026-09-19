import { useState } from "react";
import Section from "./Section";
import ShowMore from "./ShowMore";
import TeamCardViewer from "./TeamCardViewer";
import Mascot from "./Mascot";
import { Meta } from "./Lockup";
import { TEAMS, cx } from "../lib/utils";

// Built against a screenshot of the live site on a phone: two-up from the
// smallest width, the colour block inset with the card's ground showing around
// it, three distinct white tiles in the fan.
//
// A card used to be a link with an arrow, jumping to that team's story in the
// issue. The desk asked for both to go. It opens the team's collectible card
// instead — eight of them, and reading all eight completes the set.
function TeamCard({ entry, tilt, read, onOpen }) {
  const team = TEAMS[entry.key];
  if (!team) return null;

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ "--tilt": `${tilt}deg` }}
      aria-label={`Open the ${team.name} card${read ? ", already read" : ""}`}
      className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-cream-soft p-2.5 text-left shadow-(--shadow-card) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:rotate-(--tilt) hover:shadow-(--shadow-card-hover)"
    >
      <div className={cx("relative aspect-[5/4] shrink-0 overflow-hidden rounded-[1.25rem]", team.bg)}>
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
          {/* Opaque on purpose: at any transparency the tiles pick up the block
              colour and read as a smudge rather than as cards. */}
          <span className="relative block h-[66%] w-[74%] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]">
            <span className="absolute bottom-0 left-0 h-[88%] w-[40%] -rotate-[10deg] rounded-[0.9rem] bg-cream-soft shadow-sm transition-transform duration-500 group-hover:-rotate-[16deg]" />
            <span className="absolute bottom-0 right-0 h-[88%] w-[40%] rotate-[10deg] rounded-[0.9rem] bg-cream-soft shadow-sm transition-transform duration-500 group-hover:rotate-[16deg]" />
            <span className="absolute bottom-[4%] left-1/2 grid h-full w-[42%] -translate-x-1/2 place-items-center rounded-[0.9rem] bg-cream-soft text-[clamp(1.2rem,4.6vw,1.6rem)] shadow-md">
              {team.emoji}
            </span>
          </span>
        </span>

        {/* The only mark on the block: a tick once this one has been read. No
            arrow — it doesn't go anywhere. */}
        {read && (
          <span
            aria-hidden="true"
            /* `.rise-in`, the site's own 300ms entrance, rather than a fourth
               primitive invented for one badge (§4). You closed a card and this
               is the answer — it should land, not be already there. */
            className="rise-in absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-cream-soft/90 text-[0.7rem] font-bold text-ink shadow-sm"
          >
            ✓
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
          {" · "}
          {entry.members}&nbsp;{entry.members === 1 ? "member" : "members"}
        </Meta>

        <p className="mt-2.5 text-pretty text-[0.8125rem] leading-snug text-ink-2">
          {entry.blurb}
        </p>
      </div>
    </button>
  );
}

// Subtle alternating rotation, as on the parent site's grid.
const TILTS = [-0.6, 0.8, -0.4];

export default function TeamsSection({ edition, index, label, accentKey, variant, ground, size }) {
  const teams = edition.teams;
  const roster = teams?.roster || [];
  const [open, setOpen] = useState(null);
  // Deliberately not persisted. It lives for this visit and resets on reload,
  // so the set is something you do rather than a checklist the site remembers
  // having made you do.
  const [read, setRead] = useState(() => new Set());
  const [celebrating, setCelebrating] = useState(false);

  if (roster.length === 0) return null;

  const volunteer = roster.filter((t) => TEAMS[t.key]?.kind === "volunteer team").length;
  const done = read.size >= roster.length;

  function openAt(i) {
    setOpen(i);
    setRead((prev) => {
      if (prev.has(roster[i].key)) return prev;
      const next = new Set(prev).add(roster[i].key);
      // Fires on the card that completes the set, once — not every time the
      // set happens to already be complete.
      if (next.size === roster.length) setCelebrating(true);
      return next;
    });
  }

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
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Meta className={done ? "text-green" : "text-ink-3"}>
          {done ? "set complete" : `cards read · ${read.size} of ${roster.length}`}
        </Meta>
        <span aria-hidden="true" className="flex gap-1">
          {roster.map((t) => (
            <span
              key={t.key}
              className="h-1.5 w-5 rounded-full transition-colors"
              style={{ background: read.has(t.key) ? TEAMS[t.key].raw : "var(--color-line)" }}
            />
          ))}
        </span>
        {!done && (
          <span className="text-sm text-ink-3">tap any team to open its card. there are eight.</span>
        )}
      </div>

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
            read={read.has(entry.key)}
            onOpen={() => openAt(i)}
          />
        ))}
      </ShowMore>

      {done && (
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-[1.75rem] border border-green/30 bg-tint-green/60 px-6 py-5">
          <Mascot className="h-10 w-10 shrink-0" color="var(--color-green)" />
          <div className="min-w-0">
            <p className="u-display text-xl leading-none">
              EIGHT FOR <em className="font-accent lowercase italic text-green-deep">eight</em>
              <span aria-hidden="true">.</span>
            </p>
            <p className="mt-2 text-pretty text-sm text-ink-2">
              you read every card. now pick a team, show up, and get to work.
            </p>
          </div>
        </div>
      )}

      {open !== null && (
        <TeamCardViewer
          roster={roster}
          index={open}
          collected={read}
          celebrating={celebrating}
          onNavigate={openAt}
          onCelebrated={() => setCelebrating(false)}
          onClose={() => setOpen(null)}
        />
      )}
    </Section>
  );
}
