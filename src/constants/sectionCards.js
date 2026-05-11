import educationSvg from "../assets/images/infos/education.svg";
import healthcareSvg from "../assets/images/infos/healthcare.svg";
import socialSvg from "../assets/images/infos/social.svg";
import sportSvg from "../assets/images/infos/sport.svg";

/** Section card icon wells (matches design tool export). */
export const SECTION_CARD_ICON_GRADIENTS = {
  education: `linear-gradient(180deg, rgb(166, 214, 252) 0%, rgb(47.02, 163.44, 250.75) 100%)`,
  healthcare: `linear-gradient(180deg, rgb(161.61, 248.63, 197.86) 0%, rgb(94, 209, 142) 100%)`,
  "social-security": `linear-gradient(180deg, rgb(255, 201, 140) 0%, rgb(255, 145.31, 21.25) 100%)`,
  sport: `linear-gradient(180deg, rgb(238.01, 183.02, 255) 0%, rgb(187.39, 0, 247.56) 100%)`,
};

const SECTION_CARDS_BASE = [
  {
    id: "healthcare",
    titleKey: "sliderHealthAbout",
    descriptionKey: "healthcarePageText",
    to: "/healthcare",
    icon: healthcareSvg,
  },
  {
    id: "education",
    titleKey: "sliderEduAbout",
    descriptionKey: "educationPageText",
    to: "/education",
    icon: educationSvg,
  },
  {
    id: "social-security",
    titleKey: "sliderSocAbout",
    descriptionKey: "socialSecurityPageText",
    to: "/social-security",
    icon: socialSvg,
  },
  {
    id: "sport",
    titleKey: "sliderSportAbout",
    descriptionKey: "sportPageText",
    to: "/sport",
    icon: sportSvg,
  },
];

export const SECTION_CARDS = SECTION_CARDS_BASE.map((card) => ({
  ...card,
  iconGradient: SECTION_CARD_ICON_GRADIENTS[card.id],
}));
