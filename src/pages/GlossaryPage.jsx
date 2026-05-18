import { useTranslation } from "react-i18next";
import glossaryMainBackground from "../assets/images/glossary/main-background.svg";
import glossarySecondaryBackground from "../assets/images/glossary/secondary-background.svg";

export default function GlossaryPage() {
  const { t } = useTranslation();

  return (
    <section
      aria-label={t("glossary")}
      className="w-full min-[3000px]:bg-[#EAEFF8] dark:min-[3000px]:bg-slate-800"
    >
      <div className="relative w-full min-[3000px]:h-[669px]">
        <img
          src={glossaryMainBackground}
          alt=""
          className="block h-auto w-full min-[3000px]:h-full min-[3000px]:object-cover min-[3000px]:object-bottom"
          aria-hidden
        />
        <img
          src={glossarySecondaryBackground}
          alt=""
          className="absolute top-0 left-1/2 h-auto w-[28.02%] min-[3000px]:h-full min-[3000px]:object-contain min-[3000px]:object-top"
          aria-hidden
        />
      </div>
    </section>
  );
}
