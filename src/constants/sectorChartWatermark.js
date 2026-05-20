import educationLogo from "../assets/images/sections/education.svg";
import healthcareLogo from "../assets/images/sections/healthcare.svg";
import socialSecurityLogo from "../assets/images/sections/social-security.svg";
import sportLogo from "../assets/images/sections/sport.svg";

/** Sector illustration shown beside the chart plot. */
export const SECTOR_CHART_WATERMARK_SRC = {
  healthcare: healthcareLogo,
  education: educationLogo,
  "social-security": socialSecurityLogo,
  sport: sportLogo,
};

export function getSectorChartWatermarkSrc(sector) {
  if (!sector) {
    return null;
  }
  return SECTOR_CHART_WATERMARK_SRC[sector] ?? null;
}
