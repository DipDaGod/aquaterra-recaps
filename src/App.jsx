import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { TopBar, Footer } from "./components/SiteChrome";
import OrbitBanner from "./components/OrbitBanner";
import GhostEgg from "./components/GhostEgg";
import RecapArchive from "./pages/RecapArchive";
import EditionPage from "./pages/EditionPage";

export default function App() {
  // Keyed on the path so a navigation fades in rather than cutting. Two things
  // are deliberately NOT in that key, because neither is a new page:
  //
  // - the hash. Jumping to #teams from the issue index is a scroll within the
  //   page, and remounting on it would throw away the section you just asked
  //   to see.
  // - the /stories suffix. That route only opens the player over the issue;
  //   keying on it would remount the whole page underneath the overlay and
  //   lose your scroll position on the way in and out.
  //
  // Opacity only — a transform here would make this div the containing block
  // for every position:fixed overlay inside it (§9).
  const { pathname } = useLocation();
  const page = pathname.replace(/\/stories(\/[^/]*)?\/?$/, "");

  return (
    <div className="min-h-screen bg-cream">
      <TopBar />
      <div key={page} className="fade-in">
        <Routes>
          <Route path="/" element={<RecapArchive />} />
          <Route path="/:year/:month" element={<EditionPage />} />
          {/* The stories run, as a link you can send someone. Same page
              underneath — the route only decides whether the player is open,
              and which chapter it starts on. An optional segment rather than
              two routes, so there is one spelling of this path in the app. */}
          <Route path="/:year/:month/stories/:chapter?" element={<EditionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <OrbitBanner />
      <Footer />
      {/* Outside the routed div, like the banner. It has to survive a
          navigation: the timer counts time on the SITE, and a buddy that
          vanished when you opened another issue would not be much of a buddy. */}
      <GhostEgg />
    </div>
  );
}
