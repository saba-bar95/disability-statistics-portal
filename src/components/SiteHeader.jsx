import { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MdClose,
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdTextIncrease,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import LanguageSwitcher from "./LanguageSwitcher";
import useVoiceAssistant from "../hooks/useVoiceAssistant";
import useUiPreferences from "../hooks/useUiPreferences";
import enLogo from "../assets/images/en-logo.png";
import kaLogo from "../assets/images/ka-logo.png";

export default function SiteHeader() {
  const { language = "ka" } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const { isEnabled, setIsEnabled } = useVoiceAssistant(language);
  const { fontScale, increaseFontSize, theme, toggleTheme } =
    useUiPreferences();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const logoSrc = language === "ka" ? kaLogo : enLogo;
  const isHomeRoute =
    location.pathname === `/${language}` ||
    location.pathname === `/${language}/`;
  const activeHash = location.hash;

  return (
    <header className="max-[1360px]:item m-auto flex max-w-[1800px] flex-col justify-between gap-5 px-5 py-6 lg:flex-row lg:items-center lg:gap-10 lg:px-10 xl:px-15 2xl:px-20">
      <div className="flex items-center justify-center gap-4">
        <img src={logoSrc} alt={t("geoStatLogoAlt")} className={"max-h-11"} />
        <h1
          className={`max-w-xl min-w-[200px] text-base leading-tight font-semibold uppercase sm:text-lg ${
            theme === "dark" ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {t("headerPortalTitle")}
        </h1>
      </div>

      <div className="flex w-full flex-row items-start justify-center gap-3 max-[1360px]:flex-col max-[1360px]:items-end max-md:flex-row max-md:items-center max-md:gap-5 min-[1360px]:gap-10 md:max-lg:items-center lg:w-auto lg:justify-end">
        <div className="relative flex">
          <button
            type="button"
            className="cursor-pointer text-slate-700 md:hidden dark:text-slate-300"
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            {isMobileNavOpen ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
          <nav
            className={`${isMobileNavOpen ? "max-md:flex" : "max-md:hidden"} max-md:absolute max-md:top-full max-md:right-0 max-md:z-20 max-md:mt-2 max-md:w-max max-md:flex-col max-md:gap-2 max-md:rounded-md max-md:border max-md:border-slate-200 max-md:bg-white max-md:p-3 max-md:text-slate-700 max-md:shadow-md md:flex md:flex-row md:justify-start md:gap-x-4 md:gap-y-2 lg:justify-end max-md:dark:border-slate-700 max-md:dark:bg-slate-900 max-md:dark:text-slate-200`}
          >
            <a
              href={`/${language}#main-statistics`}
              onClick={() => setIsMobileNavOpen(false)}
              className={`w-max border-b-2 pb-2 text-xs font-bold md:text-sm xl:text-base ${
                isHomeRoute && activeHash === "#main-statistics"
                  ? "border-current text-blue-700 dark:text-blue-300"
                  : "border-transparent text-slate-700 hover:border-current hover:text-blue-700 dark:text-slate-300 dark:hover:border-current dark:hover:text-blue-300"
              }`}
            >
              {t("mainStatistics")}
            </a>
            <a
              href={`/${language}#legislation`}
              onClick={() => setIsMobileNavOpen(false)}
              className={`w-max border-b-2 pb-2 text-xs font-bold md:text-sm xl:text-base ${
                isHomeRoute && activeHash === "#legislation"
                  ? "border-current text-blue-700 dark:text-blue-300 "
                  : "border-transparent text-slate-700 hover:border-current hover:text-blue-700 dark:text-slate-300 dark:hover:border-current dark:hover:text-blue-300"
              }`}
            >
              {t("legislation")}
            </a>
            <a
              href={`/${language}#links`}
              onClick={() => setIsMobileNavOpen(false)}
              className={`w-max border-b-2 pb-2 text-xs font-bold md:text-sm xl:text-base ${
                isHomeRoute && activeHash === "#links"
                  ? "border-current text-blue-700 dark:text-blue-300"
                  : "border-transparent text-slate-700 hover:border-current hover:text-blue-700 dark:text-slate-300 dark:hover:border-current dark:hover:text-blue-300"
              }`}
            >
              {t("links")}
            </a>
            <NavLink
              to={`/${language}/glossary`}
              onClick={() => setIsMobileNavOpen(false)}
              className={({ isActive }) =>
                `w-max border-b-2 pb-2 text-xs font-bold md:text-sm xl:text-base ${
                  isActive
                    ? "border-current text-blue-700 dark:text-blue-300"
                    : "border-transparent text-slate-700 hover:border-current hover:text-blue-700 dark:text-slate-300 dark:hover:border-current dark:hover:text-blue-300"
                }`
              }
            >
              {t("glossary")}
            </NavLink>
            <NavLink
              to={`/${language}/infographic`}
              onClick={() => setIsMobileNavOpen(false)}
              className={({ isActive }) =>
                `w-max border-b-2 pb-2 text-xs font-bold md:text-sm xl:text-base ${
                  isActive
                    ? "border-current text-blue-700 dark:text-blue-300"
                    : "border-transparent text-slate-700 hover:border-current hover:text-blue-700 dark:text-slate-300 dark:hover:border-current dark:hover:text-blue-300"
                }`
              }
            >
              {t("infographic")}
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4" data-no-tts="true">
          <button
            type="button"
            onClick={increaseFontSize}
            aria-label={t("fontSizeButton")}
            title={`${t("fontSizeButton")} (${fontScale}%)`}
            className="cursor-pointer"
          >
            <MdTextIncrease className="text-lg" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("dayMode") : t("nightMode")}
            title={theme === "dark" ? t("dayMode") : t("nightMode")}
            className="cursor-pointer"
          >
            {theme === "dark" ? (
              <MdLightMode className="text-lg" />
            ) : (
              <MdDarkMode className="text-lg" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsEnabled(!isEnabled)}
            aria-label={isEnabled ? t("voiceEnabled") : t("voiceDisabled")}
            title={isEnabled ? t("voiceEnabled") : t("voiceDisabled")}
            className="cursor-pointer"
          >
            {isEnabled ? (
              <MdVolumeUp className="text-lg" />
            ) : (
              <MdVolumeOff className="text-lg" />
            )}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
