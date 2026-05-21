/** Numeric series keys from API `chartdata` rows (everything except `year`). */
export function getSeriesKeys(chartData) {
  return [
    ...new Set(
      chartData.flatMap((row) =>
        Object.keys(row).filter((key) => key !== "year"),
      ),
    ),
  ];
}
