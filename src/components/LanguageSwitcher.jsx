import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function LanguageSwitcher() {
  const { language = 'ka' } = useParams()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const setLanguage = (nextLang) => {
    if (nextLang === language) {
      return
    }

    const oldPrefix = `/${language}`
    const currentPath = window.location.pathname
    const suffix = currentPath.startsWith(oldPrefix)
      ? currentPath.slice(oldPrefix.length) || ''
      : ''

    i18n.changeLanguage(nextLang)
    navigate(`/${nextLang}${suffix || ''}`)
  }

  return (
    <div className="lang-switcher" data-no-tts="true">
      <button
        type="button"
        className={language === 'ka' ? 'active' : ''}
        onClick={() => setLanguage('ka')}
      >
        ქართული
      </button>
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
      >
        English
      </button>
    </div>
  )
}
