import clsx from "clsx";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SECTION_CARDS } from "../constants/sectionCards";

export default function SectionCardsNav() {
  const { language = "ka" } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t("mainStatistics")}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {SECTION_CARDS.map((card) => {
        const targetPath = `/${language}${card.to}`;
        const isActive = pathname === targetPath;

        return (
          <Link
            key={card.id}
            to={targetPath}
            className={clsx(
              "rounded-xl border p-4 transition-colors",
              "bg-white dark:bg-slate-900",
              isActive
                ? "border-blue-500 shadow-md ring-2 ring-blue-300/60 dark:border-blue-400 dark:ring-blue-500/40"
                : "border-slate-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600",
            )}
          >
            <h3
              className={clsx(
                "mb-1 text-sm font-bold uppercase",
                isActive
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-slate-900 dark:text-slate-100",
              )}
            >
              {t(card.titleKey)}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t(card.descriptionKey)}
            </p>
          </Link>
        );
      })}
    </nav>
  );
}
