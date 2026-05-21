import clsx from "clsx";
import {
  getSeriesColor,
  getSeriesDisplayLabel,
} from "../../utils/chartSeriesColors";

export default function RecordChartLegend({
  seriesKeys,
  visibleBars,
  onToggle,
  language,
  colorOptions,
}) {
  const isEn = language === "en";
  const visibleBarCount = Object.values(visibleBars).filter(Boolean).length;

  return (
    <ul
      className={clsx(
        "recharts-default-legend mt-4 flex flex-wrap justify-center",
        "gap-x-4 gap-y-2 md:gap-x-5",
      )}
    >
      {seriesKeys.map((key) => {
        const active = visibleBars[key];
        const color = getSeriesColor(key, colorOptions);

        return (
          <li
            key={key}
            className={clsx(
              "recharts-legend-item flex cursor-pointer items-center justify-center gap-2",
              active
                ? "opacity-100"
                : "text-[#999] opacity-50 dark:text-slate-500",
            )}
            onClick={() => onToggle(key, active, visibleBarCount)}
          >
            <span
              className="recharts-legend-item-icon size-3 shrink-0 md:size-3"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <span
              className={clsx(
                "recharts-legend-item-text text-xs font-bold text-[#37496d] md:text-sm dark:text-slate-200",
                isEn ? "leading-normal" : "mt-0.5 leading-none md:mt-1",
              )}
            >
              {getSeriesDisplayLabel(key, language, colorOptions)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
