export const LINK_SLIDER_URLS_KA = {
  1: "https://myrights.gov.ge/ka/",
  2: "https://www.moh.gov.ge/ka/",
  3: "https://www.ncdc.ge/#/home",
  4: "https://www.ncdc.ge/#/home",
  5: "https://nha.moh.gov.ge/ge/home",
  6: "https://atipfund.moh.gov.ge/",
  7: "https://idp.moh.gov.ge/index.php?lang=1",
  8: "https://mes.gov.ge/content.php?id=289&lang=geo",
  9: "https://www.legalaid.ge/ka/services/192/%E1%83%A8%E1%83%94%E1%83%96%E1%83%A6%E1%83%A3%E1%83%93%E1%83%A3%E1%83%9A%E1%83%98-%E1%83%A8%E1%83%94%E1%83%A1%E1%83%90%E1%83%AB%E1%83%9A%E1%83%94%E1%83%91%E1%83%9A%E1%83%9D%E1%83%91%E1%83%98%E1%83%A1-%E1%83%9B%E1%83%A5%E1%83%9D%E1%83%9C%E1%83%94-%E1%83%9E%E1%83%98%E1%83%A0%E1%83%97%E1%83%90-%E1%83%A3%E1%83%A4%E1%83%9A%E1%83%94%E1%83%91%E1%83%94%E1%83%91%E1%83%98",
  10: "https://ombudsman.ge/geo/informatsia-shezghuduli-shesadzleblobis-mkone-pirebistvis",
  11: "https://www.unicef.org/disabilities",
  12: "https://unstats.un.org/unsd/demographic-social/sconcerns/disability/statistics/#!/home",
  13: "https://www.washingtongroup-disability.com/",
  14: "https://www.who.int/news-room/fact-sheets/detail/disability-and-health",
};

export const LINK_SLIDER_URLS_EN = {
  1: "https://myrights.gov.ge/en/achievements",
  2: "https://www.moh.gov.ge/en/",
  3: "https://ssa.moh.gov.ge/index.php?lang=2&id=",
  4: "https://www.ncdc.ge/#/home",
  5: "https://nha.moh.gov.ge/en/home",
  6: "https://atipfund.moh.gov.ge/eng",
  7: "https://idp.moh.gov.ge/index.php?lang=1",
  8: "https://mes.gov.ge/content.php?id=289&lang=eng",
  9: "https://www.legalaid.ge/en/services/192/social-rights-of-persons-with-disabilities",
  10: "https://ombudsman.ge/eng/informatsia-shezghuduli-shesadzleblobis-mkone-pirebistvis",
  11: "https://www.unicef.org/disabilities",
  12: "https://unstats.un.org/unsd/demographic-social/sconcerns/disability/statistics/#!/home",
  13: "https://www.washingtongroup-disability.com/",
  14: "https://www.who.int/news-room/fact-sheets/detail/disability-and-health",
};

export function getLinkSliderUrls(language) {
  return language === "en" ? LINK_SLIDER_URLS_EN : LINK_SLIDER_URLS_KA;
}
