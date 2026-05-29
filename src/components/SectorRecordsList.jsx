import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSectorRecords } from "../context/SectorRecordsContext";
import ChartLoadingFallback from "./ChartLoadingFallback";
import LazyRecordChartPanel from "./LazyRecordChartPanel";
import RecordChartCollapsible from "./RecordChartCollapsible";
import { getRecordChartDisplayTitle } from "../constants/sectorChartUnits";
import {
  downloadRecordFile,
  getRecordChartData,
  getRecordFilePath,
  getRecordTitle,
} from "../services/recordsApi";
import greenArrow from "../assets/images/sections/greenArrow.svg";
import {
  RECORD_ACTION_BOX_CLASS,
  RECORD_ACTION_ICON_CLASS,
  RECORD_ACTIONS_GROUP_CLASS,
  RECORD_DOWNLOAD_ICON_CLASS,
} from "../constants/recordActionUi";
import {
  getSectorSubcategoryImageSrc,
  getSectorSubcategoryLabelKey,
} from "../constants/sectorSubcategoryUi";
const SECTOR_TO_TITLE_KEY = {
  healthcare: "sectorRecordsTitleHealthcare",
  education: "sectorRecordsTitleEducation",
  sport: "sectorRecordsTitleSport",
  "social-security": "sectorRecordsTitleSocialSecurity",
};

/** Portal UI font (OpenSans stack); smaller than glossary hero titles. */
function sectorRecordsTitleClass(isEn) {
  return clsx(
    "mb-6 text-center font-semibold text-[#051036] md:mb-8 lg:mb-10",
    "text-sm min-[501px]:text-base md:text-lg lg:text-xl xl:text-2xl",
    "dark:text-white",
    isEn && "tracking-wide capitalize",
  );
}

