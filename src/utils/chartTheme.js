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
