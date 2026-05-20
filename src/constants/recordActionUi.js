import clsx from "clsx";

/** Bordered box around record row actions (chevron, download) and chart type toggles. */
export const RECORD_ACTION_BOX_CLASS = clsx(
  "flex cursor-pointer items-center justify-center rounded-sm border border-solid",
  "px-1.5 py-0.5 transition-opacity hover:opacity-80",
  "min-[501px]:px-2 min-[501px]:py-1",
  "sm:px-2.5 sm:py-1",
  "md:px-3 md:py-1.5",
  "lg:px-4 lg:py-2",
  "xl:px-4 xl:py-2",
);

/** Square icons (chevron SVG) inside action boxes. */
export const RECORD_ACTION_ICON_CLASS = clsx(
  "h-3 w-3 shrink-0",
  "min-[501px]:h-3.5 min-[501px]:w-3.5",
  "sm:h-4 sm:w-4",
  "md:h-4 md:w-4",
  "lg:h-5 lg:w-5",
  "xl:h-5 xl:w-5",
);

/** Download arrow image (non-square). */
export const RECORD_DOWNLOAD_ICON_CLASS = clsx(
  "h-3 w-auto shrink-0",
  "min-[501px]:h-3.5",
  "sm:h-4",
  "md:h-4",
  "lg:h-5",
  "xl:h-5",
);

/** Wrapper for chevron + download buttons on each record row. */
export const RECORD_ACTIONS_GROUP_CLASS = clsx(
  "flex shrink-0 items-center",
  "gap-1.5",
  "min-[501px]:gap-2",
  "sm:gap-2",
  "md:gap-2.5",
  "lg:gap-3",
);

/** Chart type toggle button (bar / line icons in expanded chart header). */
export const CHART_TYPE_TOGGLE_BTN_CLASS = clsx(
  "flex cursor-pointer items-center justify-center rounded-md border border-solid transition-colors outline-none",
  "p-1",
  "min-[501px]:p-1.5",
  "sm:p-1.5",
  "md:p-2",
  "lg:p-2",
  "xl:p-2.5",
  "focus-visible:ring-2 focus-visible:ring-offset-2",
);

/** Bar / line icons inside chart type toggles. */
export const CHART_TYPE_ICON_CLASS = clsx(
  "shrink-0",
  "size-4",
  "min-[501px]:size-[1.125rem]",
  "sm:size-5",
  "md:size-5",
  "lg:size-6",
  "xl:size-6",
);

/** Gap between bar and line toggle buttons. */
export const CHART_TYPE_TOGGLE_GROUP_CLASS = clsx(
  "flex shrink-0 items-center",
  "gap-1",
  "min-[501px]:gap-1.5",
  "sm:gap-1.5",
  "md:gap-2",
  "lg:gap-2",
);
