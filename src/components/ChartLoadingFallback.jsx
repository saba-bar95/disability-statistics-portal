import { useTranslation } from "react-i18next";
import clsx from "clsx";

/** Shown while the Recharts panel chunk loads. */
export default function ChartLoadingFallback() {
  const { t } = useTranslation();

  return (
    <p
      data-no-tts="true"
      data-sector-chart="true"
      className={clsx(
        "py-6 text-center text-xs text-slate-600",
        "sm:text-sm dark:text-slate-400",
      )}
      role="status"
      aria-live="polite"
    >
      {t("chartLoading")}
    </p>
  );
}
