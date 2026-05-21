import { Brush, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import RecordChartLegend from "./RecordChartLegend";
import RecordChartSeries from "./RecordChartSeries";
import RecordChartTooltip from "./RecordChartTooltip";

export default function RecordChartPlot({
  chartTheme,
  axisTickStyle,
  yAxisMax,
  isEn,
  isDark,
  language,
  chartType,
  seriesKeys,
  visibleBars,
  onLegendToggle,
  barSize,
  colorOptions,
}) {
  return (
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
      <Tooltip
        content={
          <RecordChartTooltip
            isEn={isEn}
            isDark={isDark}
            colorOptions={colorOptions}
          />
        }
      />
      <Legend
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{ marginBottom: -8 }}
        content={
          <RecordChartLegend
            seriesKeys={seriesKeys}
            visibleBars={visibleBars}
            onToggle={onLegendToggle}
            language={language}
            colorOptions={colorOptions}
          />
        }
      />
      <RecordChartSeries
        chartType={chartType}
        seriesKeys={seriesKeys}
        visibleBars={visibleBars}
        language={language}
        barSize={barSize}
        colorOptions={colorOptions}
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
}
