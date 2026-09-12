import { Routes, Route, Navigate } from "react-router-dom";
import { TopBar, Footer } from "./components/SiteChrome";
import RecapArchive from "./pages/RecapArchive";
import EditionPage from "./pages/EditionPage";

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/recaps" replace />} />
        <Route path="/recaps" element={<RecapArchive />} />
        <Route path="/recaps/:year/:month" element={<EditionPage />} />
        <Route path="*" element={<Navigate to="/recaps" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
