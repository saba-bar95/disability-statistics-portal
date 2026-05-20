import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import barChartTypeIcon from "../assets/images/sections/barchart.png";
import lineChartTypeIcon from "../assets/images/sections/linechart.png";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useIsDarkMode from "../hooks/useIsDarkMode";
import { getChartDataMax, getChartYAxisMax } from "../services/recordsApi";
import {
  CHART_TYPE_ICON_CLASS,
  CHART_TYPE_TOGGLE_BTN_CLASS,
  CHART_TYPE_TOGGLE_GROUP_CLASS,
} from "../constants/recordActionUi";
import { getSectorChartWatermarkSrc } from "../constants/sectorChartWatermark";
import { getRecordChartTheme } from "../utils/chartTheme";
import { getSeriesColor } from "../utils/chartSeriesColors";

const CHART_MARGIN = { top: 8, right: 12, left: 8, bottom: 4 };

function getSeriesKeys(chartData) {
  return [
    ...new Set(
      chartData.flatMap((row) =>
        Object.keys(row).filter((key) => key !== "year"),
      ),
    ),
  ];
}

function useAxisTickFontSize() {
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setFontSize(12);
      } else if (window.matchMedia("(max-width: 1200px)").matches) {
        setFontSize(13);
      } else {
        setFontSize(14);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return fontSize;
}

/** Fixed plot heights — must match Tailwind breakpoints on the chart container. */
function useChartPlotHeight() {
  const [height, setHeight] = useState(300);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setHeight(460);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setHeight(400);
      } else {
        setHeight(300);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}

