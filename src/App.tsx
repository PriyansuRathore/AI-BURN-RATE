import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { PublicReportPage } from "@/pages/PublicReportPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/results/:shareId" element={<PublicReportPage />} />
    </Routes>
  );
}
