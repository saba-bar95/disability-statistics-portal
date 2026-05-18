import educationImg from "../assets/images/infographic/education.png";
import healthcareImg from "../assets/images/infographic/healthcare.png";
import socialSecurityImg from "../assets/images/infographic/social-security.png";
import sportImg from "../assets/images/infographic/sport.png";

const TILES_BY_ID = {
  "social-security": {
    id: "social-security",
    slideId: "soc",
    image: socialSecurityImg,
    titleKey: "sliderSocAbout",
  },
  education: {
    id: "education",
    slideId: "edu",
    image: educationImg,
    titleKey: "sliderEduAbout",
  },
  sport: {
    id: "sport",
    slideId: "sport",
    image: sportImg,
    titleKey: "sliderSportAbout",
  },
  healthcare: {
    id: "healthcare",
    slideId: "health",
    image: healthcareImg,
    titleKey: "sliderHealthAbout",
  },
};

/** Two rows: top (education left, social right), bottom (healthcare left, sport right). */
export const INFOGRAPHIC_TILE_ROWS = [
  [TILES_BY_ID.education, TILES_BY_ID["social-security"]],
  [TILES_BY_ID.healthcare, TILES_BY_ID.sport],
];
