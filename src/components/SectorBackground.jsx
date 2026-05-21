import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import {
  SLIDE_TEXT_COLORS,
  slidesForLanguage,
} from "../constants/backgroundSlides";

/** Georgian sector titles (genitive) — sector hero only; home slider uses i18n. */
const SECTOR_ABOUT_TITLE_KA = {
  health: "ჯანმრთელობის დაცვის",
  edu: "განათლების",
  soc: "სოციალური უზრუნველყოფა, კეთილდღეობისა და უსაფრთხოების",
  sport: "სპორტის",
};

/** Static, single-slide background for sector pages — no autoplay, no controls. */
export default function SectorBackground({ slideId }) {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const isEn = language === "en";
  const slides = useMemo(() => slidesForLanguage(language), [language]);
  const slide = slides.find((s) => s.id === slideId) ?? slides[0];

  if (!slide) {
    return null;
  }

  const sectorAboutTitle = isEn
    ? t(slide.aboutKey)
    : (SECTOR_ABOUT_TITLE_KA[slide.id] ?? t(slide.aboutKey));

  return (
    <section
      aria-label={sectorAboutTitle}
      className={clsx(
        "relative w-full overflow-hidden bg-slate-200 shadow-md dark:bg-slate-800",
        "h-[clamp(13rem,38vh,18rem)] sm:h-[clamp(15rem,42vh,21rem)]",
        "md:h-[clamp(17rem,48vh,25rem)] lg:h-[clamp(19rem,54vh,30rem)]",
        "xl:h-[clamp(22rem,60vh,35rem)] 2xl:h-[clamp(24rem,64vh,40rem)]",
      )}
    >
      <img
        src={slide.src}
        alt=""
        className={clsx(
          "absolute inset-0 h-full w-full object-cover",
          "transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
        )}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0">
        <div
          className={clsx(
            "relative mx-auto h-full w-full max-w-[1800px] px-5 lg:px-10",
            "xl:px-15 2xl:px-20",
          )}
        >
          <div
            className={clsx(
              "absolute inset-y-0 left-0 flex w-4/5 flex-col items-center justify-center md:w-1/2",
              "translate-x-4 px-3 sm:translate-x-6 sm:px-5",
              "md:translate-x-8 md:px-8 lg:translate-x-10 lg:px-10",
            )}
          >
            <div
              key={slideId}
              className={clsx(
                "pointer-events-auto flex max-w-full flex-col gap-4",
                "w-[88%] max-sm:-translate-y-5",
                "sm:w-[70%] sm:translate-y-0 sm:gap-6 md:gap-8",
                "transition-[opacity,color] duration-300 ease-in-out motion-reduce:transition-none",
              )}
            >
              <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                <p
                  className={clsx(
                    "text-sm leading-snug font-semibold text-balance drop-shadow-sm",
                    "sm:text-base md:text-lg lg:text-xl xl:text-2xl",
                  )}
                  style={{ color: "#FFFFFF" }}
                >
                  {isEn ? "INFOGRAPHIC" : "ინფოგრაფიკა"}
                </p>
                {isEn ? (
                  <>
                    <p
                      className={clsx(
                        "text-sm leading-snug font-semibold text-balance drop-shadow-sm",
                        "sm:text-base md:text-lg lg:text-xl xl:text-2xl",
                      )}
                      style={{ color: "#FFFFFF" }}
                    >
                      About
                    </p>
                    <p
                      className={clsx(
                        "w-full max-w-[min(100%,22rem)] text-sm leading-snug font-semibold text-pretty drop-shadow-sm",
                        "sm:max-w-full sm:text-base md:text-lg lg:text-xl xl:text-2xl",
                      )}
                      style={{
                        color: SLIDE_TEXT_COLORS[slide.id] ?? "#FFFFFF",
                      }}
                    >
                      {sectorAboutTitle}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className={clsx(
                        "w-full max-w-[min(100%,22rem)] text-sm leading-snug font-semibold text-pretty drop-shadow-sm",
                        "sm:max-w-full sm:text-base md:text-lg lg:text-xl xl:text-2xl",
                      )}
                      style={{
                        color: SLIDE_TEXT_COLORS[slide.id] ?? "#FFFFFF",
                      }}
                    >
                      {sectorAboutTitle}
                    </p>
                    <p
                      className={clsx(
                        "text-sm leading-snug font-semibold text-balance drop-shadow-sm",
                        "sm:text-base md:text-lg lg:text-xl xl:text-2xl",
                      )}
                      style={{ color: "#FFFFFF" }}
                    >
                      შესახებ
                    </p>
                  </>
                )}
              </div>
              <a
                href={slide.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
                className={clsx(
                  "inline-block w-max border border-white px-3 py-1.5 text-[11px]",
                  "font-medium text-blue-200 uppercase underline",
                  "decoration-blue-200/80 underline-offset-2 transition",
                  "hover:text-white hover:decoration-white sm:px-4 sm:py-2",
                  "sm:text-xs md:px-5 md:py-2.5 md:text-sm lg:px-6 lg:py-3",
                )}
              >
                {isEn ? "view" : "ნახვა"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
