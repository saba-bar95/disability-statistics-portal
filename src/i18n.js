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
      glossaryAlphabetNav: "გლოსარიუმის ანბანი",
      glossaryLoadError: "გლოსარიუმის ჩატვირთვა ვერ მოხერხდა",
      glossaryLetterEmpty: "გლოსარიუმი არ არის ასოზე «{{letter}}»",
      glossaryFilterByLetter: "გლოსარიუმი ასოზე «{{letter}}»",
      glossaryNoEntries: "გლოსარიუმის ჩანაწერები ვერ მოიძებნა",
      glossaryRefresh: "განახლება",
      infographicText:
        "ინფოგრაფიკის გვერდზე განთავსდება ვიზუალური მასალები, რომლებიც მონაცემებს მარტივად აღსაქმელს ხდის.",
      educationPageText:
        "ამ გვერდზე განთავსდება განათლებასთან დაკავშირებული ძირითადი სტატისტიკური ინფორმაცია შშმ პირებისთვის.",
      healthcarePageText:
        "ამ გვერდზე განთავსდება ჯანმრთელობის დაცვისა და სერვისებზე ხელმისაწვდომობის მაჩვენებლები.",
      socialSecurityPageText:
        "ამ გვერდზე განთავსდება სოციალური უზრუნველყოფის, კეთილდღეობისა და უსაფრთხოების მაჩვენებლები.",
      sportPageText:
        "ამ გვერდზე განთავსდება სპორტთან დაკავშირებული სტატისტიკური ინფორმაცია და ინდიკატორები.",
      fontSizeButton: "ფონტის ზომა",
      nightMode: "ღამის რეჟიმი",
      dayMode: "დღის რეჟიმი",
      voiceEnabled: "ხმოვანი ასისტენტი ჩართულია",
      voiceDisabled: "ხმოვანი ასისტენტი გამორთულია",
      stopVoice: "ხმის გაჩერება",
      voiceHint:
        "ტექსტზე მაუსის მიტანისას ან დაკლიკებისას სისტემა ხმამაღლა წაიკითხავს კონტენტს.",
      sliderEduAbout: "განათლება",
      sliderHealthAbout: "ჯანმრთელობის დაცვა",
      sliderSocAbout: "სოციალური უზრუნველყოფა, კეთილდღეობა, უსაფრთხოება",
      sliderSportAbout: "სპორტი",
      sliderPdfLink: "ინფოგრაფიკა",
      closePdfModal: "დახურვა",
      sliderPrev: "წინა სლაიდი",
      sliderNext: "შემდეგი სლაიდი",
      footerContactTitle: "საკონტაქტო ინფორმაცია",
      footerOrganization: "საქართველოს სტატისტიკის ეროვნული სამსახური",
      footerPhones: "(+995 32) 236 72 10, (+995 32) 260 11 60",
      footerEmail: "info@geostat.ge",
      footerAddress: "ცოტნე დადიანის ქ. 30, თბილისი, 0180",
      footerSocialNetworks: "სოციალური ქსელები",
      footerMenu: "მენიუ",
      footerUsefulLinks: "სასარგებლო ბმულები",
      footerTerms: "მონაცემთა გამოყენების პირობები",
      footerRights: "ყველა უფლება დაცულია © საქსტატი 2026",
      footerSupport:
        "პორტალი შეიქმნა გაეროს ბავშვთა ფონდის (UNICEF) ტექნიკური და ფინანსური მხარდაჭერით",
      legislationItems: [
        "შეზღუდული შესაძლებლობის მქონე პირთა უფლებების კონვენცია",
        "საქართველოს კანონი სოციალური დახმარების შესახებ",
        "საქართველოს კანონი სოციალური მუშაობის შესახებ",
        "საქართველოს კანონი შეზღუდული შესაძლებლობის მქონე პირთა უფლებების შესახებ",
        "საქართველოს კანონი სამედიცინო-სოციალური ექსპერტიზის შესახებ",
        "ბავშვის უფლებათა კოდექსი",
        "ადგილობრივი თვითმმართველობის კოდექსი",
        "საქართველოს კანონი დასაქმების ხელშეწყობის შესახებ",
        "საქართველოს შრომის, ჯანმრთელობისა და სოციალური დაცვის მინისტრის ბრძანება №62/ნ",
        "საქართველოს შრომის, ჯანმრთელობისა და სოციალური დაცვის მინისტრის ბრძანება №1/ნ",
      ],
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
      glossaryAlphabetNav: "Glossary alphabet",
      glossaryLoadError: "Could not load glossary",
      glossaryLetterEmpty: "No glossary entries for “{{letter}}”",
      glossaryFilterByLetter: "Glossary entries for “{{letter}}”",
      glossaryNoEntries: "No glossary entries found",
      glossaryRefresh: "Refresh",
      infographicText:
        "The infographic page presents visual summaries to make statistical insights easier to understand.",
      educationPageText:
        "This page presents key disability-related statistics and indicators for education.",
      healthcarePageText:
        "This page presents indicators on healthcare and accessibility of health services.",
      socialSecurityPageText:
        "This page presents indicators on social security, well-being, and safety.",
      sportPageText:
        "This page presents disability-related statistics and indicators for sport.",
      fontSizeButton: "Font size",
      nightMode: "Night mode",
      dayMode: "Day mode",
      voiceEnabled: "Voice assistant is enabled",
      voiceDisabled: "Voice assistant is disabled",
      stopVoice: "Stop voice",
      voiceHint:
        "When you hover or click text, the system reads the related content aloud.",
      sliderEduAbout: "Education",
      sliderHealthAbout: "HEALTHCARE",
      sliderSocAbout: "SOCIAL SECURITY, WELL-BEING AND SAFETY",
      sliderSportAbout: "SPORT",
      sliderPdfLink: "Infographic",
      closePdfModal: "Close",
      sliderPrev: "Previous slide",
      sliderNext: "Next slide",
      footerContactTitle: "CONTACT INFORMATION",
      footerOrganization: "National Statistics Office of Georgia",
      footerPhones: "(+995 32) 236 72 10, (+995 32) 260 11 60",
      footerEmail: "info@geostat.ge",
      footerAddress: "30, Tsotne Dadiani Str., 0180, Tbilisi, Georgia",
      footerSocialNetworks: "SOCIAL NETWORKS",
      footerMenu: "MENU",
      footerUsefulLinks: "LINKS",
      footerTerms: "TERMS OF USE",
      footerRights: "All rights reserved © Geostat 2026",
      footerSupport:
        "The portal was developed with the financial and technical support of the United Nations Children's Fund (UNICEF)",
      legislationItems: [
        "CONVENTION ON THE RIGHTS OF PERSONS WITH DISABILITIES (CRPD)",
        "LAW OF GEORGIA ON SOCIAL ASSISTANCE",
        "LAW OF GEORGIA ON SOCIAL WORK",
        "LAW OF GEORGIA ON THE RIGHTS OF PERSONS WITH DISABILITIES",
        "LAW OF GEORGIA ON MEDICAL AND SOCIAL EXAMINATION",
        "THE CODE ON THE RIGHTS OF THE CHILD",
        "CODE OF GEORGIA ON LOCAL SELF-GOVERNMENT",
        "LAW OF GEORGIA ON FACILITATING EMPLOYMENT",
        "ORDER OF THE MINISTER OF LABOUR, HEALTH AND SOCIAL PROTECTION OF GEORGIA NO. 62/N ON THE APPROVAL OF THE INSTRUCTION ON THE PROCEDURE FOR DETERMINING THE STATUS OF DISABILITY",
        "ORDER OF THE MINISTER OF LABOUR, HEALTH AND SOCIAL PROTECTION OF GEORGIA NO. 1/N ON THE APPROVAL OF THE INSTRUCTION ON THE PROCEDURE FOR DETERMINING THE STATUS OF DISABILITY",
      ],
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
