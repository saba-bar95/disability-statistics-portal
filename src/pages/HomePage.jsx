import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainStatistics from "../components/MainStatistics";
import LegislationSection from "../components/LegislationSection";

export default function HomePage() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }
    const sectionId = hash.replace("#", "");
    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(timeoutId);
  }, [hash, pathname]);

  return (
    <div className="mx-auto grid w-full max-w-[1800px] gap-10 py-4">
      <MainStatistics />
      <LegislationSection />
    </div>
  );
}
