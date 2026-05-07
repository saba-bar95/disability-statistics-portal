import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import eduEn from "../assets/cover/edu-en.png";
import eduGe from "../assets/cover/edu-ge.png";
import healthEn from "../assets/cover/health-en.png";
import healthGe from "../assets/cover/health-ge.png";
import next1 from "../assets/images/slider/next1.png";
import next2 from "../assets/images/slider/next2.png";
import socEn from "../assets/cover/soc-en.png";
import socGe from "../assets/cover/soc-ge.png";
import sportEn from "../assets/cover/sport-en.png";
import sportGe from "../assets/cover/sport-ge.png";

const INTERVAL_MS = 4000;
const SLIDER_ACTIVE_ID_STORAGE_KEY = "background-slider-active-id";

const DEFAULT_SLIDE_PDF = "/files/slider/ka/edu.pdf";

/**
 * Per-slide PDFs by language. Keys: edu | health | soc | sport.
 */
const SLIDE_PDF_URLS = {
  ka: {
    edu: "/files/slider/ka/edu.pdf",
    health: "/files/slider/ka/health.pdf",
    soc: "/files/slider/ka/soc.pdf",
    sport: "/files/slider/ka/sport.pdf",
  },
  en: {
    edu: "/files/slider/en/edu-en.pdf",
    health: "/files/slider/en/health-en.pdf",
    soc: "/files/slider/en/soc-en.pdf",
    sport: "/files/slider/en/sport-en.pdf",
  },
};

const SLIDE_TEXT_COLORS = {
  edu: "#77C2FB",
  health: "#5ED18E",
  soc: "#FFAD50",
  sport: "#CD41FA",
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

function getStoredSlideId() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.sessionStorage.getItem(SLIDER_ACTIVE_ID_STORAGE_KEY);
}

