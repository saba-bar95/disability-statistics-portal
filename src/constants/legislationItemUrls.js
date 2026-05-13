/** Same order as `legislationItems` in i18n (ka / en). */
const LEGISLATION_ITEM_URLS_KA = [
  "https://matsne.gov.ge/ka/document/view/2334289?publication=0",
  "https://www.matsne.gov.ge/document/view/23098?publication=15",
  "https://www.matsne.gov.ge/ka/document/view/4231958?publication=6",
  "https://matsne.gov.ge/ka/document/view/4923984?publication=1",
  "https://www.matsne.gov.ge/ka/document/view/15772?publication=12",
  "https://www.matsne.gov.ge/document/view/4613854?publication=2",
  "https://www.matsne.gov.ge/document/view/2244429?publication=63",
  "https://matsne.gov.ge/ka/document/view/4924109?publication=1",
  "https://www.matsne.gov.ge/ka/document/view/55312?publication=0",
  "https://www.matsne.gov.ge/ka/document/view/55024?publication=0",
];

const LEGISLATION_ITEM_URLS_EN = [
  "https://social.desa.un.org/issues/disability/crpd/convention-on-the-rights-of-persons-with-disabilities-crpd",
  "https://www.matsne.gov.ge/en/document/view/23098?publication=9",
  "https://www.matsne.gov.ge/en/document/view/4231958?publication=0",
  "https://matsne.gov.ge/en/document/view/4923984?publication=0",
  "https://www.matsne.gov.ge/en/document/view/15772?publication=10",
  "https://www.matsne.gov.ge/document/view/4613854?publication=2",
  "https://www.matsne.gov.ge/document/view/2244429?publication=63",
  "https://matsne.gov.ge/en/document/view/4924109?publication=0",
  "https://www.matsne.gov.ge/ka/document/view/55312?publication=0",
  "https://www.matsne.gov.ge/ka/document/view/55024?publication=0",
];

const BY_LANG = {
  ka: LEGISLATION_ITEM_URLS_KA,
  en: LEGISLATION_ITEM_URLS_EN,
};

/**
 * @param {string | undefined} language i18n language (e.g. "ka", "en", "en-US")
 * @returns {readonly string[]}
 */
export function getLegislationItemUrls(language) {
  const key = String(language ?? "")
    .toLowerCase()
    .startsWith("en")
    ? "en"
    : "ka";
  return BY_LANG[key];
}
