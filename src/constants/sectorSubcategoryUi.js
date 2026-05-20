import healthcareLogo1 from "../assets/images/sections/healthcare/logo1.svg";
import healthcareLogo2Ka from "../assets/images/sections/healthcare/logo2.png";
import healthcareLogo2En from "../assets/images/sections/healthcare/logo2-en.png";
import healthcareLogo3 from "../assets/images/sections/healthcare/logo3.svg";

import educationLogo1 from "../assets/images/sections/education/logo1.svg";
import educationLogo2 from "../assets/images/sections/education/logo2.svg";
import educationLogo3 from "../assets/images/sections/education/logo3.svg";

import socialLogo1 from "../assets/images/sections/social-security/logo1.svg";
import socialLogo2 from "../assets/images/sections/social-security/logo2.svg";

import sportLogo3 from "../assets/images/sections/sports/logo3.svg";

/** i18n key prefix: social-security → social_security (valid key segment). */
export function sectorToSubcatKeyPrefix(sector) {
  if (sector === "social-security") {
    return "social_security";
  }
  return sector;
}

/**
 * Image URL for a sector subcategory. Healthcare logo2 is language-specific (PNG).
 * Sport only has logo3 in assets — used for any sport subcategory id.
 */
export function getSectorSubcategoryImageSrc(sector, subCategoryId, language) {
  const id = Number(subCategoryId);
  const isEn = language === "en";

  switch (sector) {
    case "healthcare":
      switch (id) {
        case 1:
          return healthcareLogo1;
        case 2:
          return isEn ? healthcareLogo2En : healthcareLogo2Ka;
        case 3:
          return healthcareLogo3;
        default:
          return null;
      }
    case "education":
      switch (id) {
        case 1:
          return educationLogo1;
        case 2:
          return educationLogo2;
        case 3:
          return educationLogo3;
        default:
          return null;
      }
    case "social-security":
      switch (id) {
        case 1:
          return socialLogo1;
        case 2:
        case 3:
          return socialLogo2;
        default:
          return null;
      }
    case "sport":
      return sportLogo3;
    default:
      return null;
  }
}

/** i18n key for subcategory label; sport uses a single key for all ids. */
export function getSectorSubcategoryLabelKey(sector, subCategoryId) {
  if (sector === "sport") {
    return "sectorSubcat_sport_1";
  }
  const prefix = sectorToSubcatKeyPrefix(sector);
  return `sectorSubcat_${prefix}_${subCategoryId}`;
}
