import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

function buildPdfViewerSrc(url) {
  const base = url.split("#")[0];
  // pagemode=thumbs + navpanes=1: open thumbnail sidebar (Adobe / Chromium PDF viewers)
  return `${base}#pagemode=thumbs&navpanes=1&toolbar=1`;
}

export default function PdfViewerModal({ pdfUrl, title, closeLabel, onClose }) {
  const viewerSrc = useMemo(
    () => (pdfUrl ? buildPdfViewerSrc(pdfUrl) : ""),
    [pdfUrl],
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.documentElement.classList.add("pdf-modal-open");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("pdf-modal-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!pdfUrl) {
    return null;
  }

  return createPortal(
    <div
      className="pdf-modal-root fixed inset-0 isolate z-100 flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/60"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-viewer-title"
        className={clsx(
          "relative flex w-full flex-col overflow-hidden bg-white shadow-lg",
          "h-[min(82dvh,40rem)] max-h-[min(82dvh,40rem)]",
          "rounded-lg p-3 contain-paint",
          "sm:h-[min(86dvh,46rem)] sm:max-h-[min(86dvh,46rem)] sm:rounded-xl sm:p-[15px]",
          "md:h-[min(88dvh,52rem)] md:max-h-[min(88dvh,52rem)] md:max-w-3xl",
          "lg:h-[min(90dvh,56rem)] lg:max-h-[min(90dvh,56rem)] lg:max-w-5xl",
        )}
      >
        <p id="pdf-viewer-title" className="sr-only">
          {title}
        </p>
        <iframe
          src={viewerSrc}
          title={title}
          className="min-h-0 w-full flex-1 transform-[translateZ(0)] border-0 bg-white"
        />
        <footer
          className={clsx(
            "mt-2 shrink-0 border-t border-gray-300 pt-2",
            "sm:mt-[15px] sm:pt-[15px]",
          )}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={clsx(
                "cursor-pointer rounded-md font-semibold text-white",
                "px-4 py-2 text-xs",
                "sm:px-5 sm:py-2.5 sm:text-sm",
              )}
              style={{ backgroundColor: "#dc3545" }}
            >
              {closeLabel}
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
