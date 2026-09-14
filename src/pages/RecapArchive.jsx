import { useEffect, useState } from "react";
import RecapHero from "../components/RecapHero";
import YearSelector from "../components/YearSelector";
import EditionGrid from "../components/EditionGrid";
import BeyondNumbers from "../components/BeyondNumbers";
import { editionsForYear, latestEdition } from "../data/editions";

export default function RecapArchive() {
  const [year, setYear] = useState(latestEdition.year);
  const editions = editionsForYear(year);

  useEffect(() => {
    document.title = "AquaTerra Recaps | Monthly Recaps Archive";
  }, []);

  return (
    <main>
      <RecapHero />
      <div id="archive" className="scroll-mt-4">
        <YearSelector year={year} onChange={setYear} />
        <EditionGrid editions={editions} year={year} />
      </div>
      <BeyondNumbers />
    </main>
  );
}
