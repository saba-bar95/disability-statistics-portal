import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { SECTION_CARDS } from "../constants/sectionCards";

const ACTIVE_LINK_CLASS_BY_ID = {
  healthcare: "border-[#2D5BFF] bg-[#2D5BFF]!",
  education: "border-[#573295] bg-[#573295]!",
  "social-security": "border-[rgba(0,0,0,0.7)] bg-[rgba(0,0,0,0.7)]!",
  sport: "border-[#284191] bg-[#284191]!",
};

/** Dedicated card UI for sector pages (overlapping the static hero background). */
export default function SectorMainStatistics() {
  const { t } = useTranslation();
  const { language = "ka" } = useParams();
  const { pathname } = useLocation();

  return (
    <section id="main-statistics" className="flex scroll-mt-28 flex-col gap-0">
      <nav
        aria-label={t("mainStatistics")}
        className="mx-auto flex w-auto flex-col gap-1.5 rounded-t-[30px] bg-[#f8fafc] p-2 sm:gap-2 sm:p-3 md:grid md:grid-cols-4 md:gap-2.5 md:p-3.5 xl:gap-2.5 xl:p-4 dark:bg-slate-900"
      >
        {SECTION_CARDS.map((card) => {
          const targetPath = `/${language}${card.to}`;
          const isActive = pathname === targetPath;
          const activeClassName =
            ACTIVE_LINK_CLASS_BY_ID[card.id] ??
            "border-[#2D5BFF] bg-[#2D5BFF]!";

          return (
            <Link
              key={card.id}
              to={targetPath}
              className={clsx(
                "mx-auto flex min-h-22 w-full max-w-[220px] flex-col items-center justify-center gap-2 rounded-xl border text-center outline-none",
                "sm:min-h-24 sm:max-w-[240px] sm:gap-2.5 md:min-h-26 md:max-w-[255px] lg:min-h-28 lg:max-w-[270px] lg:gap-3",
                "bg-white dark:bg-slate-900",
                "transition-[transform_1.8s_ease-in-out,border-color_650ms_ease-out,box-shadow_650ms_ease-out]",
                "hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100",
                isActive
                  ? activeClassName
                  : "border-[#A4D0FC] hover:border-[#a6d6fc]",
              )}
            >
              <p
                className={clsx(
                  "text-[11px] leading-snug font-bold uppercase transition-colors duration-900 ease-out sm:text-xs md:text-sm",
                  isActive
                    ? "text-white"
                    : "text-[#37496D] dark:text-slate-300",
                )}
              >
                {t(card.titleKey)}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
