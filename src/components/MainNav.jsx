import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function MainNav() {
  const { t } = useTranslation()
  const { language = 'ka' } = useParams()

  return (
    <nav className="main-nav">
      <NavLink to={`/${language}`}>{t('home')}</NavLink>
      <NavLink to={`/${language}/about`}>{t('about')}</NavLink>
      <NavLink to={`/${language}/statistics`}>{t('statistics')}</NavLink>
      <NavLink to={`/${language}/services`}>{t('services')}</NavLink>
    </nav>
  )
}
