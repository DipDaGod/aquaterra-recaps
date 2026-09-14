import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import EditionHero from "../components/EditionHero";
import MonthNavigation from "../components/MonthNavigation";
import StatsGrid from "../components/StatsGrid";
import FeaturedProjects from "../components/FeaturedProjects";
import InsideAquaterra from "../components/InsideAquaterra";
import MomentsGallery from "../components/MomentsGallery";
import ImpactSection from "../components/ImpactSection";
import PeopleSection from "../components/PeopleSection";
import NextEdition from "../components/NextEdition";
import { getEdition, neighbours } from "../data/editions";

export default function EditionPage() {
  const { year, month } = useParams();
  const edition = getEdition(year, month);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [year, month]);

  // Gives each edition its own browser-tab title and history entry, so back
  // through several months reads as months rather than eight identical rows.
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
      <FeaturedProjects edition={edition} />
      <InsideAquaterra edition={edition} />
      <MomentsGallery edition={edition} />
      <ImpactSection edition={edition} />
      <PeopleSection edition={edition} />
      <NextEdition prev={prev} next={next} />
    </main>
  );
}
