import { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MdDarkMode,
  MdLightMode,
  MdTextIncrease,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import LanguageSwitcher from "../components/LanguageSwitcher";
import useVoiceAssistant from "../hooks/useVoiceAssistant";
import useUiPreferences from "../hooks/useUiPreferences";
import enLogo from "../assets/images/en-logo.png";
import kaLogo from "../assets/images/ka-logo.png";

const SUPPORTED_LANGS = ["ka", "en"];

export default function MainLayout() {
  const { language = "ka" } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { isEnabled, setIsEnabled } = useVoiceAssistant(language);
  const { fontScale, increaseFontSize, theme, toggleTheme } =
    useUiPreferences();
  const logoSrc = language === "ka" ? kaLogo : enLogo;

  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(language)) {
      navigate("/ka", { replace: true });
      return;
    }
    i18n.changeLanguage(language);
  }, [i18n, language, navigate]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1900px] lg:px-[50px]">
      <header className="flex flex-col justify-between gap-8 py-8 lg:flex-row lg:items-center lg:py-[50px]">
        <div className="flex items-center gap-4">
          <img
            src={logoSrc}
            alt={t("geoStatLogoAlt")}
            className={`w-auto object-contain ${language === "ka" ? "h-11" : "h-16"}`}
          />
          <h1 className="max-w-xl text-base font-semibold uppercase leading-tight text-slate-800 sm:text-base dark:text-white">
            {t("headerPortalTitle")}
          </h1>
        </div>

        <div className="flex w-full flex-row items-center justify-end lg:w-auto gap-10">
          <nav className="flex flex-wrap justify-start gap-x-4 gap-y-2 lg:justify-end">
            <a
              href={`/${language}#main-statistics`}
              className="text-sm font-medium text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
            >
              {t("mainStatistics")}
            </a>
            <a
              href={`/${language}#legislation`}
              className="text-sm font-medium text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
            >
              {t("legislation")}
            </a>
            <a
              href={`/${language}#links`}
              className="text-sm font-medium text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
            >
              {t("links")}
            </a>
            <NavLink
              to={`/${language}/glossary`}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
                }`
              }
            >
              {t("glossary")}
            </NavLink>
            <NavLink
              to={`/${language}/infographic`}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-slate-700 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
                }`
              }
            >
              {t("infographic")}
            </NavLink>
          </nav>

          <div
            className="flex flex-row-reverse items-center gap-4"
            data-no-tts="true"
          >
            <button
              type="button"
              className="m-0 inline-flex h-10 w-max cursor-pointer items-center justify-center p-0 leading-none text-slate-700 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
              onClick={increaseFontSize}
              aria-label={t("fontSizeButton")}
              title={`${t("fontSizeButton")} (${fontScale}%)`}
            >
              <MdTextIncrease className="text-lg" />
            </button>
            <button
              type="button"
              className="m-0 inline-flex h-10 w-max cursor-pointer items-center justify-center p-0 leading-none text-slate-700 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("dayMode") : t("nightMode")}
              title={theme === "dark" ? t("dayMode") : t("nightMode")}
            >
              {theme === "dark" ? (
                <MdLightMode className="text-lg" />
              ) : (
                <MdDarkMode className="text-lg" />
              )}
            </button>
            <button
              type="button"
              className="m-0 inline-flex h-10 w-max cursor-pointer items-center justify-center p-0 leading-none text-slate-700 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
              onClick={() => setIsEnabled(!isEnabled)}
              aria-label={isEnabled ? t("voiceEnabled") : t("voiceDisabled")}
              title={isEnabled ? t("voiceEnabled") : t("voiceDisabled")}
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

      <main className="grid gap-4">
        <Outlet />
      </main>
    </div>
  );
}
