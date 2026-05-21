import clsx from "clsx";

export const CHART_MARGIN = { top: 8, right: 12, left: 8, bottom: 4 };

export const CHART_WRAPPER_CLASS = clsx(
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
  "[&_.recharts-default-legend_.recharts-legend-item]:!static",
  "[&_.recharts-default-legend_.recharts-legend-item]:flex",
  "[&_.recharts-default-legend_.recharts-legend-item]:items-center",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:!relative",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:!top-auto",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:!translate-y-0",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:leading-normal",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:font-bold",
  "[&_.recharts-default-legend_.recharts-legend-item-text]:text-[#37496d]",
  "dark:[&_.recharts-default-legend_.recharts-legend-item-text]:text-slate-200",
);

export const CHART_TYPE_BAR = {
  borderActive: "border-[#2563eb] dark:border-blue-400",
  borderIdle: "border-[#93c5fd] dark:border-blue-800",
  textHover: "hover:border-[#2563eb] dark:hover:border-blue-400",
  ring: "focus-visible:ring-[#2563eb] dark:focus-visible:ring-blue-400",
};

export const CHART_TYPE_LINE = {
  borderActive: "border-[#3e8946] dark:border-emerald-400",
  borderIdle: "border-[#86efac] dark:border-emerald-800",
  textHover: "hover:border-[#3e8946] dark:hover:border-emerald-400",
  ring: "focus-visible:ring-[#3e8946] dark:focus-visible:ring-emerald-400",
};

export const CHART_TYPE_TOGGLE_BG = "bg-transparent dark:bg-transparent";

export const SECTOR_WATERMARK_COLUMN_CLASS = clsx(
  "pointer-events-none flex shrink-0 flex-col justify-end",
  "w-10 max-w-10",
  "min-[501px]:w-12 min-[501px]:max-w-12",
  "sm:w-14 sm:max-w-14",
  "md:w-20 md:max-w-20",
  "lg:w-24 lg:max-w-24",
  "xl:w-[100px] xl:max-w-[100px]",
  "pb-6 min-[501px]:pb-8 md:pb-10 lg:pb-12",
);

export const SECTOR_WATERMARK_IMG_CLASS = clsx(
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
