import EditionCard from "./EditionCard";
import { latestEdition } from "../data/editions";

export default function EditionGrid({ editions }) {
  if (editions.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-10">
        <p className="text-lg text-ink-soft">No editions published for this year yet.</p>
      </div>
    );
  }

  // Reverse so the most recent edition leads the grid, and give it a
  // wider "featured" slot — an asymmetric rhythm rather than a uniform grid.
  const ordered = [...editions].reverse();

  // Column-span pattern (out of 6) that rows cleanly sum to 6, repeating
  // if there are more editions than the pattern covers. Classes are written
  // out in full (not templated) so Tailwind's build-time scanner picks them up.
  const spanClass = {
    6: "lg:col-span-6", 4: "lg:col-span-4", 3: "lg:col-span-3", 2: "lg:col-span-2",
  };
  const pattern = [4, 2, 2, 2, 2, 3, 3, 6];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 sm:px-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-fr">
        {ordered.map((edition, i) => {
          const withFlag = { ...edition, isLatest: edition.key === latestEdition.key };
          const span = pattern[i % pattern.length];
          return (
            <div key={edition.key} className={spanClass[span]}>
              <EditionCard edition={withFlag} featured={i === 0} id={edition.slug} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
