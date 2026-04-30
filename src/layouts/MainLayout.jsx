import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccessibilityControls from "../components/AccessibilityControls";
import LanguageSwitcher from "../components/LanguageSwitcher";
import MainNav from "../components/MainNav";
import useVoiceAssistant from "../hooks/useVoiceAssistant";

const SUPPORTED_LANGS = ["ka", "en"];

export default function MainLayout() {
  const { language = "ka" } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { isEnabled, setIsEnabled, stop } = useVoiceAssistant(language);

  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(language)) {
      navigate("/ka", { replace: true });
      return;
    }
    i18n.changeLanguage(language);
  }, [i18n, language, navigate]);

  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>{t("portalTitle")}</h1>
        <LanguageSwitcher />
      </header>

      <MainNav />
      <AccessibilityControls
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        stop={stop}
      />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
