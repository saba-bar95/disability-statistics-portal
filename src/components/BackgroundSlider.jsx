import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import eduEn from "../assets/cover/edu-en.png";
import eduGe from "../assets/cover/edu-ge.png";
import healthEn from "../assets/cover/health-en.png";
import healthGe from "../assets/cover/health-ge.png";
import socEn from "../assets/cover/soc-en.png";
import socGe from "../assets/cover/soc-ge.png";
import sportEn from "../assets/cover/sport-en.png";
import sportGe from "../assets/cover/sport-ge.png";

const INTERVAL_MS = 6000;

/** Placeholder PDF; replace per slide with paths like `/documents/edu-ka.pdf` in public/. */
const DEFAULT_SLIDE_PDF =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

/**
 * Optional per-slide PDFs by language. Keys: edu | health | soc | sport.
 * Example: `ka: { edu: "/documents/education-ka.pdf" }`
 */
const SLIDE_PDF_URLS = {
  ka: {
    edu: DEFAULT_SLIDE_PDF,
    health: DEFAULT_SLIDE_PDF,
    soc: DEFAULT_SLIDE_PDF,
    sport: DEFAULT_SLIDE_PDF,
  },
  en: {
    edu: DEFAULT_SLIDE_PDF,
    health: DEFAULT_SLIDE_PDF,
    soc: DEFAULT_SLIDE_PDF,
    sport: DEFAULT_SLIDE_PDF,
  },
};

function slidesForLanguage(language) {
  const isEn = language === "en";
  const langKey = isEn ? "en" : "ka";
  const pdfs = SLIDE_PDF_URLS[langKey] ?? SLIDE_PDF_URLS.ka;

  return [
    {
      id: "edu",
      src: isEn ? eduEn : eduGe,
      aboutKey: "sliderEduAbout",
      pdfUrl: pdfs.edu ?? DEFAULT_SLIDE_PDF,
    },
    {
      id: "health",
      src: isEn ? healthEn : healthGe,
      aboutKey: "sliderHealthAbout",
      pdfUrl: pdfs.health ?? DEFAULT_SLIDE_PDF,
    },
    {
      id: "soc",
      src: isEn ? socEn : socGe,
      aboutKey: "sliderSocAbout",
      pdfUrl: pdfs.soc ?? DEFAULT_SLIDE_PDF,
    },
    {
      id: "sport",
      src: isEn ? sportEn : sportGe,
      aboutKey: "sliderSportAbout",
      pdfUrl: pdfs.sport ?? DEFAULT_SLIDE_PDF,
    },
  ];
}

export default function BackgroundSlider() {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const slides = useMemo(() => slidesForLanguage(language), [language]);
  const [index, setIndex] = useState(0);
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const goPrev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % slides.length);
  };

  return (
    <section
      className="pb-4 sm:pb-5 md:pb-6 lg:pb-8"
      aria-roledescription="carousel"
      aria-label="Portal highlights"
    >
      <div className="relative h-[clamp(9rem,26vh,12.5rem)] w-full overflow-hidden bg-slate-200 shadow-md sm:h-[clamp(10.5rem,30vh,15rem)] md:h-[clamp(12.5rem,36vh,18.5rem)] lg:h-[clamp(14rem,42vh,22rem)] xl:h-[clamp(16rem,48vh,26rem)] 2xl:h-[clamp(17rem,52vh,30rem)] dark:bg-slate-800">
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-transparent"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-y-0 left-2 flex w-[min(100%,26rem)] max-w-[min(92%,22rem)] flex-col justify-center px-3 sm:left-4 sm:w-[min(100%,28rem)] sm:max-w-[50%] sm:px-5 md:left-6 md:px-8 lg:left-8 lg:px-10">
          <div className="pointer-events-auto flex max-w-full flex-col gap-4 sm:gap-5 md:gap-6">
            <p className="text-xs leading-snug font-semibold text-balance text-white drop-shadow-sm sm:text-sm md:text-base lg:text-lg xl:text-xl">
              {t(active.aboutKey)}
            </p>
            <a
              href={active.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-medium text-blue-200 underline decoration-blue-200/80 underline-offset-2 transition hover:text-white hover:decoration-white sm:text-sm md:text-base"
            >
              {t("sliderPdfLink")}
            </a>
          </div>
        </div>

        <button
          type="button"
          className="absolute top-1/2 left-1 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 sm:left-2 sm:h-9 sm:w-9 md:left-3 md:h-10 md:w-10 lg:h-11 lg:w-11"
          aria-label={t("sliderPrev")}
          onClick={goPrev}
        >
          <MdChevronLeft
            className="text-xl sm:text-2xl lg:text-3xl"
            aria-hidden
          />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-1 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 sm:right-2 sm:h-9 sm:w-9 md:right-3 md:h-10 md:w-10 lg:h-11 lg:w-11"
          aria-label={t("sliderNext")}
          onClick={goNext}
        >
          <MdChevronRight
            className="text-xl sm:text-2xl lg:text-3xl"
            aria-hidden
          />
        </button>

        <div
          className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-3 sm:gap-2 md:bottom-4"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-colors ${
                i === index
                  ? "h-2 w-2 bg-white shadow-sm sm:h-2.5 sm:w-2.5 dark:bg-blue-300"
                  : "h-1.5 w-1.5 bg-white/50 hover:bg-white/80 sm:h-2 sm:w-2 dark:bg-slate-500 dark:hover:bg-slate-400"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
