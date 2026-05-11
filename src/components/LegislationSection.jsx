import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { sectionShellClassName } from "../constants/sectionShell";
import disabled from "../assets/images/legislation/disabled.png";

function LegislationArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="41"
      height="19"
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
  const { t } = useTranslation();
  const items = t("legislationItems", { returnObjects: true });
  const legislationList = Array.isArray(items) ? items : [];

  return (
    <section id="legislation" className={sectionShellClassName}>
      <div className="relative">
        <img src={disabled} alt="" />
        <div
          className={clsx(
            "absolute top-10 left-[60%] w-full min-w-[600px] opacity-95",
          )}
        >
          <h2 className="mb-4 text-center text-xl font-bold text-[#051036]">
            {t("legislation")}
          </h2>
          <div
            className={clsx(
              "rounded-2xl bg-[rgb(255,255,255)] px-6 py-4",
              "shadow-[2px_4px_100px_#37496d26] sm:px-7 sm:py-5",
            )}
            style={{ fontFamily: "myFont, var(--app-font)" }}
          >
            <ul className="space-y-2 text-xs leading-snug">
              {legislationList.map((label, index) => (
                <li
                  key={index}
                  className={clsx(
                    "group flex cursor-default list-none items-start gap-4",
                    "hover:cursor-pointer",
                    "transition-transform duration-500 ease-in-out",
                    "hover:translate-x-[20px]",
                    "motion-reduce:transition-none motion-reduce:hover:translate-x-0",
                  )}
                >
                  <LegislationArrowIcon
                    className={clsx(
                      "shrink-0 stroke-1 text-[#D9D9D9]",
                      "transition-[color,stroke-width] duration-500 ease-in-out",
                      "group-hover:stroke-[2.25] group-hover:text-blue-600",
                      "motion-reduce:group-hover:stroke-1",
                    )}
                  />
                  <span
                    className={clsx(
                      "font-normal text-[#6f798d] transition-colors duration-500 ease-in-out",
                      "group-hover:font-bold group-hover:text-[#051036]",
                    )}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
