import { AQ_TOTALS, TEAM_ROSTER, editionList, latestEdition, isUpcoming } from "../data/editions";
import { SECTION_MANIFEST, issueSections } from "./issueSections";
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
// Every colour below is a mid-tone, and the lines carrying the actual message
// are logged with no %c at all, so they take the console's own text colour. A
// near-black string is invisible in a dark DevTools theme and a pale one is
// invisible in a light theme; there is no safe "text" colour to pick.
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
const swatch = (colour) => `background:${colour};padding:3px 9px;line-height:20px;`;

// The tokens are CSS variables, which console styles can't resolve. Read them
// off the document when a command actually runs — by then the stylesheet is
// certainly parsed, which it may not be when the banner first prints.
function hex(team) {
  const name = team.raw.replace(/^var\(|\)$/g, "");
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || PALETTE.green;
}

function table(rows) {
  if (typeof console.table === "function") console.table(rows);
  else console.log(rows);
}

const totalFor = (needle) =>
  AQ_TOTALS.find((t) => t.label.includes(needle)) || AQ_TOTALS[0];

const COMMANDS = [
  ["aq.teams()", "the eight, and how many people are in each"],
  ["aq.numbers()", "every figure AquaTerra has published"],
  ["aq.issues()", "every edition, and whether it is out yet"],
  ["aq.sections()", "what an issue is made of"],
  ["aq.colours()", "the eight identity colours, as actual colours"],
  ["aq.todo()", "what the desk still owes the current issue"],
  ["aq.bananas()", "the only number anyone remembers"],
  ["aq.read()", "open the latest issue"],
];

const WIDEST = Math.max(...COMMANDS.map(([name]) => name.length));

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
    // Counted, not written down. The line under this table used to name
    // Crftd as a one-person team; the roster moved and the sentence didn't.
    const volunteer = TEAM_ROSTER.filter((t) => TEAMS[t.key]?.kind === "volunteer team").length;
    console.log(
      `%c${volunteer} volunteer teams, ${TEAM_ROSTER.length - volunteer} student businesses.`,
      line(PALETTE.quiet)
    );
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
    console.log("%caq.read() opens the latest one.", line(PALETTE.quiet));
  },

  sections() {
    table(
      SECTION_MANIFEST.map((s, i) => ({
        no: String(i + 1).padStart(2, "0"),
        section: typeof s.label === "function" ? "The opener" : s.label,
        "what it is": s.blurb,
        "in the latest issue": issueSections(latestEdition).some((x) => x.id === s.id) ? "yes" : "no",
      }))
    );
    console.log("%ca section only appears when the issue has something to put in it.", line(PALETTE.quiet));
  },

  colours() {
    for (const entry of TEAM_ROSTER) {
      const team = TEAMS[entry.key];
      const value = hex(team);
      console.log("%c      ", swatch(value), `${team.name} — ${value}`);
    }
    console.log("%ceach team owns one. nothing else on the site uses them.", line(PALETTE.quiet));
  },

  // The one genuinely useful command: what is still bracketed, and where.
  todo() {
    const owed = [];
    const walk = (node, path) => {
      if (isPlaceholder(node)) owed.push(path);
      else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (node && typeof node === "object") {
        for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
      }
    };
    walk(latestEdition, "");

    const bySection = new Map();
    for (const path of owed) {
      const head = path.split(/[.[]/)[0];
      bySection.set(head, (bySection.get(head) || 0) + 1);
    }

    console.log(
      `%cedition ${String(latestEdition.editionNumber).padStart(2, "0")} — ${owed.length} field${owed.length === 1 ? "" : "s"} still waiting on the desk`,
      line(owed.length ? PALETTE.gold : PALETTE.green, 13, "font-weight:700;")
    );
    if (owed.length === 0) {
      console.log("%cnothing bracketed. someone did the work.", line(PALETTE.quiet));
      return;
    }
    table([...bySection].map(([section, count]) => ({ section, waiting: count })));
    console.log("%cthey are the [bracketed] ones in src/data/editions.js.", line(PALETTE.quiet));
  },

  bananas() {
    const b = totalFor("bananas");
    console.log(`%c${b.value}`, `color:${PALETTE.gold};font-size:34px;font-weight:700;${SANS}`);
    console.log("%cbananas distributed. nobody planned it that way.", line(PALETTE.quiet, 12));
  },

  read() {
    const path = `/${latestEdition.year}/${latestEdition.slug}`;
    console.log(`%copening ${latestEdition.month} ${latestEdition.year}…`, line(PALETTE.green, 12));
    window.location.assign(path);
  },

  help() {
    console.log("%cwhat you can type", line(PALETTE.green, 13, "font-weight:700;"));
    for (const [name, what] of COMMANDS) {
      console.log(
        `%c${name.padEnd(WIDEST + 2)}%c${what}`,
        mono(PALETTE.green, 12, "font-weight:700;"),
        line(PALETTE.quiet)
      );
    }
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

  console.log(
    `%c\n${COMMANDS.length} things to type. start with %caq.help()%c`,
    line(PALETTE.quiet),
    mono(PALETTE.green, 12, "font-weight:700;"),
    line(PALETTE.quiet)
  );

  window.aq = aq;
}
