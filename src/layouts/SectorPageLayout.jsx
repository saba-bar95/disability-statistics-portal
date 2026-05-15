import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Footer from "../components/Footer";
import SectorMainStatistics from "../components/SectorMainStatistics";
import SectorBackground from "../components/SectorBackground";
import SectorRecordsList from "../components/SectorRecordsList";
import SiteHeader from "../components/SiteHeader";
import { SectorRecordsContext } from "../context/SectorRecordsContext";
import { SECTOR_CATEGORY_ID } from "../constants/sectorCategories";
import useSectorRecords from "../hooks/useSectorRecords";

const SUPPORTED_LANGS = ["ka", "en"];

/** Background slide id + distinct surface for the page body (not plain white). */
const SECTOR_CONFIG = {
  education: {
    slideId: "edu",
  },
  healthcare: {
    slideId: "health",
  },
  "social-security": {
    slideId: "soc",
  },
  sport: {
    slideId: "sport",
  },
};

/** Shared shell for education / healthcare / social-security / sport routes. */
export default function SectorPageLayout({ sector, children }) {
  const { language = "ka" } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const config = SECTOR_CONFIG[sector];
  const categoryId = SECTOR_CATEGORY_ID[sector];
  const sectorRecords = useSectorRecords(categoryId, language);

  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(language)) {
      navigate("/ka", { replace: true });
      return;
    }
    document.documentElement.setAttribute("data-lang", language);
    i18n.changeLanguage(language);
  }, [i18n, language, navigate]);

  if (!config) {
    return null;
  }

  return (
    <SectorRecordsContext.Provider value={sectorRecords}>
      <div className="mx-auto min-h-screen w-full">
        <SiteHeader />
        <SectorBackground slideId={config.slideId} />
        <main className="mx-auto grid w-full max-w-[1800px] gap-10 px-5 lg:px-10 xl:px-15 2xl:px-20">
          <div className="relative z-10 mt-[-80px]">
            <SectorMainStatistics />
          </div>
          <section
            className={clsx(
              "rounded-2xl border border-blue-200 bg-white p-4 shadow-sm",
              "dark:border-blue-700 dark:bg-slate-900",
              "md:p-4 lg:p-5",
            )}
          >
            {children}
            <SectorRecordsList />
          </section>
        </main>
        <Footer />
      </div>
    </SectorRecordsContext.Provider>
  );
}
