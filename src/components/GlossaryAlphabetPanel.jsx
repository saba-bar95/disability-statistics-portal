import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import useMediaQuery from "../hooks/useMediaQuery";

const GRID_ROWS_LG_UP = 3;
const GRID_ROWS_BELOW_LG = 4;

const LETTER_ACTIVE_CLASSES = clsx(
  "border-[#0a58ca] text-[#0a58ca]",
  "dark:border-blue-400 dark:text-blue-400",
);

const letterBaseClasses = clsx(
  "inline-flex min-w-3 items-center justify-center rounded border p-0.5 text-center text-[8px] leading-none font-semibold",
  "min-[501px]:min-w-3.5 min-[501px]:rounded-md min-[501px]:p-1.5 min-[501px]:text-[10px]",
  "md:p-1.5 md:text-xs lg:p-2 lg:text-sm xl:p-3",
  "transition-colors duration-200 ease-in-out",
);

function GlossaryAlphabetPanel({
  language = "ka",
  letters = [],
  isLoading = false,
  error = null,
  selectedLetterKey = null,
  onLetterSelect,
  onClearLetter,
}) {
  const { t } = useTranslation();
  const isEn = language === "en";
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const gridRows = isLgUp ? GRID_ROWS_LG_UP : GRID_ROWS_BELOW_LG;

  const columnCount = useMemo(
    () => Math.max(1, Math.ceil(letters.length / gridRows)),
    [letters.length, gridRows],
  );

  return (
    <div
      className={clsx(
        "pointer-events-auto flex w-full max-w-full min-w-0 flex-col",
        "gap-1 min-[501px]:gap-2.5 md:gap-4 lg:gap-8 xl:gap-10 2xl:gap-12",
      )}
    >
      <h1
        className={clsx(
          "font-semibold text-[#37496d] dark:text-white",
          "text-xs min-[501px]:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
          isEn && "tracking-wide uppercase",
        )}
      >
        {t("glossary")}
      </h1>

      {isLoading && !letters.length ? (
        <p
          className={clsx(
            "text-xs text-[#37496d]/80 dark:text-white/80",
            "mt-3 min-[501px]:mt-5 md:mt-8 lg:mt-10 xl:mt-12",
          )}
          aria-live="polite"
        >
          …
        </p>
      ) : null}

      {error && !letters.length ? (
        <p
          className={clsx(
            "text-xs text-red-600 dark:text-red-300",
            "mt-3 min-[501px]:mt-5 md:mt-8 lg:mt-10 xl:mt-12",
          )}
          role="alert"
        >
          {t("glossaryLoadError")}
        </p>
      ) : null}

      {letters.length > 0 ? (
        <>
        <nav
          aria-label={t("glossaryAlphabetNav")}
          className={clsx(
            "max-w-full overflow-x-auto overscroll-x-contain",
            "grid w-max max-w-none grid-flow-row grid-rows-4 lg:grid-rows-3",
            "gap-x-0.5 gap-y-1 min-[501px]:gap-x-1.5 min-[501px]:gap-y-2 md:gap-x-2.5 md:gap-y-3 lg:gap-x-3",
          )}
          style={{
            gridTemplateColumns: `repeat(${columnCount}, max-content)`,
          }}
        >
          {letters.map(({ letter, apiKey, hasGlossary }) => {
            const isSelected = selectedLetterKey === apiKey;
            const fontStyle = !isEn
              ? { fontFamily: "myFont, var(--app-font)" }
              : undefined;

            if (!hasGlossary) {
              return (
                <span
                  key={apiKey}
                  className={clsx(
                    letterBaseClasses,
                    "border-[#a4d0fc] text-[#37496d] opacity-30 dark:text-white",
                  )}
                  style={fontStyle}
                  aria-disabled
                  title={t("glossaryLetterEmpty", { letter })}
                >
                  {letter}
                </span>
              );
            }

            return (
              <button
                key={apiKey}
                type="button"
                onClick={() => onLetterSelect?.(apiKey)}
                className={clsx(
                  letterBaseClasses,
                  "cursor-pointer bg-transparent",
                  isSelected
                    ? LETTER_ACTIVE_CLASSES
                    : "border-[#a4d0fc] text-[#37496d] hover:text-[#0a58ca] dark:text-white dark:hover:text-blue-400",
                )}
                style={fontStyle}
                aria-pressed={isSelected}
                aria-label={t("glossaryFilterByLetter", { letter })}
                title={t("glossaryFilterByLetter", { letter })}
              >
                {letter}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => onClearLetter?.()}
          disabled={!selectedLetterKey}
          className={clsx(
            "mt-1 self-start rounded border border-[#6f798d] bg-transparent",
            "min-[501px]:mt-1.5 md:mt-2",
            "px-1.5 py-1 min-[501px]:px-2 min-[501px]:py-1 md:px-2.5 md:py-1 lg:px-3 lg:py-1.5",
            "text-[7px] font-bold min-[501px]:text-[8px] md:text-[9px] lg:text-[10px]",
            "text-[#6f798d] transition-colors duration-200 ease-in-out",
            selectedLetterKey
              ? "cursor-pointer hover:text-[#37496d] dark:hover:text-slate-300"
              : "cursor-default opacity-50",
          )}
          style={
            !isEn ? { fontFamily: "myFont, var(--app-font)" } : undefined
          }
        >
          {t("glossaryRefresh")}
        </button>
        </>
      ) : null}
    </div>
  );
}

export default memo(GlossaryAlphabetPanel);
