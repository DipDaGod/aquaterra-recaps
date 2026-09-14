import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import EditionHero from "../components/EditionHero";
import MonthNavigation from "../components/MonthNavigation";
import IssueContents from "../components/IssueContents";
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
import { issueSections, sectionMeta } from "../lib/issueSections";
import { issueAccentVars } from "../lib/utils";

// Sections render only when the edition carries their data, and their numbers
// come from one shared manifest — so the contents list and the numbered
// openers can never disagree. No per-edition components.
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
  const sections = issueSections(edition);
  const at = (id) => sectionMeta(sections, id);

  return (
    <main data-issue={edition.key} style={issueAccentVars(edition.accent)}>
      <EditionHero edition={edition} />
      <MonthNavigation edition={edition} />
      <IssueContents sections={sections} />

      <StatsGrid edition={edition} {...at("numbers")} />
      <TeamsSection edition={edition} {...at("teams")} />
      <FeaturedProjects edition={edition} {...at("featured")} />
      <PhotographySection edition={edition} {...at("photography")} />
      <MiniGames edition={edition} {...at("games")} />
      <InsideAquaterra edition={edition} {...at("diaries")} />
      <ImpactSection edition={edition} {...at("impact")} />
      <OpeningsSection edition={edition} {...at("openings")} />
      <PeopleSection edition={edition} {...at("people")} />

      <NextEdition prev={prev} next={next} />
    </main>
  );
}
