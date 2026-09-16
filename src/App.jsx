import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { TopBar, Footer } from "./components/SiteChrome";
import OrbitBanner from "./components/OrbitBanner";
import RecapArchive from "./pages/RecapArchive";
import EditionPage from "./pages/EditionPage";

export default function App() {
  // Keyed on the path so a navigation fades in rather than cutting. The hash is
  // deliberately not in the key: jumping to #teams from the issue index is a
  // scroll within the page, not a new page, and remounting on it would throw
  // away the section you just asked to see.
  //
  // Opacity only — a transform here would make this div the containing block
  // for every position:fixed overlay inside it (§9).
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-cream">
      <TopBar />
      <div key={pathname} className="fade-in">
        <Routes>
          <Route path="/" element={<RecapArchive />} />
          <Route path="/:year/:month" element={<EditionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <OrbitBanner />
      <Footer />
    </div>
  );
}
