import Section from "./Section";
import Lockup, { Meta } from "./Lockup";
import { SECTION_MANIFEST } from "../lib/issueSections";
import { sectionAccent } from "../lib/utils";

// What an issue is made of. Read straight from the section manifest — the same
// list that numbers the sections and fills the nav index — so this can't drift
// from what the issues actually carry. Add a section there and it shows up here.
export default function IssueAnatomy() {
  return (
    <Section id="anatomy" className="max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="max-w-2xl">
          <Meta className="block text-ink-3">The format</Meta>
          <Lockup caps="WHAT'S IN AN" accent="issue" spotlight className="mt-3 text-(length:--text-display-m)" />
        </div>
        <p className="max-w-sm text-pretty text-ink-2">
          not every issue carries every one — a month with no student-business news
          simply doesn&apos;t have that page.
        </p>
      </div>

      {/* Three across: the manifest currently runs to nine sections, which fills
          three rows exactly. Four across orphans the last one. */}
      <ol className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {SECTION_MANIFEST.map((section, i) => {
          const a = sectionAccent(section.accent);
          const label = typeof section.label === "function" ? "The opener" : section.label;
          return (
            <li key={section.id} className="border-t border-line pt-4">
              <Meta className={a.text}>{String(i + 1).padStart(2, "0")}</Meta>
              <h3 className="mt-2 text-lg font-semibold leading-tight tracking-tight">{label}</h3>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-2">{section.blurb}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