function RecordChartChevron({ expanded }) {
  return (
    <svg
      className={clsx(
        RECORD_ACTION_ICON_CLASS,
        "transition-transform duration-300 ease-in-out motion-reduce:transition-none",
        expanded && "rotate-180",
      )}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {expanded ? (
        <path
          d="M5 12.5L10 7.5L15 12.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function SectorRecordsList({ sector }) {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const [expandedChartIds, setExpandedChartIds] = useState(() => new Set());
  const {
    records,
    availableSubCategoryIds,
    selectedSubCategoryIds,
    toggleSubCategory,
    isSubCategorySelected,
    isLoading,
    isFetchingRecords,
    error,
  } = useSectorRecords();

  const titleKey =
    sector && SECTOR_TO_TITLE_KEY[sector] ? SECTOR_TO_TITLE_KEY[sector] : null;
  const isEn = language === "en";
  const titleFontStyle = { fontFamily: "var(--app-font)" };

  const sectorTitle =
    titleKey != null ? (
      <h2 className={sectorRecordsTitleClass(isEn)} style={titleFontStyle}>
        {t(titleKey)}
      </h2>
    ) : null;

  if (isLoading && availableSubCategoryIds.length === 0) {
    return (
      <div className="mt-6 space-y-4">
        {sectorTitle}
        <p
          className="text-center text-sm text-slate-600 dark:text-slate-400"
          role="status"
          aria-live="polite"
        >
          {t("sectorRecordsLoading")}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 space-y-4">
        {sectorTitle}
        <p
          className="text-center text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {t("sectorRecordsLoadError")}
        </p>
      </div>
    );
  }

  if (availableSubCategoryIds.length === 0) {
    return titleKey ? <div className="mt-6">{sectorTitle}</div> : null;
  }

  const subCategoryCount = availableSubCategoryIds.length;
  const sortedSubCategoryIds = [...availableSubCategoryIds].sort(
    (a, b) => a - b,
  );

  const toggleRecordChart = (recordId) => {
    setExpandedChartIds((prev) => {
      const next = new Set(prev);
      if (next.has(recordId)) {
        next.delete(recordId);
      } else {
        next.add(recordId);
      }
      return next;
    });
  };

  const recordsPanelClass = clsx(
    "mt-6 space-y-4 transition-opacity duration-200 ease-in-out motion-reduce:transition-none",
    isFetchingRecords && records.length > 0 && "opacity-75",
  );

  return (
    <div className={recordsPanelClass}>
      {sectorTitle}
      <div
        className={clsx(
          "mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-3 lg:mb-10 lg:gap-4",
          subCategoryCount === 3 && "lg:grid-cols-3",
          subCategoryCount === 2 && "lg:mx-auto lg:w-2/3 lg:grid-cols-2",
          subCategoryCount === 1 && "lg:mx-auto lg:w-1/3 lg:grid-cols-1",
        )}
        role="group"
        aria-label={t("sectorSubcatFilterGroup")}
      >
        {sortedSubCategoryIds.map((subCategoryId) => {
          const selected = isSubCategorySelected(subCategoryId);
          const labelKey = getSectorSubcategoryLabelKey(sector, subCategoryId);
          const rawLabel = t(labelKey);
          const label =
            rawLabel === labelKey
              ? t("sectorSubcat_fallback", { id: subCategoryId })
              : rawLabel;
          const imgSrc = getSectorSubcategoryImageSrc(
            sector,
            subCategoryId,
            language,
          );
          const toggle = () => toggleSubCategory(subCategoryId);
          const onKeyDown = (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggle();
            }
          };

          return (
            <div
              key={subCategoryId}
              role="checkbox"
              aria-checked={selected}
              tabIndex={0}
              onClick={toggle}
              onKeyDown={onKeyDown}
              className={clsx(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-4 transition-colors outline-none sm:py-5",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                selected
                  ? "border-blue-500 bg-blue-50/90 shadow-sm dark:border-blue-400 dark:bg-blue-950/40"
                  : "border-slate-200 bg-[rgba(240,240,240,0.8)] hover:border-slate-300 hover:bg-[rgba(235,235,235,0.9)] dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-slate-500",
              )}
            >
              <div
                className={clsx(
                  "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:size-16",
                )}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span
                    className="text-xs font-medium text-slate-400"
                    aria-hidden
                  >
                    {subCategoryId}
                  </span>
                )}
              </div>
              <p
                className={clsx(
                  "min-w-0 flex-1 text-left leading-snug",
                  "text-[10px] min-[501px]:text-[10px] md:text-xs lg:text-sm xl:text-sm",
                  "text-[#051036] dark:text-slate-100",
                  isEn && "font-medium tracking-wide",
                )}
              >
                {label}
              </p>
              <div
                className={clsx(
                  "flex shrink-0 items-center justify-center rounded border-2 transition-colors",
                  "size-5 min-[501px]:size-6 md:size-6 lg:size-7 xl:size-7",
                  selected
                    ? "border-red-600 bg-red-600 text-white dark:border-red-500 dark:bg-red-600"
                    : "border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-800",
                )}
                aria-hidden
              >
                {selected ? (
                  <svg
                    className="size-3 min-[501px]:size-3.5 md:size-3.5 lg:size-4 xl:size-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M2.5 6.5 L5 9 L9.5 3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {isLoading && records.length === 0 ? (
        <p
          className="text-sm text-slate-600 dark:text-slate-400"
          role="status"
          aria-live="polite"
        >
          {t("sectorRecordsLoading")}
        </p>
      ) : records.length > 0 ? (
        <>
          <ul className="space-y-4 sm:space-y-5 md:space-y-6">
            {records.map((record) => {
              const chartData = getRecordChartData(record);
              const chartExpanded = expandedChartIds.has(record.ID);
              const filePath = getRecordFilePath(record, language);

              return (
                <li
                  key={record.ID}
                  className={clsx(
                    "rounded-lg bg-[#F4F4F4] py-3 pr-3 pl-5 text-sm text-[#37496d]",
                    "min-[501px]:py-4 min-[501px]:pr-4 min-[501px]:pl-6",
                    "md:py-5 md:pr-5 md:pl-7",
                    "dark:bg-slate-800/80 dark:text-slate-200",
                  )}
                >
                  <div
                    className={clsx(
                      "flex items-center gap-3",
                      "min-[501px]:gap-3.5 sm:gap-4 md:gap-4 lg:gap-5",
                    )}
                  >
                    <p className="min-w-0 flex-1 leading-snug">
                      {getRecordTitle(record, language)}
                    </p>
                    {(chartData || filePath) && (
                      <div className={RECORD_ACTIONS_GROUP_CLASS}>
                        {chartData ? (
                          <button
                            type="button"
                            onClick={() => toggleRecordChart(record.ID)}
                            className={clsx(
                              "border-0 bg-transparent p-0 text-[#37496d]",
                              "focus-visible:ring-2 focus-visible:ring-[#37496d] focus-visible:ring-offset-2 focus-visible:outline-none",
                            )}
                            aria-expanded={chartExpanded}
                            aria-label={
                              chartExpanded
                                ? t("sectorRecordToggleChartHide")
                                : t("sectorRecordToggleChart")
                            }
                            title={
                              chartExpanded
                                ? t("sectorRecordToggleChartHide")
                                : t("sectorRecordToggleChart")
                            }
                          >
                            <div
                              className={clsx(
                                RECORD_ACTION_BOX_CLASS,
                                "border-[#37496d]",
                              )}
                            >
                              <RecordChartChevron expanded={chartExpanded} />
                            </div>
                          </button>
                        ) : null}
                        {filePath ? (
                          <button
                            type="button"
                            onClick={() => downloadRecordFile(record, language)}
                            className={clsx(
                              "border-0 bg-transparent p-0",
                              "focus-visible:ring-2 focus-visible:ring-[#3e8946] focus-visible:ring-offset-2 focus-visible:outline-none",
                            )}
                            aria-label={t("sectorRecordDownload")}
                            title={t("sectorRecordDownload")}
                          >
                            <div
                              className={clsx(
                                RECORD_ACTION_BOX_CLASS,
                                "border-[#3e8946]",
                              )}
                            >
                              <img
                                src={greenArrow}
                                alt=""
                                className={RECORD_DOWNLOAD_ICON_CLASS}
                                aria-hidden
                              />
                            </div>
                          </button>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {chartData ? (
                    <div data-no-tts="true" data-sector-chart="true">
                      <RecordChartCollapsible
                        open={chartExpanded}
                        className={clsx(
                          chartExpanded ? "mt-3 min-[501px]:mt-4" : "mt-0",
                        )}
                      >
                        <Suspense fallback={<ChartLoadingFallback />}>
                          <LazyRecordChartPanel
                            chartData={chartData}
                            language={language}
                            sector={sector}
                            recordId={record.ID}
                            title={getRecordChartDisplayTitle(
                              record,
                              sector,
                              language,
                              t,
                            )}
                          />
                        </Suspense>
                      </RecordChartCollapsible>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t("sectorRecordsSummary", {
              count: records.length,
              selected: selectedSubCategoryIds.length,
              total: availableSubCategoryIds.length,
            })}
          </p>
        </>
      ) : selectedSubCategoryIds.length === 0 ? (
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          {t("sectorRecordsSelectSource")}
        </p>
      ) : null}
    </div>
  );
}
