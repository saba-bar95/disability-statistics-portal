import { useTranslation } from "react-i18next";
import clsx from "clsx";

const statusTextClasses =
  "text-[9px] text-slate-600 sm:text-[10px] md:text-xs dark:text-slate-400";

const entryCardClasses = clsx(
  "rounded-md border border-[#a4d0fc]",
  "p-2 sm:p-3 md:p-3.5 lg:p-5 xl:p-6",
  "text-[9px] leading-snug text-[#37496d]",
  "sm:text-[10px] sm:leading-relaxed md:text-xs lg:text-sm",
  "transition-colors duration-200 ease-in-out",
  "hover:bg-[#eaeff8] dark:hover:bg-slate-800",
  "dark:text-slate-200",
);

export default function GlossaryEntriesList({
  entries,
  isLoading,
  error,
  language = "ka",
}) {
  const { t } = useTranslation();
  const isEn = language === "en";
  const termFontStyle = !isEn
    ? { fontFamily: "myFont, var(--app-font)" }
    : undefined;

  if (isLoading) {
    return (
      <p className={statusTextClasses} aria-live="polite">
        …
      </p>
    );
  }

  if (error) {
    return (
      <p
        className={clsx(
          "text-[9px] sm:text-[10px] md:text-xs",
          "text-red-600 dark:text-red-300",
        )}
        role="alert"
      >
        {t("glossaryLoadError")}
      </p>
    );
  }

  if (!entries.length) {
    return <p className={statusTextClasses}>{t("glossaryNoEntries")}</p>;
  }

  return (
    <ul className="flex list-none flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
      {entries.map((entry) => (
        <li key={entry.id}>
          <article className={entryCardClasses} style={termFontStyle}>
            {entry.term ? (
              <p className="m-0">
                <span className="font-bold">{entry.term}</span>
                {entry.definition ? (
                  <>
                    <span aria-hidden="true"> – </span>
                    <span>{entry.definition}</span>
                  </>
                ) : null}
              </p>
            ) : (
              <p className="m-0">{entry.definition}</p>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
