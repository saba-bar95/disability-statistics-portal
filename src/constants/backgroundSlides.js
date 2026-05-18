import eduEn from "../assets/cover/edu-en.png";
import eduGe from "../assets/cover/edu-ge.png";
import healthEn from "../assets/cover/health-en.png";
import healthGe from "../assets/cover/health-ge.png";
import socEn from "../assets/cover/soc-en.png";
import socGe from "../assets/cover/soc-ge.png";
import sportEn from "../assets/cover/sport-en.png";
import sportGe from "../assets/cover/sport-ge.png";

export const DEFAULT_SLIDE_PDF = "/files/slider/ka/edu.pdf";

/** Per-slide PDFs by language. Keys: edu | health | soc | sport. */
export const SLIDE_PDF_URLS = {
  ka: {
    edu: "/files/slider/ka/edu.pdf",
    health: "/files/slider/ka/health.pdf",
    soc: "/files/slider/ka/soc.pdf",
    sport: "/files/slider/ka/sport.pdf",
  },
  en: {
    edu: "/files/slider/en/edu-en.pdf",
    health: "/files/slider/en/health-en.pdf",
    soc: "/files/slider/en/soc-en.pdf",
    sport: "/files/slider/en/sport-en.pdf",
  },
};

export const SLIDE_TEXT_COLORS = {
  edu: "#77C2FB",
  health: "#5ED18E",
  soc: "#FFAD50",
  sport: "#CD41FA",
};

export function getSlidePdfUrl(slideId, language = "ka") {
  const langKey = language === "en" ? "en" : "ka";
  const pdfs = SLIDE_PDF_URLS[langKey] ?? SLIDE_PDF_URLS.ka;
  return pdfs[slideId] ?? DEFAULT_SLIDE_PDF;
}

export function slidesForLanguage(language) {
  const isEn = language === "en";
  const langKey = isEn ? "en" : "ka";
  const pdfs = SLIDE_PDF_URLS[langKey] ?? SLIDE_PDF_URLS.ka;

  return [
    {
      id: "edu",
      src: isEn ? eduEn : eduGe,
      aboutKey: "sliderEduAbout",
      pdfUrl: pdfs.edu ?? DEFAULT_SLIDE_PDF,
    },
    {
      id: "health",
      src: isEn ? healthEn : healthGe,
      aboutKey: "sliderHealthAbout",
      pdfUrl: pdfs.health ?? DEFAULT_SLIDE_PDF,
    },
    {
      id: "soc",
      src: isEn ? socEn : socGe,
      aboutKey: "sliderSocAbout",
      pdfUrl: pdfs.soc ?? DEFAULT_SLIDE_PDF,
    },
    {
      id: "sport",
      src: isEn ? sportEn : sportGe,
      aboutKey: "sliderSportAbout",
      pdfUrl: pdfs.sport ?? DEFAULT_SLIDE_PDF,
    },
  ];
}
