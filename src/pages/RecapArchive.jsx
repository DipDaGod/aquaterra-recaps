import { useState } from "react";
import RecapHero from "../components/RecapHero";
import YearSelector from "../components/YearSelector";
import EditionGrid from "../components/EditionGrid";
import BeyondNumbers from "../components/BeyondNumbers";
import { editionsForYear } from "../data/editions";

export default function RecapArchive() {
  const [year, setYear] = useState(2026);
  const editions = editionsForYear(year);

  return (
    <main>
      <RecapHero />
      <YearSelector year={year} onChange={setYear} />
      <EditionGrid editions={editions} />
      <BeyondNumbers />
    </main>
  );
}
