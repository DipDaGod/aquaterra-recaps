import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import EditionHero from "../components/EditionHero";
import MonthNavigation from "../components/MonthNavigation";
import StatsGrid from "../components/StatsGrid";
import TeamsSection from "../components/TeamsSection";
import FeaturedProjects from "../components/FeaturedProjects";
import PhotographySection from "../components/PhotographySection";
import MiniGames from "../components/MiniGames";
import InsideAquaterra from "../components/InsideAquaterra";
import ImpactSection from "../components/ImpactSection";
import OpeningsSection from "../components/OpeningsSection";
import PeopleSection from "../components/PeopleSection";
import NextEdition from "../components/NextEdition";
import { getEdition, neighbours } from "../data/editions";

// Every section renders only when the edition carries data for it, so a
// month with no student-business news or no openings simply doesn't show
// those strands — no per-edition components, no empty shells.
export default function EditionPage() {
  const { year, month } = useParams();
  const edition = getEdition(year, month);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [year, month]);

  useEffect(() => {
    if (!edition) return;
    document.title = `${edition.month} ${edition.year} | AquaTerra Recaps`;
    return () => {
      document.title = "AquaTerra Recaps | Monthly Recaps Archive";
    };
  }, [edition]);

  if (!edition) return <Navigate to="/" replace />;

  const { prev, next } = neighbours(edition);

  return (
    <main>
      <EditionHero edition={edition} />
      <MonthNavigation edition={edition} />
      <StatsGrid edition={edition} />
      <TeamsSection edition={edition} />
      <FeaturedProjects edition={edition} />
      <PhotographySection edition={edition} />
      <MiniGames edition={edition} />
      <InsideAquaterra edition={edition} />
      <ImpactSection edition={edition} />
      <OpeningsSection edition={edition} />
      <PeopleSection edition={edition} />
      <NextEdition prev={prev} next={next} />
    </main>
  );
}
