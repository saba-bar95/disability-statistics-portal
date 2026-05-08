import { useTranslation } from "react-i18next";
import clsx from "clsx";

export default function MainStatistics() {
  const { t } = useTranslation();

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
