import { AQ_TOTALS, TEAM_ROSTER, editionList, latestEdition, isUpcoming } from "../data/editions";
import { issueSections } from "./issueSections";
import { TEAMS, isPlaceholder } from "./utils";

// The console easter egg.
//
// Two rules it lives by. Every figure it prints is read from the data rather
// than typed in here, so it can't drift from the site or invent one
// (CLAUDE.md §0); and the colours are the real tokens, so it looks like the
// same organisation as the page behind it.
//
// It also leaves `aq` on the window — the actual egg. The banner is just the
// note telling you it's there.
//
// Every colour below is a mid-tone, and the one line that carries the actual
// message is logged with no %c at all, so it takes the console's own text
// colour. A near-black string is invisible in a dark DevTools theme and a pale
// one is invisible in a light theme; there is no safe "text" colour to pick.
const PALETTE = {
  cream: "#f4efe0",
  ink: "#0a0a0a",
  green: "#2f9d63",
  gold: "#f5c518",
  grape: "#8b5cf6",
  quiet: "#8a8a82",
};

const SANS = "font-family:ui-sans-serif,system-ui,sans-serif;";
const MONO = "font-family:ui-monospace,SFMono-Regular,Menlo,monospace;";

const pill = (bg, fg) =>
  `background:${bg};color:${fg};font-weight:700;font-size:13px;padding:5px 10px;${SANS}`;
const line = (fg, size = 12, extra = "") =>
  `color:${fg};font-size:${size}px;${SANS}${extra}`;
const mono = (fg, size = 12, extra = "") =>
  `color:${fg};font-size:${size}px;${MONO}${extra}`;

// "15,000+ bananas distributed" is the house style in miniature, so the egg
// keeps it rather than restating the member count a third time.
const totalFor = (needle) =>
  AQ_TOTALS.find((t) => t.label.includes(needle)) || AQ_TOTALS[0];

function table(rows) {
  if (typeof console.table === "function") console.table(rows);
  else console.log(rows);
}

const aq = Object.freeze({
  // Canonical names only. Never uppercase a team name (CLAUDE.md §2).
  teams() {
    table(
      TEAM_ROSTER.map((entry) => ({
        team: TEAMS[entry.key]?.name ?? entry.key,
        type: TEAMS[entry.key]?.kind ?? "",
        members: entry.members,
      }))
    );
    console.log(`%cfive volunteer teams, three student businesses. ${TEAMS.crftd.name} is one person.`, line(PALETTE.quiet));
  },

  numbers() {
    table(AQ_TOTALS.map(({ value, label }) => ({ figure: value, "what of": label })));
    console.log("%cverified against the live site. they move — go and re-check them.", line(PALETTE.quiet));
  },

  issues() {
    table(
      editionList.map((e) => ({
        no: String(e.editionNumber).padStart(2, "0"),
        issue: `${e.month} ${e.year}`,
        sections: issueSections(e).length,
        status: isUpcoming(e) ? "in progress" : "out",
        read: `/${e.year}/${e.slug}`,
      }))
    );
  },

  bananas() {
    const b = totalFor("bananas");
    console.log(`%c${b.value}`, `color:${PALETTE.gold};font-size:34px;font-weight:700;${SANS}`);
    console.log("%cbananas distributed. nobody planned it that way.", line(PALETTE.quiet, 12));
  },

  help() {
    console.log("%caq.teams()%c    the eight, and how many people are in each", mono(PALETTE.green), line(PALETTE.quiet));
    console.log("%caq.numbers()%c  everything AquaTerra has counted since 2021", mono(PALETTE.green), line(PALETTE.quiet));
    console.log("%caq.issues()%c   every edition, and whether it's out yet", mono(PALETTE.green), line(PALETTE.quiet));
    console.log("%caq.bananas()%c  the only number anyone remembers", mono(PALETTE.green), line(PALETTE.quiet));
  },
});

export function printConsoleBanner() {
  if (typeof console === "undefined" || typeof window === "undefined") return;

  // The nav's own lockup, rebuilt out of two console pills.
  console.log(
    "%c AquaTerra %c RECAPS %c",
    pill(PALETTE.ink, PALETTE.cream),
    pill(PALETTE.green, PALETTE.cream),
    ""
  );

  // Skipped rather than faked when an issue's tagline is still bracketed —
  // there is no house string to fall back on that wouldn't be hardcoded here.
  if (!isPlaceholder(latestEdition.tagline)) {
    console.log(`%c${latestEdition.tagline}`, line(PALETTE.green, 13, "font-style:italic;"));
  }

  const out = editionList.filter((e) => !isUpcoming(e)).length;
  console.log(
    `%c${out} ${out === 1 ? "issue" : "issues"} out · edition ${String(latestEdition.editionNumber).padStart(2, "0")}, ${latestEdition.month} ${latestEdition.year} · ${issueSections(latestEdition).length} sections`,
    mono(PALETTE.quiet, 11)
  );

  console.log(
    "\nyou opened the console of a student magazine. that is a specific kind of person."
  );
  console.log("%cpick a team, show up, and get to work.", line(PALETTE.grape, 12, "font-weight:600;"));

  console.log("%c\ntype %caq.help()%c to poke around.", line(PALETTE.quiet), mono(PALETTE.green, 12, "font-weight:700;"), line(PALETTE.quiet));

  window.aq = aq;
}
