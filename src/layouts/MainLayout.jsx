import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import BackgroundSlider from "../components/BackgroundSlider";
import LinkSlider from "../components/LinkSlider";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";

const SUPPORTED_LANGS = ["ka", "en"];

export default function MainLayout() {
  const { language = "ka" } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isHome =
    SUPPORTED_LANGS.includes(language) && normalizedPath === `/${language}`;
  const isInfographic =
    SUPPORTED_LANGS.includes(language) &&
    normalizedPath === `/${language}/infographic`;

  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(language)) {
      navigate("/ka", { replace: true });
      return;
    }
    document.documentElement.setAttribute("data-lang", language);
    i18n.changeLanguage(language);
  }, [i18n, language, navigate]);

  return (
    <div className="mx-auto min-h-screen w-full">
      <SiteHeader />
      {isHome ? <BackgroundSlider key={language} /> : null}
      <main
        className={clsx(
          "w-full",
          isInfographic
            ? "max-w-none px-0"
            : "mx-auto max-w-[1800px] grid gap-4 px-5 lg:px-10 xl:px-15 2xl:px-20",
          !isHome && !isInfographic && "py-6 md:py-8",
        )}
      >
        <Outlet />
      </main>
      {isHome ? <LinkSlider /> : null}
      <Footer />
    </div>
  );
}
