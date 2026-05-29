import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { BarChart, LineChart } from "recharts";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import { getRecordChartTheme } from "../../utils/chartTheme";
import ChartPlotContainer from "./ChartPlotContainer";
import {
  CHART_MARGIN,
  CHART_WRAPPER_CLASS,
  SECTOR_WATERMARK_COLUMN_CLASS,
} from "./chartPanelConstants";
import RecordChartHeader from "./RecordChartHeader";
import RecordChartPlot from "./RecordChartPlot";
import SectorChartWatermark from "./SectorChartWatermark";
import {
  useAxisTickFontSize,
  useChartPlotHeight,
} from "./useRecordChartLayout";
import { useRecordChartState } from "./useRecordChartState";

/** Bar or line chart for API `chartdata` rows (`year` + numeric series). */
export default function RecordChartPanel({
  chartData,
  language = "ka",
  sector,
  recordId,
  title,
  className,
}) {
  const { t } = useTranslation();
  const isEn = language === "en";
  const isDark = useIsDarkMode();
  const chartTheme = useMemo(() => getRecordChartTheme(isDark), [isDark]);
  const plotHeight = useChartPlotHeight();
  const tickFontSize = useAxisTickFontSize();
  const {
    chartType,
    setChartType,
    seriesKeys,
    colorOptions,
    barSize,
    visibleBars,
    yAxisMax,
    handleLegendToggle,
    setPlotWidth,
  } = useRecordChartState({ chartData, sector, recordId });

  const axisTickStyle = useMemo(
    () => ({
      fontSize: tickFontSize,
      fill: chartTheme.axisFill,
      fontWeight: 700,
    }),
    [tickFontSize, chartTheme.axisFill],
  );

  const typeToggleLabels = useMemo(
    () => ({
      group: t("sectorRecordChartType"),
      bar: t("sectorRecordChartBar"),
      line: t("sectorRecordChartLine"),
    }),
    [t],
  );

  if (!chartData?.length || seriesKeys.length === 0) {
    return null;
  }

  const plot = (
    <RecordChartPlot
      chartTheme={chartTheme}
      axisTickStyle={axisTickStyle}
      yAxisMax={yAxisMax}
      isEn={isEn}
      isDark={isDark}
      language={language}
      chartType={chartType}
      seriesKeys={seriesKeys}
      visibleBars={visibleBars}
      onLegendToggle={handleLegendToggle}
      barSize={barSize}
      colorOptions={colorOptions}
    />
  );

  return (
    <div
      className={clsx(CHART_WRAPPER_CLASS, className)}
      data-no-tts="true"
      data-sector-chart="true"
    >
      <RecordChartHeader
        title={title}
        chartType={chartType}
        onChartTypeChange={setChartType}
        typeToggleLabels={typeToggleLabels}
      />

      <div className="flex w-full min-w-0 items-stretch gap-0.5 md:gap-5">
        <div className="relative -ml-2 min-w-0 flex-1 md:-ml-3">
          <ChartPlotContainer
            height={plotHeight}
            onPlotWidthChange={setPlotWidth}
          >
            {chartType === "line" ? (
              <LineChart
                data={chartData}
                margin={CHART_MARGIN}
                style={{ background: "transparent" }}
              >
                {plot}
              </LineChart>
            ) : (
              <BarChart
                data={chartData}
                margin={CHART_MARGIN}
                style={{ background: "transparent" }}
              >
                {plot}
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
