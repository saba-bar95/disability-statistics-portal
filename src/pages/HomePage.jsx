import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainStatistics from "../components/MainStatistics";
import LegislationSection from "../components/LegislationSection";
import { sectionShellClassName } from "../constants/sectionShell";

export default function HomePage() {
  const { hash, pathname } = useLocation();
  const { t } = useTranslation();

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
      <section id="links" className={sectionShellClassName}>
        <h2 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {t("links")}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {t("linksText")}
        </p>
      </section>
    </div>
  );
}
