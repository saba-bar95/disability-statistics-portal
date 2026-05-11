import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { SECTION_CARDS } from "../constants/sectionCards";
import { fetchRecords } from "../services/recordsApi";

export default function MainStatistics() {
  const { t } = useTranslation();
  const { language = "ka" } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    let isMounted = true;

    fetchRecords(language).catch((error) => {
      if (isMounted && import.meta.env.DEV) {
        console.error("[recordsApi] fetch failed:", error);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <section
      id="main-statistics"
      className={clsx(
        "mt-[30px] flex flex-col gap-8 md:mt-[50px] xl:mt-[80px] xl:gap-10",
      )}
    >
      <h1
        className={clsx(
          "text-center font-bold",
          "text-sm sm:text-sm md:text-base lg:text-lg",
        )}
      >
        {t("mainStatistics")}
      </h1>
      <nav
        aria-label={t("mainStatistics")}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 xl:grid-cols-4 xl:gap-[30px]"
      >
        {SECTION_CARDS.map((card) => {
          const targetPath = `/${language}${card.to}`;
          const isActive = pathname === targetPath;

          return (
            <Link
              key={card.id}
              to={targetPath}
              className={clsx(
                "flex min-h-36 w-full flex-col items-center justify-center gap-5 rounded-xl border border-transparent px-3 py-6 text-center outline-none sm:min-h-40 sm:gap-6 sm:px-4 sm:py-8 md:min-h-42 md:py-9 lg:min-h-44 lg:gap-7 lg:py-10",
                "bg-white shadow-[4px_4px_60px_#0000001a] dark:bg-slate-900 dark:shadow-[4px_4px_50px_rgba(255,255,255,0.12),0_0_1px_rgba(255,255,255,0.06)]",
                "transition-[transform_1.8s_ease-in-out,border-color_650ms_ease-out,box-shadow_650ms_ease-out]",
                "hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100",
                isActive
                  ? "border-blue-500 ring-1 ring-blue-300/60 sm:ring-2 dark:border-blue-400 dark:ring-blue-500/40"
                  : "hover:border-[#a6d6fc]",
              )}
            >
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-full shadow-sm sm:size-18 md:size-20 lg:size-22"
                style={{ background: card.iconGradient }}
              >
                <img
                  src={card.icon}
                  alt=""
                  width={47}
                  height={39}
                  className="h-10 w-auto max-w-10 object-contain sm:h-11 sm:max-w-12 md:h-12 md:max-w-14 lg:h-14 lg:max-w-16"
                  aria-hidden
                />
              </div>
              <p
                className={clsx(
                  "text-[11px] leading-snug font-bold uppercase transition-colors duration-900 ease-out sm:text-xs lg:text-sm",
                  isActive
                    ? "text-blue-700 dark:text-blue-300"
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
