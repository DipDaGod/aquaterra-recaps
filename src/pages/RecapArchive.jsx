import { useEffect, useState } from "react";
import RecapHero from "../components/RecapHero";
import HeadlineNumbers from "../components/HeadlineNumbers";
import YearSelector from "../components/YearSelector";
import EditionGrid from "../components/EditionGrid";
import IssueAnatomy from "../components/IssueAnatomy";
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
      <HeadlineNumbers />
      <div id="archive" className="scroll-mt-4">
        <YearSelector year={year} onChange={setYear} />
        <EditionGrid editions={editions} year={year} />
      </div>
      <IssueAnatomy />
      <BeyondNumbers />
    </main>
  );
}
