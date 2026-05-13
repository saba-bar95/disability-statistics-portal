import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { getLegislationItemUrls } from "../constants/legislationItemUrls";
import { sectionShellClassName } from "../constants/sectionShell";
import disabled from "../assets/images/legislation/disabled.png";

function LegislationArrowIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 41 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M0 9.65002H40.29" stroke="currentColor" strokeMiterlimit="10" />
      <path
        d="M31.65 1L40.29 9.65L31.65 18.29"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default function LegislationSection() {
  const { t, i18n } = useTranslation();
  const items = t("legislationItems", { returnObjects: true });
  const legislationList = Array.isArray(items) ? items : [];
  const legislationUrls = getLegislationItemUrls(i18n.language);

  return (
    <section
      id="legislation"
      className={clsx(sectionShellClassName, "w-full max-w-full min-w-0")}
    >
      <div className="relative w-full max-w-full min-w-0">
        <img
          src={disabled}
          alt=""
          className={clsx(
            "h-auto object-contain object-center",
            // Below md: stacked layout, capped height. md–lg: fixed 350px wide. lg+: natural width.
            "max-md:hidden md:block",
            "max-md:max-h-[200px] max-md:w-full sm:max-md:max-h-[260px]",
            "md:h-auto md:max-h-none md:max-lg:w-[350px] md:max-lg:max-w-[350px]",
            "lg:mx-auto lg:w-auto lg:max-w-full",
          )}
        />
        <div
          className={clsx(
            "mt-4 w-full max-w-full min-w-0 opacity-95",
            // Mobile only: stack below image. md+ overlays image like lg/xl desktop.
            "md:absolute md:top-6 md:right-4 md:left-[25%] md:mt-0 md:max-w-lg md:px-0",
            "lg:left-[40%]",
            "xl:top-10 xl:right-6 xl:left-[56%] xl:max-w-xl",
          )}
        >
          <h2
            className={clsx(
              "mb-3 text-center font-bold text-[#051036] sm:mb-4",
              "dark:text-slate-100",
              "text-sm sm:text-base md:text-base lg:text-xl",
            )}
          >
            {t("legislation")}
          </h2>
          <div
            className={clsx(
              "rounded-2xl border border-slate-200/90 bg-white shadow-[2px_4px_100px_#37496d26]",
              "dark:border-slate-600 dark:bg-slate-800 dark:shadow-[4px_4px_48px_rgba(0,0,0,0.45),0_0_1px_rgba(255,255,255,0.08)]",
              // List: smaller on phones; from md up = original text-sm.
              "text-[10px] leading-tight text-slate-700 sm:text-[11px] sm:leading-snug md:text-xs md:leading-snug lg:text-sm",
              "dark:text-slate-300",
              "px-3 py-2.5 md:px-6 md:py-4 lg:px-5 lg:py-3 xl:px-8 xl:py-6 2xl:px-10 2xl:py-8",
            )}
            style={{ fontFamily: "myFont, var(--app-font)" }}
          >
            <ul
              className={clsx(
                "space-y-1 leading-tight sm:space-y-1.5 sm:leading-snug md:space-y-2",
              )}
            >
              {legislationList.map((label, index) => {
                const href = legislationUrls[index];
                const rowClassName = clsx(
                  "group flex items-start gap-1.5 sm:gap-3 md:gap-4",
                  "rounded-sm no-underline outline-offset-2",
                  "transition-transform duration-500 ease-in-out",
                  "hover:translate-x-1 sm:hover:translate-x-2 md:hover:translate-x-[20px]",
                  "motion-reduce:transition-none motion-reduce:hover:translate-x-0",
                );
                const icon = (
                  <LegislationArrowIcon
                    className={clsx(
                      "h-2.5 w-6 shrink-0 stroke-1 text-[#D9D9D9] sm:h-3 sm:w-7 md:h-[19px] md:w-[41px]",
                      "dark:text-slate-500",
                      "transition-[color,stroke-width] duration-500 ease-in-out",
                      "group-hover:stroke-[2.25] group-hover:text-blue-600",
                      "dark:group-hover:text-blue-300",
                      "motion-reduce:group-hover:stroke-1",
                    )}
                  />
                );
                const text = (
                  <span
                    className={clsx(
                      "min-w-0 flex-1 font-normal wrap-break-word text-[#6f798d]",
                      "dark:text-slate-300",
                      "transition-colors duration-500 ease-in-out",
                      "group-hover:font-bold group-hover:text-[#051036]",
                      "dark:group-hover:text-blue-300",
                    )}
                  >
                    {label}
                  </span>
                );
                return (
                  <li key={index} className="list-none">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                          rowClassName,
                          "cursor-pointer",
                          "focus-visible:outline-2 focus-visible:outline-blue-600",
                          "dark:focus-visible:outline-blue-400",
                        )}
                      >
                        {icon}
                        {text}
                      </a>
                    ) : (
                      <div className={clsx(rowClassName, "cursor-default")}>
                        {icon}
                        {text}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
