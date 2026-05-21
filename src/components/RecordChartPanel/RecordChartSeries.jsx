import { Bar, Line } from "recharts";
import {
  getSeriesColor,
  getSeriesDisplayLabel,
} from "../../utils/chartSeriesColors";

export default function RecordChartSeries({
  chartType,
  seriesKeys,
  visibleBars,
  language,
  barSize,
  colorOptions,
}) {
  return seriesKeys.map((key) => {
    if (!visibleBars[key]) {
      return null;
    }
    const color = getSeriesColor(key, colorOptions);
    const label = getSeriesDisplayLabel(key, language, colorOptions);

    if (chartType === "line") {
      return (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          name={label}
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
        name={label}
        fill={color}
        stroke={color}
        radius={[2, 2, 0, 0]}
        {...(barSize != null ? { barSize } : {})}
      />
    );
  });
}
