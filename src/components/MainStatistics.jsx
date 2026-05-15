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
        "flex scroll-mt-28 flex-col gap-8 xl:gap-10",
        "mt-[30px] md:mt-[50px] xl:mt-[80px]",
      )}
    >
      <h1
        className={clsx(
          "text-center font-bold",
          "text-base sm:text-base md:text-lg lg:text-xl",
        )}
      >
        {t("mainStatistics")}
      </h1>
      <nav
        aria-label={t("mainStatistics")}
        className={clsx(
          "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 xl:grid-cols-4",
          "xl:gap-[30px]",
        )}
      >
        {SECTION_CARDS.map((card) => {
          const targetPath = `/${language}${card.to}`;
          const isActive = pathname === targetPath;

          return (
            <Link
              key={card.id}
              to={targetPath}
              className={clsx(
                "flex w-full flex-col items-center justify-center rounded-xl border border-transparent text-center outline-none",
                "min-h-40 gap-5 px-3 py-6 sm:min-h-44 sm:gap-6 sm:px-4 sm:py-8 md:min-h-48 md:py-9 lg:min-h-52 lg:gap-7 lg:py-10",
                "bg-white shadow-[4px_4px_60px_#0000001a] dark:bg-slate-900 dark:shadow-[4px_4px_50px_rgba(255,255,255,0.12),0_0_1px_rgba(255,255,255,0.06)]",
                "transition-[transform_1.8s_ease-in-out,border-color_650ms_ease-out,box-shadow_650ms_ease-out]",
                "hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100",
                isActive
                  ? "border-blue-500 ring-1 ring-blue-300/60 sm:ring-2 dark:border-blue-400 dark:ring-blue-500/40"
                  : "hover:border-[#a6d6fc]",
              )}
            >
              <div
                className={clsx(
                  "flex shrink-0 items-center justify-center rounded-full shadow-sm",
                  "size-18 sm:size-20 md:size-22 lg:size-24",
                )}
                style={{ background: card.iconGradient }}
              >
                <img
                  src={card.icon}
                  alt=""
                  width={52}
                  height={43}
                  className={clsx(
                    "w-auto object-contain",
                    "h-11 max-w-11 sm:h-12 sm:max-w-14 md:h-14 md:max-w-16 lg:h-16 lg:max-w-18",
                  )}
                  aria-hidden
                />
              </div>
              <p
                className={clsx(
                  "leading-snug font-bold uppercase transition-colors duration-900 ease-out",
                  "text-xs sm:text-sm lg:text-base",
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
