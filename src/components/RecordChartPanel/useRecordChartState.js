import { useMemo, useState } from "react";
import { getChartDataMax, getChartYAxisMax } from "../../services/recordsApi";
import { getRecordChartBarWidthRatio } from "../../constants/sectorChartUnits";
import { computeScaledBarSize } from "../../utils/chartTheme";
import { getSeriesKeys } from "./chartPanelUtils";

export function useRecordChartState({ chartData, sector, recordId }) {
  const [chartType, setChartType] = useState("bar");
  const [hiddenSeries, setHiddenSeries] = useState(() => new Set());
  const [plotWidth, setPlotWidth] = useState(0);

  const seriesKeys = useMemo(() => getSeriesKeys(chartData), [chartData]);
  const colorOptions = useMemo(
    () => ({ sector, recordId }),
    [sector, recordId],
  );

  const barWidthRatio = getRecordChartBarWidthRatio(sector, recordId);
  const barSize = useMemo(() => {
    if (barWidthRatio == null) {
      return undefined;
    }
    return computeScaledBarSize(
      plotWidth,
      chartData?.length ?? 0,
      barWidthRatio,
    );
  }, [barWidthRatio, plotWidth, chartData?.length]);

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

  return {
    chartType,
    setChartType,
    seriesKeys,
    colorOptions,
    barSize,
    visibleBars,
    yAxisMax,
    handleLegendToggle,
    setPlotWidth,
  };
}
