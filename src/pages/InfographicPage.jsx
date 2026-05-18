import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PdfViewerModal from "../components/PdfViewerModal";
import infographicBackground from "../assets/images/infographic/background.png";
import { getSlidePdfUrl } from "../constants/backgroundSlides";
import { INFOGRAPHIC_TILE_ROWS } from "../constants/infographicTiles";

export default function InfographicPage() {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const [openPdf, setOpenPdf] = useState(null);
  const isEn = language === "en";
  const title = isEn ? "INFOGRAPHIC" : "ინფოგრაფიკა";

  const handleTileClick = (tile) => {
    setOpenPdf({
      url: getSlidePdfUrl(tile.slideId, language),
      title: t(tile.titleKey),
    });
  };

  return (
    <section
      aria-label={t("infographic")}
      className={clsx(
        "w-full",
        "mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16",
      )}
    >
      <div
        className={clsx(
          "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden shadow-md",
          "bg-slate-200 dark:bg-slate-800",
          "h-[clamp(9rem,24vh,12rem)] sm:h-[clamp(10rem,28vh,14rem)]",
          "md:h-[clamp(12rem,32vh,17rem)] lg:h-[clamp(14rem,36vh,21rem)]",
          "xl:h-[clamp(16rem,40vh,25rem)] 2xl:h-[clamp(18rem,44vh,28rem)]",
        )}
      >
        <img
          src={infographicBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div
          data-backdrop-blur
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "#00000040",
            backdropFilter: "blur(10px) brightness(100%)",
            WebkitBackdropFilter: "blur(10px) brightness(100%)",
          }}
        >
          <h1
            className={clsx(
              "px-4 text-center font-semibold text-white drop-shadow-sm",
              "text-xl tracking-wide sm:text-2xl sm:tracking-wider md:text-2xl lg:text-3xl xl:text-4xl",
              isEn && "uppercase",
            )}
          >
            {title}
          </h1>
        </div>
      </div>

      <div
        className={clsx(
          "mx-auto flex w-full max-w-[1800px] flex-col gap-4 px-4 py-4",
          "sm:gap-5 sm:px-5 sm:py-5 md:gap-6",
          "lg:gap-7 lg:px-10 xl:gap-8 xl:px-15 xl:py-6 2xl:px-20",
        )}
      >
        {INFOGRAPHIC_TILE_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={clsx(
              "flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5",
              "xl:flex-row xl:flex-wrap xl:items-end xl:gap-7 2xl:gap-9",
            )}
          >
            {row.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => handleTileClick(tile)}
                className={clsx(
                  "inline-block shrink-0 origin-bottom-left cursor-pointer rounded-xl",
                  "[zoom:0.75] xl:[zoom:1]",
                )}
              >
                <span className="relative block w-fit max-w-full">
                  <img
                    src={tile.image}
                    alt=""
                    className="block h-auto w-auto max-w-full rounded-xl"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-xl"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
                    }}
                    aria-hidden
                  />
                  <span
                    className={clsx(
                      "absolute z-10 flex items-center justify-center text-center leading-snug font-semibold",
                      "line-clamp-4 text-balance",
                      "inset-x-0 bottom-0 h-1/2 w-full px-3 text-base text-white drop-shadow-md",
                      "dark:text-slate-50",
                      "md:inset-auto md:top-auto md:right-auto md:bottom-2 md:left-2",
                      "md:box-border md:h-22 md:w-44 md:rounded-md md:bg-white md:px-3.5",
                      "md:text-sm md:text-slate-800 md:shadow-md",
                      "md:dark:bg-slate-900 md:dark:text-slate-100 md:dark:shadow-lg md:dark:ring-1 md:dark:ring-slate-700",
                      "lg:h-24 lg:w-48 lg:px-4 lg:text-sm",
                      "xl:bottom-3 xl:left-3 xl:w-52 xl:px-5 xl:text-base",
                    )}
                  >
                    {t(tile.titleKey)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {openPdf ? (
        <PdfViewerModal
          pdfUrl={openPdf.url}
          title={openPdf.title}
          closeLabel={t("closePdfModal")}
          onClose={() => setOpenPdf(null)}
        />
      ) : null}
    </section>
  );
}