function ChartPlotContainer({ height, children }) {
  const containerRef = useRef(null);
  const [canRender, setCanRender] = useState(false);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const update = () => {
      const { clientWidth, clientHeight } = element;
      setCanRender(clientWidth > 0 && clientHeight > 0);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, [height]);

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0 shrink-0 overflow-visible"
      style={{ height }}
    >
      {canRender ? (
        <ResponsiveContainer width="100%" height={height} minWidth={0}>
          {children}
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

const CHART_WRAPPER_CLASS = clsx(
  "record-chart-wrapper box-border w-full min-w-0 bg-transparent outline-none",
  "rounded-2xl border border-transparent px-3 py-4",
  "md:rounded-[20px] md:px-4 md:py-5",
  "lg:rounded-3xl lg:px-5 lg:py-6",
  "xl:px-6 xl:py-7.5",
  "[&_.recharts-brush]:translate-y-2.5",
  "[&_.recharts-surface]:bg-transparent",
  "[&_.recharts-wrapper]:bg-transparent",
  "[&_.recharts-cartesian-axis-tick_text]:fill-[#37496d]",
  "dark:[&_.recharts-cartesian-axis-tick_text]:fill-slate-300",
  "[&_.recharts-cartesian-axis-tick_text]:font-bold",
  "[&_.recharts-surface]:outline-none",
  "[&_.recharts-wrapper]:mr-auto [&_.recharts-wrapper]:-ml-1 [&_.recharts-wrapper]:outline-none md:[&_.recharts-wrapper]:-ml-2",
  "[&_.recharts-default-legend_.recharts-legend-item]:flex",
  "[&_.recharts-default-legend_.recharts-legend-item]:items-center",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:leading-none",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:font-bold",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:text-[#37496d]",
  "dark:[&_.recharts-default-legend_.recharts-legend-item-text]:text-slate-200",
);

const CHART_TYPE_BAR = {
  borderActive: "border-[#2563eb] dark:border-blue-400",
  borderIdle: "border-[#93c5fd] dark:border-blue-800",
  textHover: "hover:border-[#2563eb] dark:hover:border-blue-400",
  ring: "focus-visible:ring-[#2563eb] dark:focus-visible:ring-blue-400",
};

const CHART_TYPE_LINE = {
  borderActive: "border-[#3e8946] dark:border-emerald-400",
  borderIdle: "border-[#86efac] dark:border-emerald-800",
  textHover: "hover:border-[#3e8946] dark:hover:border-emerald-400",
  ring: "focus-visible:ring-[#3e8946] dark:focus-visible:ring-emerald-400",
};

const CHART_TYPE_TOGGLE_BG = "bg-transparent dark:bg-transparent";

const SECTOR_WATERMARK_COLUMN_CLASS = clsx(
  "pointer-events-none flex shrink-0 flex-col justify-end",
  "w-10 max-w-10",
  "min-[501px]:w-12 min-[501px]:max-w-12",
  "sm:w-14 sm:max-w-14",
  "md:w-20 md:max-w-20",
  "lg:w-24 lg:max-w-24",
  "xl:w-[100px] xl:max-w-[100px]",
  "pb-6 min-[501px]:pb-8 md:pb-10 lg:pb-12",
);

const SECTOR_WATERMARK_IMG_CLASS = clsx(
  "pointer-events-none h-auto w-full object-contain opacity-80",
  "max-w-10",
  "min-[501px]:max-w-12",
  "sm:max-w-14",
  "md:max-w-20",
  "lg:max-w-24",
  "xl:max-w-[100px]",
  "translate-y-1 min-[501px]:translate-y-1 md:translate-y-1.5",
  "dark:opacity-90",
);

function SectorChartWatermark({ sector }) {
  const src = getSectorChartWatermarkSrc(sector);
  if (!src) {
    return null;
  }

  return (
    <img src={src} alt="" className={SECTOR_WATERMARK_IMG_CLASS} aria-hidden />
  );
}

function ChartTypeToggle({
  chartType,
  onChartTypeChange,
  groupLabel,
  barLabel,
  lineLabel,
}) {
  const iconBtnClass = (active, palette) =>
    clsx(
      CHART_TYPE_TOGGLE_BTN_CLASS,
      CHART_TYPE_TOGGLE_BG,
      palette.ring,
      active
        ? palette.borderActive
        : clsx(palette.borderIdle, palette.textHover),
    );

  return (
    <div
      className={CHART_TYPE_TOGGLE_GROUP_CLASS}
      role="group"
      aria-label={groupLabel}
    >
      <button
        type="button"
        className={iconBtnClass(chartType === "bar", CHART_TYPE_BAR)}
        aria-pressed={chartType === "bar"}
        aria-label={barLabel}
        title={barLabel}
        onClick={() => onChartTypeChange("bar")}
      >
        <img
          src={barChartTypeIcon}
          alt=""
          className={clsx(
            CHART_TYPE_ICON_CLASS,
            "object-contain",
            chartType === "bar" ? "opacity-100" : "opacity-50",
          )}
          aria-hidden
        />
      </button>
      <button
        type="button"
        className={iconBtnClass(chartType === "line", CHART_TYPE_LINE)}
        aria-pressed={chartType === "line"}
        aria-label={lineLabel}
        title={lineLabel}
        onClick={() => onChartTypeChange("line")}
      >
        <img
          src={lineChartTypeIcon}
          alt=""
          className={clsx(
            CHART_TYPE_ICON_CLASS,
            "object-contain",
            chartType === "line" ? "opacity-100" : "opacity-50",
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}

function RecordChartLegend({ seriesKeys, visibleBars, onToggle }) {
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
        const color = getSeriesColor(key);

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
              className="recharts-legend-item-icon size-3 shrink-0 self-center md:size-3"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <span className="recharts-legend-item-text mt-0.5 text-xs leading-none font-bold text-[#37496d] md:mt-1 md:text-sm dark:text-slate-200">
              {key}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function RecordChartTooltip({ active, payload, label, isEn, isDark }) {
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
          const color = getSeriesColor(dataKey);
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
                {dataKey} :
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

function RecordChartSeries({ chartType, seriesKeys, visibleBars }) {
  return seriesKeys.map((key) => {
    if (!visibleBars[key]) {
      return null;
    }
    const color = getSeriesColor(key);

    if (chartType === "line") {
      return (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          name={key}
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3, fill: color, stroke: color, strokeWidth: 1 }}
          activeDot={{ r: 5, fill: color, stroke: color }}
        />
      );
    }

    return (
      <Bar
        key={key}
        dataKey={key}
        name={key}
        fill={color}
        stroke={color}
        radius={[2, 2, 0, 0]}
      />
    );
  });
}

/** Bar or line chart for API `chartdata` rows (`year` + numeric series). */
export default function RecordChartPanel({
  chartData,
  language = "ka",
  sector,
  title,
  className,
}) {
  const { t } = useTranslation();
  const isEn = language === "en";
  const isDark = useIsDarkMode();
  const chartTheme = useMemo(() => getRecordChartTheme(isDark), [isDark]);
  const plotHeight = useChartPlotHeight();
  const [chartType, setChartType] = useState("bar");
  const tickFontSize = useAxisTickFontSize();
  const axisTickStyle = useMemo(
    () => ({
      fontSize: tickFontSize,
      fill: chartTheme.axisFill,
      fontWeight: 700,
    }),
    [tickFontSize, chartTheme.axisFill],
  );
  const seriesKeys = useMemo(() => getSeriesKeys(chartData), [chartData]);
  const [hiddenSeries, setHiddenSeries] = useState(() => new Set());

  const visibleBars = useMemo(
    () =>
      seriesKeys.reduce((acc, key) => {
        acc[key] = !hiddenSeries.has(key);
        return acc;
      }, {}),
    [seriesKeys, hiddenSeries],
  );

  const yAxisMax = useMemo(() => {
    const dataMax = getChartDataMax(chartData, seriesKeys, visibleBars);
    return getChartYAxisMax(dataMax);
  }, [chartData, seriesKeys, visibleBars]);

  const handleLegendToggle = (key, active, visibleBarCount) => {
    if (active && visibleBarCount === 1) {
      return;
    }
    setHiddenSeries((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const chartChildren = (
    <>
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        stroke={chartTheme.gridStroke}
      />
      <XAxis dataKey="year" tick={axisTickStyle} tickLine={false} />
      <YAxis
        width={60}
        domain={[0, yAxisMax]}
        allowDataOverflow={false}
        axisLine={false}
        tickLine={false}
        tickMargin={6}
        tick={axisTickStyle}
        tickFormatter={(value) =>
          typeof value === "number" ? value.toLocaleString() : value
        }
      />
      <Tooltip content={<RecordChartTooltip isEn={isEn} isDark={isDark} />} />
      <Legend
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{ marginBottom: -8 }}
        content={
          <RecordChartLegend
            seriesKeys={seriesKeys}
            visibleBars={visibleBars}
            onToggle={handleLegendToggle}
          />
        }
      />
      <RecordChartSeries
        chartType={chartType}
        seriesKeys={seriesKeys}
        visibleBars={visibleBars}
      />
      <Brush
        dataKey="year"
        height={20}
        stroke={chartTheme.brushStroke}
        fill={chartTheme.brushFill}
        travellerWidth={5}
      />
    </>
  );

  if (!chartData?.length || seriesKeys.length === 0) {
    return null;
  }

  return (
    <div className={clsx(CHART_WRAPPER_CLASS, className)}>
      {title ? (
        <header className="mb-3 md:mb-4">
          <h3 className="whitespace-pre-line text-center text-xs leading-snug font-semibold text-[#051036] md:text-sm lg:text-base dark:text-slate-100">
            {title}
          </h3>
          <div className="mt-2 flex justify-end">
            <ChartTypeToggle
              chartType={chartType}
              onChartTypeChange={setChartType}
              groupLabel={t("sectorRecordChartType")}
              barLabel={t("sectorRecordChartBar")}
              lineLabel={t("sectorRecordChartLine")}
            />
          </div>
        </header>
      ) : (
        <div className="mb-3 flex justify-end md:mb-4">
          <ChartTypeToggle
            chartType={chartType}
            onChartTypeChange={setChartType}
            groupLabel={t("sectorRecordChartType")}
            barLabel={t("sectorRecordChartBar")}
            lineLabel={t("sectorRecordChartLine")}
          />
        </div>
      )}

      <div className="flex w-full min-w-0 items-stretch gap-0.5 md:gap-5">
        <div className="relative -ml-2 min-w-0 flex-1 md:-ml-3">
          <ChartPlotContainer height={plotHeight}>
            {chartType === "line" ? (
              <LineChart
                data={chartData}
                margin={CHART_MARGIN}
                style={{ background: "transparent" }}
              >
                {chartChildren}
              </LineChart>
            ) : (
              <BarChart
                data={chartData}
                margin={CHART_MARGIN}
                style={{ background: "transparent" }}
              >
                {chartChildren}
              </BarChart>
            )}
          </ChartPlotContainer>
        </div>
        <div className={SECTOR_WATERMARK_COLUMN_CLASS}>
          <SectorChartWatermark sector={sector} />
        </div>
      </div>
    </div>
  );
}
