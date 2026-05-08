import { useTranslation } from "react-i18next";
import SectionCardsNav from "../components/SectionCardsNav";

export default function SocialSecurityPage() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4">
      <SectionCardsNav />
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
          {t("sliderSocAbout")}
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          {t("socialSecurityPageText")}
        </p>
      </section>
    </div>
  );
}
