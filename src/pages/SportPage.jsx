import { useTranslation } from "react-i18next";
import SectorPageLayout from "../layouts/SectorPageLayout";

export default function SportPage() {
  const { t } = useTranslation();

  return (
    <SectorPageLayout sector="sport">
      <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
        {t("sliderSportAbout")}
      </h2>
      <p className="text-base text-slate-700 dark:text-slate-300">
        {t("sportPageText")}
      </p>
    </SectorPageLayout>
  );
}
