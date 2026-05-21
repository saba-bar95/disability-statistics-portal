import clsx from "clsx";
import {
  getSeriesColor,
  getSeriesDisplayLabel,
} from "../../utils/chartSeriesColors";

export default function RecordChartTooltip({
  active,
  payload,
  label,
  isEn,
  isDark,
  colorOptions,
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        "custom-tooltip rounded-[14px] p-5 shadow-lg",
        "max-md:rounded-[10px] max-md:p-4",
        isDark
          ? "border border-slate-600 bg-slate-900 text-slate-100"
          : "bg-[#111729] text-white",
      )}
    >
      <div className="tooltip-container flex flex-col gap-2.5 max-md:gap-2">
        <p className="flex items-center text-sm font-bold max-md:text-xs">
          {label} {isEn ? "Year" : "წელი"}
        </p>
        {payload.map(({ value, dataKey }) => {
          const color = getSeriesColor(dataKey, colorOptions);
          return (
            <p
              key={dataKey}
              className="flex items-center justify-between gap-2.5 text-sm font-bold max-md:gap-2 max-md:text-xs"
            >
              <span className="flex items-center">
                <span
                  className="before-span mr-2 inline-block size-3 shrink-0 max-md:mr-1.5 max-md:size-2.5"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                {getSeriesDisplayLabel(
                  dataKey,
                  isEn ? "en" : "ka",
                  colorOptions,
                )}{" "}
                :
              </span>
              <span className="ml-1 font-bold tabular-nums">
                {typeof value === "number" ? value.toLocaleString() : value}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
