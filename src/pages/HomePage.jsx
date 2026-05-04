import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
          {t("heroTitle")}
        </h2>
        <p className="text-slate-700 dark:text-slate-300">{t("heroText")}</p>
      </section>

      <section
        id="main-statistics"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
          {t("mainStatistics")}
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          {t("mainStatisticsText")}
        </p>
      </section>

      <section
        id="legislation"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
          {t("legislation")}
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          {t("legislationText")}
        </p>
      </section>

      <section
        id="links"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
          {t("links")}
        </h2>
        <p className="text-slate-700 dark:text-slate-300">{t("linksText")}</p>
      </section>
    </div>
  );
}
