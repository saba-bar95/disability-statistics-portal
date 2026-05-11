import { useTranslation } from "react-i18next";
import MainStatistics from "../components/MainStatistics";
import SiteHeader from "../components/SiteHeader";

export default function EducationPage() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4">
      <SiteHeader />
      <MainStatistics />
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {t("sliderEduAbout")}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {t("educationPageText")}
        </p>
      </section>
    </div>
  );
}
