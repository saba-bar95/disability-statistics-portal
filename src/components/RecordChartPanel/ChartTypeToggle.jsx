import clsx from "clsx";
import barChartTypeIcon from "../../assets/images/sections/barchart.png";
import lineChartTypeIcon from "../../assets/images/sections/linechart.png";
import {
  CHART_TYPE_ICON_CLASS,
  CHART_TYPE_TOGGLE_BTN_CLASS,
  CHART_TYPE_TOGGLE_GROUP_CLASS,
} from "../../constants/recordActionUi";
import {
  CHART_TYPE_BAR,
  CHART_TYPE_LINE,
  CHART_TYPE_TOGGLE_BG,
} from "./chartPanelConstants";

export default function ChartTypeToggle({
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
