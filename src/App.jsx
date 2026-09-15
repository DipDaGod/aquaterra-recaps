import { Routes, Route, Navigate } from "react-router-dom";
import { TopBar, Footer } from "./components/SiteChrome";
import OrbitBanner from "./components/OrbitBanner";
import RecapArchive from "./pages/RecapArchive";
import EditionPage from "./pages/EditionPage";

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <TopBar />
      <Routes>
        <Route path="/" element={<RecapArchive />} />
        <Route path="/:year/:month" element={<EditionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <OrbitBanner />
      <Footer />
    </div>
  );
}
