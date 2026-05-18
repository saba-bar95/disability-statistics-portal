import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { sectionShellClassName } from "../constants/sectionShell";
import { getLinkSliderUrls } from "../constants/linkSliderUrls";

const kaImagesGlob = import.meta.glob(
  "../assets/images/links/ka/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);
const enImagesGlob = import.meta.glob(
  "../assets/images/links/en/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

function logoOrderFromPath(path) {
  const file = path.split("/").pop() ?? "";
  const m = file.match(/logo-?(\d+)/i);
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
}

function sortedImageEntries(globResult) {
  return Object.keys(globResult)
    .map((key) => ({
      src: globResult[key],
      number: logoOrderFromPath(key),
    }))
    .sort((a, b) => a.number - b.number);
}

const LINK_IMAGES_KA = sortedImageEntries(kaImagesGlob);
const LINK_IMAGES_EN = sortedImageEntries(enImagesGlob);

const GAP_PX = 56;
const INERTIA_FRICTION = 0.95;
const INERTIA_MIN_VELOCITY = 0.02;
const INERTIA_START_THRESHOLD = 0.05;
const DRAG_START_THRESHOLD_PX = 4;
const DRAG_CLICK_THRESHOLD_PX = 6;

const navButtonClass = clsx(
  "pointer-events-auto flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center",
  "rounded-full border-0 bg-[#ccc] text-black transition-opacity dark:bg-slate-600 dark:text-white",
  "sm:h-7 sm:w-7 md:h-7 md:w-7 lg:h-8 lg:w-8",
  "hover:opacity-90 disabled:pointer-events-none disabled:opacity-40",
);

function ChevronIcon({ direction = "left" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <polyline points="15 6 9 12 15 18" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  );
}

const scrollerClass = clsx(
  "justify-center flex min-h-0 cursor-grab select-none flex-nowrap items-center overflow-x-auto py-1 active:cursor-grabbing",
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
);

const imageClass = "h-[40px] w-auto shrink-0 object-contain md:h-[55px]";

const mainPaddingX = clsx("px-5 lg:px-10 xl:px-15 2xl:px-20");

export default function LinkSlider() {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const slides = useMemo(
    () => (language === "en" ? LINK_IMAGES_EN : LINK_IMAGES_KA),
    [language],
  );
  const urls = getLinkSliderUrls(language);

  const scrollerRef = useRef(null);
  const [itemStep, setItemStep] = useState(120);
  const [isDragging, setIsDragging] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragMaxDelta = useRef(0);
  const activePointerId = useRef(null);
  const isDraggingRef = useRef(false);

  const velocityRef = useRef(0);
  const lastMoveRef = useRef({ x: 0, t: 0 });
  const inertiaRafRef = useRef(null);

  const n = slides.length;

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft < maxScroll - 1);
  }, []);

  const measureStep = useCallback(() => {
    const root = scrollerRef.current;
    if (!root?.firstElementChild) return;
    const first = root.firstElementChild;
    const w = first.getBoundingClientRect().width;
    setItemStep(w + GAP_PX);
    updateEdges();
  }, [updateEdges]);

  useLayoutEffect(() => {
    measureStep();
    const onResize = () => measureStep();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureStep, slides]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides, updateEdges]);

  const stopInertia = useCallback(() => {
    if (inertiaRafRef.current !== null) {
      cancelAnimationFrame(inertiaRafRef.current);
      inertiaRafRef.current = null;
    }
  }, []);

  useEffect(() => () => stopInertia(), [stopInertia]);

  const startInertia = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let v = velocityRef.current;
    if (Math.abs(v) < INERTIA_START_THRESHOLD) return;

    let prevTime = performance.now();
    const tick = (now) => {
      const dt = Math.max(1, now - prevTime);
      prevTime = now;
      el.scrollLeft += -v * dt;
      v *= Math.pow(INERTIA_FRICTION, dt / 16);
      if (Math.abs(v) > INERTIA_MIN_VELOCITY) {
        inertiaRafRef.current = requestAnimationFrame(tick);
      } else {
        inertiaRafRef.current = null;
      }
    };
    inertiaRafRef.current = requestAnimationFrame(tick);
  }, []);

  const goPrev = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || n <= 1) return;
    stopInertia();
    el.scrollBy({ left: -itemStep, behavior: "smooth" });
  }, [itemStep, n, stopInertia]);

  const goNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || n <= 1) return;
    stopInertia();
    el.scrollBy({ left: itemStep, behavior: "smooth" });
  }, [itemStep, n, stopInertia]);

  const onPointerDown = (e) => {
    if (n <= 1 || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    stopInertia();
    activePointerId.current = e.pointerId;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    dragMaxDelta.current = 0;
    isDraggingRef.current = false;
    velocityRef.current = 0;
    lastMoveRef.current = { x: e.clientX, t: performance.now() };
  };

  const onPointerMove = (e) => {
    if (activePointerId.current !== e.pointerId) return;
    const el = scrollerRef.current;
    if (!el) return;

    const delta = e.clientX - dragStartX.current;
    const absDelta = Math.abs(delta);
    if (absDelta > dragMaxDelta.current) {
      dragMaxDelta.current = absDelta;
    }

    if (!isDraggingRef.current) {
      if (absDelta < DRAG_START_THRESHOLD_PX) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    el.scrollLeft = dragStartScroll.current - delta;

    const now = performance.now();
    const dt = now - lastMoveRef.current.t;
    if (dt > 0) {
      const instant = (e.clientX - lastMoveRef.current.x) / dt;
      velocityRef.current = 0.7 * velocityRef.current + 0.3 * instant;
    }
    lastMoveRef.current = { x: e.clientX, t: now };
  };

  const endDrag = (e) => {
    if (activePointerId.current !== e.pointerId) return;
    if (isDraggingRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    activePointerId.current = null;
    const wasDragging = isDraggingRef.current;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (wasDragging) startInertia();
  };

  const onLinkClickCapture = (e) => {
    if (dragMaxDelta.current > DRAG_CLICK_THRESHOLD_PX) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (n === 0) {
    return (
      <section
        id="links"
        className={clsx(
          sectionShellClassName,
          "mx-auto mb-6 flex-col gap-3 sm:mb-8 lg:mb-10",
          mainPaddingX,
        )}
      >
        <h1
          className={clsx(
            "text-center font-bold",
            "text-base sm:text-base md:text-lg lg:text-xl",
          )}
        >
          {t("links")}
        </h1>
      </section>
    );
  }

  return (
    <section
      id="links"
      className="mb-6 flex w-full scroll-mt-28 flex-col gap-4 sm:mb-8 lg:mb-10"
      aria-roledescription="carousel"
      aria-label={t("links")}
    >
      <div
        className={clsx(
          sectionShellClassName,
          "mx-auto w-full max-w-[1800px] flex-col gap-3",
          mainPaddingX,
        )}
      >
        <h1
          className={clsx(
            "text-center font-bold",
            "text-base sm:text-base md:text-lg lg:text-xl",
          )}
        >
          {t("links")}
        </h1>
      </div>

      <div className="w-full shrink-0 bg-[#F5F5F5] py-2 sm:py-2.5 dark:bg-slate-800">
        <div className="flex items-center gap-2 px-3 sm:gap-3 sm:px-4 md:gap-4 md:px-6 lg:gap-5 lg:px-8">
          <button
            type="button"
            className={navButtonClass}
            aria-label={t("sliderPrev")}
            onClick={goPrev}
            disabled={n <= 1 || !canPrev}
          >
            <ChevronIcon direction="left" />
          </button>

          <div
            className="min-w-0 flex-1 touch-pan-x"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ touchAction: isDragging ? "none" : "pan-x" }}
          >
            <div
              ref={scrollerRef}
              className={scrollerClass}
              style={{ gap: `${GAP_PX}px` }}
            >
              {slides.map((slide, i) => {
                const href = urls[slide.number];
                const img = (
                  <img
                    src={slide.src}
                    alt=""
                    className={imageClass}
                    draggable={false}
                    onLoad={measureStep}
                  />
                );
                return (
                  <div
                    key={`${slide.src}-${i}`}
                    className="flex shrink-0 items-center justify-center"
                  >
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable={false}
                        className="flex items-center justify-center"
                        onClickCapture={onLinkClickCapture}
                      >
                        {img}
                      </a>
                    ) : (
                      img
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={navButtonClass}
            aria-label={t("sliderNext")}
            onClick={goNext}
            disabled={n <= 1 || !canNext}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