export default function BackgroundSlider() {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const slides = useMemo(() => slidesForLanguage(language), [language]);
  const [index, setIndex] = useState(() => {
    const storedId = getStoredSlideId();
    if (!storedId) {
      return 0;
    }
    const storedIndex = slides.findIndex((slide) => slide.id === storedId);
    return storedIndex >= 0 ? storedIndex : 0;
  });
  const [incomingIndex, setIncomingIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const selectedIndex = incomingIndex ?? index;
  const currentSlide = slides[index] ?? slides[0];
  const nextSlide =
    incomingIndex !== null ? (slides[incomingIndex] ?? null) : null;

  const moveBy = useCallback(
    (step) => {
      if (isTransitioning) {
        return;
      }

      const normalizedStep = step >= 0 ? 1 : -1;
      const nextIndex =
        (index + normalizedStep + slides.length) % slides.length;
      setDirection(normalizedStep);
      setIncomingIndex(nextIndex);
      setIsTransitioning(true);
    },
    [index, isTransitioning, slides.length],
  );

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setIsAnimating(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isTransitioning]);

  useEffect(() => {
    const id = window.setInterval(() => {
      moveBy(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [moveBy]);

  useEffect(() => {
    if (typeof window === "undefined" || !currentSlide?.id) {
      return;
    }
    window.sessionStorage.setItem(
      SLIDER_ACTIVE_ID_STORAGE_KEY,
      currentSlide.id,
    );
  }, [currentSlide]);

  const goPrev = () => {
    moveBy(-1);
  };

  const goNext = () => {
    moveBy(1);
  };

  const goToSlide = useCallback(
    (targetIndex) => {
      if (
        isTransitioning ||
        targetIndex < 0 ||
        targetIndex >= slides.length ||
        targetIndex === index
      ) {
        return;
      }
      setDirection(targetIndex > index ? 1 : -1);
      setIncomingIndex(targetIndex);
      setIsTransitioning(true);
    },
    [index, isTransitioning, slides.length],
  );

  const handleIncomingTransitionEnd = () => {
    if (incomingIndex === null || !isAnimating) {
      return;
    }
    setIndex(incomingIndex);
    setIncomingIndex(null);
    setIsAnimating(false);
    setIsTransitioning(false);
  };

  const renderSlideContent = (slide, className, onTransitionEnd) => (
    <div
      className={`${className} absolute inset-0 h-full w-full`}
      onTransitionEnd={onTransitionEnd}
    >
      <img
        src={slide.src}
        alt=""
        className="h-full w-full object-cover"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="relative mx-auto h-full w-full max-w-[1800px] px-5 lg:px-10 xl:px-15 2xl:px-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-1/2 translate-x-4 flex-col items-center justify-center px-3 sm:translate-x-6 sm:px-5 md:translate-x-8 md:px-8 lg:translate-x-10 lg:px-10">
            <div className="pointer-events-auto flex w-[70%] max-w-full flex-col gap-8 sm:gap-14 md:gap-20">
              <p
                className="text-base leading-snug font-semibold text-balance drop-shadow-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                style={{ color: SLIDE_TEXT_COLORS[slide.id] ?? "#FFFFFF" }}
              >
                {t(slide.aboutKey)}
              </p>
              <a
                href={slide.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
                className="inline-block w-max border border-white px-3 py-1.5 text-xs font-medium text-blue-200 uppercase underline decoration-blue-200/80 underline-offset-2 transition hover:text-white hover:decoration-white sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base lg:px-6 lg:py-3"
              >
                {t("sliderPdfLink")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const currentSlideClass = `z-20 ${
    isTransitioning
      ? "transition-transform duration-700 ease-in-out"
      : "transition-none"
  } ${
    isAnimating
      ? direction === 1
        ? "-translate-x-full"
        : "translate-x-full"
      : "translate-x-0"
  }`;

  const incomingSlideClass = `z-10 ${
    isTransitioning
      ? "transition-transform duration-700 ease-in-out"
      : "transition-none"
  } ${
    isAnimating
      ? "translate-x-0"
      : direction === 1
        ? "translate-x-full"
        : "-translate-x-full"
  }`;

  return (
    <section
      className="pb-4 sm:pb-5 md:pb-6 lg:pb-8"
      aria-roledescription="carousel"
      aria-label="Portal highlights"
    >
      <div className="relative h-[clamp(13rem,38vh,18rem)] w-full overflow-hidden bg-slate-200 shadow-md sm:h-[clamp(15rem,42vh,21rem)] md:h-[clamp(17rem,48vh,25rem)] lg:h-[clamp(19rem,54vh,30rem)] xl:h-[clamp(22rem,60vh,35rem)] 2xl:h-[clamp(24rem,64vh,40rem)] dark:bg-slate-800">
        {renderSlideContent(currentSlide, currentSlideClass)}

        {incomingIndex !== null &&
          renderSlideContent(
            nextSlide,
            incomingSlideClass,
            handleIncomingTransitionEnd,
          )}

        <div className="pointer-events-none absolute inset-0 z-40">
          <div className="relative mx-auto h-full w-full max-w-[1800px]">
            <div className="absolute inset-x-0 inset-y-0 flex items-center justify-between px-5 lg:px-10 xl:px-15 2xl:px-20">
              <button
                type="button"
                className="pointer-events-auto h-12 w-12 cursor-pointer items-center justify-center opacity-65 transition-opacity hover:opacity-100 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20"
                aria-label={t("sliderPrev")}
                onClick={goPrev}
              >
                <img
                  src={next1}
                  alt=""
                  className="h-7 w-7 object-contain sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                className="pointer-events-auto h-12 w-12 cursor-pointer items-center justify-center opacity-65 transition-opacity hover:opacity-100 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20"
                aria-label={t("sliderNext")}
                onClick={goNext}
              >
                <img
                  src={next2}
                  alt=""
                  className="h-7 w-7 object-contain sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12"
                  aria-hidden
                />
              </button>
            </div>

            <div
              className="pointer-events-auto absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-3 sm:gap-2 md:bottom-4"
              role="tablist"
              aria-label="Slide indicators"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  className={`cursor-pointer rounded-full transition-colors ${
                    i === selectedIndex
                      ? "h-2 w-4 border border-amber-400 bg-amber-400 shadow-sm sm:h-2.5 sm:w-5"
                      : "h-2 w-2 border border-amber-400 bg-transparent hover:bg-[oklch(82.8%_0.189_84.429/0.3)] sm:h-2.5 sm:w-2.5"
                  }`}
                  aria-selected={i === selectedIndex}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goToSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
