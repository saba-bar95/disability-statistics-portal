const CHART_PLOT_HORIZONTAL_INSET = 80;
/** ~90% of each category band when a single bar series uses Recharts defaults. */
const DEFAULT_BAND_BAR_FILL = 0.9;

/**
 * Approximate Recharts’ auto bar width, scaled (e.g. 0.8 keeps ~80% of natural width).
 */
export function computeScaledBarSize(plotWidth, categoryCount, widthRatio = 1) {
  if (!plotWidth || !categoryCount || widthRatio <= 0) {
    return undefined;
  }
  const innerWidth = Math.max(0, plotWidth - CHART_PLOT_HORIZONTAL_INSET);
  const bandWidth = innerWidth / categoryCount;
  const naturalWidth = bandWidth * DEFAULT_BAND_BAR_FILL;
  return Math.max(8, Math.round(naturalWidth * widthRatio));
}

/** Chart colors/tokens for light and dark UI (html.dark). */
export function getRecordChartTheme(isDark) {
  if (isDark) {
    return {
      axisFill: "#cbd5e1",
      gridStroke: "#475569",
      brushStroke: "#94a3b8",
      brushFill: "transparent",
    };
  }

  return {
    axisFill: "#37496d",
    gridStroke: "#e2e8f0",
    brushStroke: "#37496d",
    brushFill: "transparent",
  };
}
