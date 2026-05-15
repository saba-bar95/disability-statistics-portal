import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSectorRecords } from "../context/SectorRecordsContext";
import { getRecordTitle } from "../services/recordsApi";

export default function SectorRecordsList() {
  const { language = "ka" } = useParams();
  const { t } = useTranslation();
  const {
    records,
    availableSubCategoryIds,
    selectedSubCategoryIds,
    toggleSubCategory,
    isSubCategorySelected,
    isLoading,
    error,
  } = useSectorRecords();

  if (isLoading && availableSubCategoryIds.length === 0) {
    return (
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        {t("statisticsText")}
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
        {error.message}
      </p>
    );
  }

  if (availableSubCategoryIds.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={
          language === "en" ? "Filter by subcategory" : "ფილტრი ქვეკატეგორიით"
        }
      >
        {availableSubCategoryIds.map((subCategoryId) => {
          const selected = isSubCategorySelected(subCategoryId);
          return (
            <button
              key={subCategoryId}
              type="button"
              onClick={() => toggleSubCategory(subCategoryId)}
              aria-pressed={selected}
              className={clsx(
                "cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                selected
                  ? "border-blue-400 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-200"
                  : "border-slate-300 bg-slate-100 text-slate-500 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400",
              )}
            >
              {language === "en"
                ? `Subcategory ${subCategoryId}`
                : `ქვეკატეგორია ${subCategoryId}`}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t("statisticsText")}
        </p>
      ) : (
        <>
          <ul className="space-y-2">
            {records.map((record) => (
              <li
                key={record.ID}
                className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200"
              >
                <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  {language === "en"
                    ? `Subcategory ${record.sub_category}`
                    : `ქვეკატეგორია ${record.sub_category}`}
                </span>
                {getRecordTitle(record, language)}
              </li>
            ))}
          </ul>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {records.length}{" "}
            {language === "en" ? "records" : "ჩანაწერი"} ·{" "}
            {selectedSubCategoryIds.length} / {availableSubCategoryIds.length}{" "}
            {language === "en" ? "subcategories selected" : "ქვეკატეგორია არჩეულია"}
          </p>
        </>
      )}
    </div>
  );
}
