import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

export default function LanguageSwitcher() {
  const { language = "ka" } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const nextLang = language === "ka" ? "en" : "ka";
  const nextCountryCode = nextLang === "en" ? "GB" : "GE";
  const nextLabel = nextLang === "en" ? "English" : "ქართული";

  const setLanguage = (nextLang) => {
    if (nextLang === language) {
      return;
    }

    const oldPrefix = `/${language}`;
    const currentPath = window.location.pathname;
    const suffix = currentPath.startsWith(oldPrefix)
      ? currentPath.slice(oldPrefix.length) || ""
      : "";

    i18n.changeLanguage(nextLang);
    navigate(`/${nextLang}${suffix || ""}`);
  };

  return (
    <button
      type="button"
      className="m-0 inline-flex cursor-pointer items-center justify-center p-0 leading-none text-lg transition hover:opacity-80"
      onClick={() => setLanguage(nextLang)}
      aria-label={nextLabel}
      title={nextLabel}
    >
      <ReactCountryFlag countryCode={nextCountryCode} svg aria-hidden="true" />
    </button>
  );
}
