import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Syncs browser tab title with `portalTitle` for the active language. */
export default function usePortalDocumentTitle() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("portalTitle");
    document.documentElement.lang = i18n.language === "en" ? "en" : "ka";
  }, [t, i18n.language]);
}
