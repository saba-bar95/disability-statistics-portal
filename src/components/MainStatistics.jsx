import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { fetchRecords } from "../services/recordsApi";

export default function MainStatistics() {
  const { t } = useTranslation();
  const { language = "ka" } = useParams();

  useEffect(() => {
    let isMounted = true;

    fetchRecords(language).catch((error) => {
      if (isMounted && import.meta.env.DEV) {
        console.error("[recordsApi] fetch failed:", error);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <section
      id="main-statistics"
      className="mt-[30px] md:mt-[50px] xl:mt-[80px]"
    >
      <h1
        className={clsx(
          "text-center font-bold",
          "text-base sm:text-base md:text-lg lg:text-xl",
        )}
      >
        {t("mainStatistics")}
      </h1>
    </section>
  );
}
