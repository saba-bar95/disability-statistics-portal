import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  ka: {
    translation: {
      portalTitle: "შეზღუდული შესაძლებლობის მქონე პირთა სტატისტიკური პორტალი",
      headerPortalTitle: "შშმ პირთა სტატისტიკის პორტალი",
      geoStatLogoAlt: "საქსტატის ლოგო",
      home: "მთავარი",
      about: "პორტალის შესახებ",
      statistics: "სტატისტიკა",
      services: "სერვისები",
      mainStatistics: "სტატისტიკური ინფორმაცია",
      legislation: "კანონმდებლობა",
      links: "ბმულები",
      glossary: "გლოსარიუმი",
      infographic: "ინფოგრაფიკა",
      heroTitle: "მონაცემები, რომლებიც აძლიერებს ინკლუზიურ გადაწყვეტილებებს",
      heroText:
        "პორტალი აერთიანებს მონაცემებს შეზღუდული შესაძლებლობის მქონე პირების შესახებ, რათა დაგეგმვა და მონიტორინგი იყოს უფრო ზუსტი და გამჭვირვალე.",
      aboutTitle: "რატომ ეს პორტალი",
      aboutText:
        "პლატფორმა მხარს უჭერს სახელმწიფო სტრუქტურებს, მკვლევრებს და საზოგადოებას სანდო სტატისტიკური მონაცემებით.",
      statisticsTitle: "ძირითადი მაჩვენებლები",
      statisticsText:
        "აქ შეიძლება განთავსდეს ასაკის, სქესის, რეგიონისა და სერვისებზე წვდომის მიხედვით გაშლილი მაჩვენებლები.",
      servicesTitle: "ხელმისაწვდომი სერვისები",
      servicesText:
        "გვერდი შეიცავს სერვისების კატალოგს, გზამკვლევს, და საკონტაქტო ინფორმაციას მხარდაჭერისთვის.",
      mainStatisticsText:
        "ამ სექციაში განთავსდება ქვეყნის მასშტაბით ძირითადი სტატისტიკური მაჩვენებლები შშმ პირების შესახებ.",
      legislationText:
        "აქ მოიძებნება შშმ პირთა უფლებებთან, მხარდაჭერასა და სერვისებთან დაკავშირებული საკანონმდებლო დოკუმენტები.",
      linksText:
        "სასარგებლო ბმულების სიაში შეგროვებულია ოფიციალური რესურსები, პარტნიორი ორგანიზაციები და დამატებითი ინფორმაცია.",
      glossaryText:
        "გლოსარიუმის გვერდი განმარტავს პორტალზე გამოყენებულ ძირითად ტერმინებსა და განმარტებებს.",
      infographicText:
        "ინფოგრაფიკის გვერდზე განთავსდება ვიზუალური მასალები, რომლებიც მონაცემებს მარტივად აღსაქმელს ხდის.",
      fontSizeButton: "ფონტის ზომა",
      nightMode: "ღამის რეჟიმი",
      dayMode: "დღის რეჟიმი",
      voiceEnabled: "ხმოვანი ასისტენტი ჩართულია",
      voiceDisabled: "ხმოვანი ასისტენტი გამორთულია",
      stopVoice: "ხმის გაჩერება",
      voiceHint:
        "ტექსტზე მაუსის მიტანისას ან დაკლიკებისას სისტემა ხმამაღლა წაიკითხავს კონტენტს.",
      sliderEduAbout:
        "განათლება — შშმ მოსწავლეებისა და სწავლების გარემოს სტატისტიკური მიმოხილვა.",
      sliderHealthAbout:
        "ჯანდაცვა — სერვისებზე წვდომა და ჯანმრთელობასთან დაკავშირებული მაჩვენებლები.",
      sliderSocAbout:
        "სოციალური დაცვა — სოციალური პაკეტები, დახმარება და ცხოვრების ხარისხი.",
      sliderSportAbout:
        "სპორტი — პარალიმპიური მიმართულებები და სპორტული ჩართულობის მონაცემები.",
      sliderPdfLink: "დეტალური დოკუმენტი (PDF)",
      sliderPrev: "წინა სლაიდი",
      sliderNext: "შემდეგი სლაიდი",
    },
  },
  en: {
    translation: {
      portalTitle: "Statistical Portal on Persons with Disabilities",
      headerPortalTitle: "STATISTICAL PORTAL ON PERSONS WITH DISABILITIES",
      geoStatLogoAlt: "GeoStat logo",
      home: "Home",
      about: "About",
      statistics: "Statistics",
      services: "Services",
      mainStatistics: "MAIN STATISTICS",
      legislation: "LEGISLATION",
      links: "LINKS",
      glossary: "GLOSSARY",
      infographic: "INFOGRAPHIC",
      heroTitle: "Data that supports inclusive decisions",
      heroText:
        "The portal combines disability-related data to improve planning, monitoring, and transparency.",
      aboutTitle: "Why this portal",
      aboutText:
        "The platform supports government teams, researchers, and communities with reliable statistical information.",
      statisticsTitle: "Key indicators",
      statisticsText:
        "Use this page for indicators by age, gender, region, and service accessibility.",
      servicesTitle: "Available services",
      servicesText:
        "This section can provide a service catalog, guidance, and contact channels for support.",
      mainStatisticsText:
        "This section presents key country-level disability statistics and headline indicators.",
      legislationText:
        "This section includes core legal documents related to disability rights, support, and services.",
      linksText:
        "This section provides useful links to official sources, partner organizations, and additional resources.",
      glossaryText:
        "The glossary page explains key terms and definitions used throughout the portal.",
      infographicText:
        "The infographic page presents visual summaries to make statistical insights easier to understand.",
      fontSizeButton: "Font size",
      nightMode: "Night mode",
      dayMode: "Day mode",
      voiceEnabled: "Voice assistant is enabled",
      voiceDisabled: "Voice assistant is disabled",
      stopVoice: "Stop voice",
      voiceHint:
        "When you hover or click text, the system reads the related content aloud.",
      sliderEduAbout:
        "Education — headline statistics on students with disabilities and the learning environment.",
      sliderHealthAbout:
        "Healthcare — access to services and key health-related disability indicators.",
      sliderSocAbout:
        "Social protection — social packages, allowances, and quality-of-life measures.",
      sliderSportAbout:
        "Sport — Paralympic-related participation and sports inclusion data.",
      sliderPdfLink: "Full document (PDF)",
      sliderPrev: "Previous slide",
      sliderNext: "Next slide",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ka",
    supportedLngs: ["ka", "en"],
    detection: {
      order: ["path", "navigator"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
