import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  ka: {
    translation: {
      portalTitle: "შშმ პირთა სტატისტიკის პორტალი",
      headerPortalTitle: "შშმ პირთა სტატისტიკის პორტალი",
      geoStatLogoAlt: "საქსტატის ლოგო",
      home: "მთავარი",
      mainStatistics: "სტატისტიკური ინფორმაცია",
      legislation: "კანონმდებლობა",
      links: "ბმულები",
      glossary: "გლოსარიუმი",
      infographic: "ინფოგრაფიკა",
      glossaryAlphabetNav: "გლოსარიუმის ანბანი",
      glossaryLoading: "გლოსარიუმი იტვირთება…",
      glossaryLoadError: "გლოსარიუმის ჩატვირთვა ვერ მოხერხდა",
      routeLoading: "გვერდი იტვირთება…",
      chartLoading: "გრაფიკი იტვირთება…",
      glossaryLetterEmpty: "გლოსარიუმი არ არის ასოზე «{{letter}}»",
      glossaryFilterByLetter: "გლოსარიუმი ასოზე «{{letter}}»",
      glossaryNoEntries: "გლოსარიუმის ჩანაწერები ვერ მოიძებნა",
      glossaryRefresh: "განახლება",
      fontSizeButton: "ფონტის ზომა",
      nightMode: "ღამის რეჟიმი",
      dayMode: "დღის რეჟიმი",
      voiceEnabled: "ხმოვანი ასისტენტი ჩართულია",
      voiceDisabled: "ხმოვანი ასისტენტი გამორთულია",
      sliderEduAbout: "განათლება",
      sliderHealthAbout: "ჯანმრთელობის დაცვა",
      sliderSocAbout: "სოციალური უზრუნველყოფა, კეთილდღეობა, უსაფრთხოება",
      sliderSportAbout: "სპორტი",
      sectorRecordsTitleHealthcare: "ჯანმრთელობის დაცვის სტატისტიკა",
      sectorRecordsTitleEducation: "განათლების სტატისტიკა",
      sectorRecordsTitleSport: "სპორტის სტატისტიკა",
      sectorRecordsTitleSocialSecurity:
        "სოციალური უზრუნველყოფა, კეთილდღეობა, უსაფრთხოება",
      sectorRecordsLoading: "მონაცემები იტვირთება…",
      sectorRecordsLoadError:
        "ჩანაწერების ჩატვირთვა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.",
      sectorRecordsSelectSource:
        "ჩანაწერების სანახავად აირჩიეთ მინიმუმ ერთი მონაცემთა წყარო.",
      sectorRecordsSummary:
        "{{count}} ჩანაწერი · {{selected}} / {{total}} ქვეკატეგორია არჩეულია",
      sectorSubcat_fallback: "ქვეკატეგორია {{id}}",
      sectorSubcat_healthcare_1:
        "საქართველოს ოკუპირებული ტერიტორიებიდან დევნილთა, შრომის, ჯანმრთელობისა და სოციალური დაცვის სამინისტრო",
      sectorSubcat_healthcare_2: "მოსახლეობის 2014 წლის საყოველთაო აღწერა",
      sectorSubcat_healthcare_3:
        "მრავალინდიკატორული კლასტერული კვლევა (MICS) 2018",
      sectorSubcat_education_1:
        "განათლების, მეცნიერებისა და ახალგაზრდობის სამინისტრო",
      sectorSubcat_education_2:
        "მრავალინდიკატორული კლასტერული კვლევა (MICS) 2018",
      sectorSubcat_education_3:
        "საქართველოს ოკუპირებული ტერიტორიებიდან დევნილთა, შრომის, ჯანმრთელობისა და სოციალური დაცვის სამინისტრო",
      sectorSubcat_social_security_1:
        "საქართველოს ოკუპირებული ტერიტორიებიდან დევნილთა, შრომის, ჯანმრთელობისა და სოციალური დაცვის სამინისტრო",
      sectorSubcat_social_security_2: "მოსახლეობის 2014 წლის საყოველთაო აღწერა",
      sectorSubcat_social_security_3:
        "მრავალინდიკატორული კლასტერული კვლევა (MICS) 2018",
      sectorSubcat_sport_1: "საქართველოს კულტურისა და სპორტის სამინისტრო",
      sectorSubcatFilterGroup: "ფილტრი წყაროთი მონაცემებით",
      sectorRecordDownload: "ფაილის ჩამოტვირთვა",
      sectorRecordToggleChart: "გრაფიკის ჩვენება",
      sectorRecordToggleChartHide: "გრაფიკის დამალვა",
      sectorRecordChartType: "დიაგრამის ტიპი",
      sectorRecordChartBar: "სვეტოვანი დიაგრამა",
      sectorRecordChartLine: "შეხაზებითი დიაგრამა",
      chartUnit_persons: "ერთეული",
      chartUnit_thousandGel: "ათასი ლარი",
      healthcareChartTitle_4:
        "შშმ პირების რიცხოვნობა, რომელთაც ჯანმრთელობის დაცვის სახელმწიფო პროგრამის ფარგლებში გაიტანეს მედიკამენტი,\nსქესის მიხედვით",
      healthcareChartTitle_5:
        "ჯანმრთელობის დაცვის სახელმწიფო პროგრამის ფარგლებში შშმ პირებზე გაცემული მედიკამენტების ღირებულება\nსქესის მიხედვით,",
      healthcareChartTitle_6:
        "ფსიქიკური ჯანმრთელობის დაცვის სახელმწიფო პროგრამით შშმ პირებისთვის დაფინანსებული შემთხვევების/მომსახურებების რაოდენობა, სქესის მიხედვით",
      healthcareChartTitle_7:
        "ჯანმრთელობის დაცვის სახელმწიფო პროგრამებით შშმ პირებისთვის დაფინანსებული შემთხვევების/მომსახურების რაოდენობა\nსქესის მიხედვით",
      healthcareChartTitle_8:
        "ჯანმრთელობის დაცვის სახელმწიფო პროგრამების ფარგლებში დაფინანსებული შშმ პირების რიცხოვნობა\nსქესის მიხედვით",
      socialSecurityChartTitle_82:
        "სოციალური პაკეტის მიმღები შშმ პირების რიცხოვნობა სქესის მიხედვით",
      socialSecurityChartTitle_83:
        "სოციალური პაკეტის მიმღები შშმ პირების რიცხოვნობა",
      socialSecurityChartTitle_84:
        "დევნილის სტატუსის მქონე სოციალური პაკეტის მიმღები შშმ პირების რიცხოვნობა",
      socialSecurityChartTitle_85:
        "მიზნობრივი სოციალური დახმარების პროგრამის მონაცემთა ერთიან ბაზაში რეგისტრირებული შშმ პირების რიცხოვნობა",
      socialSecurityChartTitle_86:
        "მიზნობრივი სოციალური დახმარების პროგრამის მონაცემთა ერთიან ბაზაში რეგისტრირებული, საარსებო შემწეობის მიმღები შშმ პირების რიცხოვნობა",
      sportChartTitle_127:
        "პარალიმპიურ სახეობებში აღებული მედალების რაოდენობა სპორტსმენების სქესის მიხედვით",
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
      portalTitle: "Disability Statistics Portal",
      headerPortalTitle: "Disability Statistics Portal",
      geoStatLogoAlt: "GeoStat logo",
      home: "Home",
      mainStatistics: "MAIN STATISTICS",
      legislation: "LEGISLATION",
      links: "LINKS",
      glossary: "GLOSSARY",
      infographic: "INFOGRAPHIC",
      glossaryAlphabetNav: "Glossary alphabet",
      glossaryLoading: "Loading glossary…",
      glossaryLoadError: "Could not load glossary",
      routeLoading: "Loading page…",
      chartLoading: "Loading chart…",
      glossaryLetterEmpty: "No glossary entries for “{{letter}}”",
      glossaryFilterByLetter: "Glossary entries for “{{letter}}”",
      glossaryNoEntries: "No glossary entries found",
      glossaryRefresh: "Refresh",
      fontSizeButton: "Font size",
      nightMode: "Night mode",
      dayMode: "Day mode",
      voiceEnabled: "Voice assistant is enabled",
      voiceDisabled: "Voice assistant is disabled",
      sliderEduAbout: "Education",
      sliderHealthAbout: "HEALTHCARE",
      sliderSocAbout: "SOCIAL SECURITY, WELL-BEING AND SAFETY",
      sliderSportAbout: "SPORT",
      sectorRecordsTitleHealthcare: "Healthcare Statistics",
      sectorRecordsTitleEducation: "Education Statistics",
      sectorRecordsTitleSport: "Sport statistics",
      sectorRecordsTitleSocialSecurity:
        "SOCIAL SECURITY, WELL-BEING AND SAFETY",
      sectorRecordsLoading: "Loading data…",
      sectorRecordsLoadError: "Could not load records. Please try again later.",
      sectorRecordsSelectSource:
        "Select at least one data source to view records.",
      sectorRecordsSummary:
        "{{count}} records · {{selected}} / {{total}} subcategories selected",
      sectorSubcat_fallback: "Subcategory {{id}}",
      sectorSubcat_healthcare_1:
        "Ministry of Internally Displaced Persons from The Occupied Territories, Labour, Health and Social Affairs of Georgia",
      sectorSubcat_healthcare_2: "2014 GENERAL POPULATION CENSUS",
      sectorSubcat_healthcare_3:
        "Multiple Indicator Cluster Survey (MICS) 2018",
      sectorSubcat_education_1: "Ministry of Education and Science of Georgia",
      sectorSubcat_education_2: "Multiple Indicator Cluster Survey (MICS) 2018",
      sectorSubcat_education_3:
        "Ministry of Internally Displaced Persons from The Occupied Territories, Labour, Health and Social Affairs of Georgia",
      sectorSubcat_social_security_1:
        "Ministry of Internally Displaced Persons from The Occupied Territories, Labour, Health and Social Affairs of Georgia",
      sectorSubcat_social_security_2: "2014 GENERAL POPULATION CENSUS",
      sectorSubcat_social_security_3:
        "Multiple Indicator Cluster Survey (MICS) 2018",
      sectorSubcat_sport_1: "Ministry of Culture, Sport and Youth of Georgia",
      sectorSubcatFilterGroup: "Filter by data source",
      sectorRecordDownload: "Download file",
      sectorRecordToggleChart: "Show chart",
      sectorRecordToggleChartHide: "Hide chart",
      sectorRecordChartType: "Chart type",
      sectorRecordChartBar: "Bar chart",
      sectorRecordChartLine: "Line chart",
      chartUnit_persons: "persons",
      chartUnit_thousandGel: "thousand GEL",
      healthcareChartTitle_4:
        "The number of persons with disabilities who benefited medication within the framework of the state health care program\nby sex",
      healthcareChartTitle_5:
        "The cost of medicines given to disabled people within the framework of the state health care program\nby sex",
      healthcareChartTitle_6:
        "Number of cases/services funded by mental health care state program for persons with disabilities\nby sex",
      healthcareChartTitle_7:
        "Number of cases/services funded by state health care programs for persons with disabilities\nby sex",
      healthcareChartTitle_8:
        "The number of persons with disabilities financed within the framework of state health care programs\nby sex",
      socialSecurityChartTitle_82:
        "Persons with disabilities receiving the social package by sex",
      socialSecurityChartTitle_83:
        "Persons with disabilities receiving the social package",
      socialSecurityChartTitle_84:
        "Number of Internaly displaced Disability Persons receiving social package",
      socialSecurityChartTitle_85:
        "Persons with disabilities registered in the Unified database of targeted social assistance program",
      socialSecurityChartTitle_86:
        "Disabilitie persons, registered in the Unified database of targeted social assistance program, receiving subsistence allowance",
      sportChartTitle_127:
        "Number of Medals won in Paralympic Sports by Age and Sex of Sportsmen",
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
