import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackgroundSlider from "../components/BackgroundSlider";
import SiteHeader from "../components/SiteHeader";

const SUPPORTED_LANGS = ["ka", "en"];

export default function MainLayout() {
  const { language = "ka" } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(language)) {
      navigate("/ka", { replace: true });
      return;
    }
    document.documentElement.setAttribute("data-lang", language);
    i18n.changeLanguage(language);
  }, [i18n, language, navigate]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1800px]">
      <SiteHeader />
      <BackgroundSlider key={language} />
      <main className="grid gap-4 px-5 lg:px-10 xl:px-15 2xl:px-20">
        <Outlet />
      </main>
    </div>
  );
}
