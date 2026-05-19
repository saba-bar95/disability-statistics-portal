import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import GlossaryAlphabetPanel from "../components/GlossaryAlphabetPanel";
import GlossaryEntriesList from "../components/GlossaryEntriesList";
import useGlossary from "../hooks/useGlossary";
import glossaryMainBackground from "../assets/images/glossary/main-background.svg";
import glossarySecondaryBackground from "../assets/images/glossary/secondary-background.svg";

export default function GlossaryPage() {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const {
    letters,
    entries,
    isLettersLoading,
    isEntriesLoading,
    lettersError,
    entriesError,
    selectedLetterKey,
    selectLetter,
    clearLetterFilter,
  } = useGlossary(language);

  return (
    <section
      aria-label={t("glossary")}
      className="w-full min-[3000px]:bg-[#EAEFF8] dark:min-[3000px]:bg-slate-800"
    >
      <div
        className={clsx(
          "relative w-full overflow-hidden",
          "min-h-[clamp(12rem,36vh,16rem)] sm:min-h-[clamp(14rem,40vh,20rem)]",
          "md:min-h-[clamp(16rem,44vh,24rem)] lg:min-h-[clamp(18rem,48vh,28rem)]",
          "dark:bg-slate-900",
          "min-[3000px]:h-[669px] min-[3000px]:dark:bg-slate-800",
        )}
      >
        <img
          src={glossaryMainBackground}
          alt=""
          className={clsx(
            "block h-auto w-full dark:hidden",
            "min-[3000px]:h-full min-[3000px]:object-cover min-[3000px]:object-bottom",
          )}
          aria-hidden
        />
        <img
          src={glossarySecondaryBackground}
          alt=""
          className={clsx(
            "absolute top-0 left-1/2 h-auto w-[40%] translate-x-[18%]",
            "max-h-[clamp(12rem,36vh,16rem)] object-contain object-top",
            "sm:w-[34%] sm:max-h-[clamp(14rem,40vh,20rem)] sm:translate-x-[20%]",
            "md:w-[30%] md:max-h-[clamp(16rem,44vh,24rem)] md:translate-x-[22%]",
            "lg:w-[28.02%] lg:max-h-[clamp(18rem,48vh,28rem)] lg:translate-x-[24%]",
            "xl:max-h-[clamp(20rem,52vh,32rem)] xl:translate-x-[16%]",
            "2xl:max-h-[clamp(22rem,56vh,36rem)] 2xl:translate-x-[18%]",
            "min-[3000px]:h-full min-[3000px]:max-h-[669px]",
          )}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className={clsx(
              "relative mx-auto flex h-full w-full max-w-[1800px]",
              "items-start pt-4 pb-4 sm:pt-5 md:pt-5 lg:pt-6",
              "xl:items-center xl:pt-0 xl:pb-0",
              "px-3 sm:px-5 md:px-8 lg:px-10 xl:px-15 2xl:px-20",
            )}
          >
            <div
              className={clsx(
                "flex w-full min-w-0 items-center justify-start",
                "max-w-[min(100%,22rem)] sm:max-w-[min(100%,26rem)]",
                "md:w-[55%] md:max-w-none lg:w-1/2",
                "translate-x-1 sm:translate-x-4 md:translate-x-8",
                "lg:translate-x-12 lg:translate-y-2",
                "xl:translate-x-16 xl:-translate-y-6",
                "2xl:translate-x-20 2xl:-translate-y-8",
              )}
            >
              <GlossaryAlphabetPanel
                language={language}
                letters={letters}
                isLoading={isLettersLoading}
                error={lettersError}
                selectedLetterKey={selectedLetterKey}
                onLetterSelect={selectLetter}
                onClearLetter={clearLetterFilter}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "mx-auto w-full max-w-[min(100%,55rem)] sm:max-w-228 md:max-w-248 lg:max-w-292 xl:max-w-332",
          "px-3 pt-0 max-[500px]:-mt-20 sm:px-5 sm:pt-0 md:px-8 md:pt-8",
          "mb-6 pb-8 sm:mb-8 sm:pb-10 md:mb-10 md:pb-12 lg:mb-12 lg:pb-14",
          "xl:mb-14 xl:pb-16 2xl:mb-16 2xl:pb-20",
          "lg:max-w-[min(100%,2340px)] lg:px-10 xl:px-15 2xl:px-20",
        )}
      >
        <GlossaryEntriesList
          entries={entries}
          isLoading={isEntriesLoading}
          error={entriesError}
          language={language}
        />
      </div>
    </section>
  );
}
