import { useTranslation } from "react-i18next";
import clsx from "clsx";

/** Shown while lazy-loaded routes resolve. */
export default function RouteFallback() {
  const { t } = useTranslation();

  return (
    <p
      className={clsx(
        "py-16 text-center text-sm text-slate-600",
        "dark:text-slate-400",
      )}
      role="status"
      aria-live="polite"
    >
      {t("routeLoading")}
    </p>
  );
}
