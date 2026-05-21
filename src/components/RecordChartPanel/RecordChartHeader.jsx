import ChartTypeToggle from "./ChartTypeToggle";

export default function RecordChartHeader({
  title,
  chartType,
  onChartTypeChange,
  typeToggleLabels,
}) {
  const toggle = (
    <ChartTypeToggle
      chartType={chartType}
      onChartTypeChange={onChartTypeChange}
      groupLabel={typeToggleLabels.group}
      barLabel={typeToggleLabels.bar}
      lineLabel={typeToggleLabels.line}
    />
  );

  if (title) {
    return (
      <header className="mb-3 md:mb-4">
        <h3 className="text-center text-xs leading-snug font-semibold whitespace-pre-line text-[#051036] md:text-sm lg:text-base dark:text-slate-100">
          {title}
        </h3>
        <div className="mt-2 flex justify-end">{toggle}</div>
      </header>
    );
  }

  return <div className="mb-3 flex justify-end md:mb-4">{toggle}</div>;
}
