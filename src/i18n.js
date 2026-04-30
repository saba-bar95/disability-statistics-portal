import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  ka: {
    translation: {
      portalTitle: 'შეზღუდული შესაძლებლობის მქონე პირთა სტატისტიკური პორტალი',
      home: 'მთავარი',
      about: 'პორტალის შესახებ',
      statistics: 'სტატისტიკა',
      services: 'სერვისები',
      heroTitle: 'მონაცემები, რომლებიც აძლიერებს ინკლუზიურ გადაწყვეტილებებს',
      heroText:
        'პორტალი აერთიანებს მონაცემებს შეზღუდული შესაძლებლობის მქონე პირების შესახებ, რათა დაგეგმვა და მონიტორინგი იყოს უფრო ზუსტი და გამჭვირვალე.',
      aboutTitle: 'რატომ ეს პორტალი',
      aboutText:
        'პლატფორმა მხარს უჭერს სახელმწიფო სტრუქტურებს, მკვლევრებს და საზოგადოებას სანდო სტატისტიკური მონაცემებით.',
      statisticsTitle: 'ძირითადი მაჩვენებლები',
      statisticsText:
        'აქ შეიძლება განთავსდეს ასაკის, სქესის, რეგიონისა და სერვისებზე წვდომის მიხედვით გაშლილი მაჩვენებლები.',
      servicesTitle: 'ხელმისაწვდომი სერვისები',
      servicesText:
        'გვერდი შეიცავს სერვისების კატალოგს, გზამკვლევს, და საკონტაქტო ინფორმაციას მხარდაჭერისთვის.',
      voiceEnabled: 'ხმოვანი ასისტენტი ჩართულია',
      voiceDisabled: 'ხმოვანი ასისტენტი გამორთულია',
      stopVoice: 'ხმის გაჩერება',
      voiceHint: 'ტექსტზე მაუსის მიტანისას ან დაკლიკებისას სისტემა ხმამაღლა წაიკითხავს კონტენტს.',
    },
  },
  en: {
    translation: {
      portalTitle: 'Statistical Portal on Persons with Disabilities',
      home: 'Home',
      about: 'About',
      statistics: 'Statistics',
      services: 'Services',
      heroTitle: 'Data that supports inclusive decisions',
      heroText:
        'The portal combines disability-related data to improve planning, monitoring, and transparency.',
      aboutTitle: 'Why this portal',
      aboutText:
        'The platform supports government teams, researchers, and communities with reliable statistical information.',
      statisticsTitle: 'Key indicators',
      statisticsText:
        'Use this page for indicators by age, gender, region, and service accessibility.',
      servicesTitle: 'Available services',
      servicesText:
        'This section can provide a service catalog, guidance, and contact channels for support.',
      voiceEnabled: 'Voice assistant is enabled',
      voiceDisabled: 'Voice assistant is disabled',
      stopVoice: 'Stop voice',
      voiceHint:
        'When you hover or click text, the system reads the related content aloud.',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ka',
    supportedLngs: ['ka', 'en'],
    detection: {
      order: ['path', 'navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
