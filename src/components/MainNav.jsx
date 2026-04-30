import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function MainNav() {
  const { t } = useTranslation()
  const { language = 'ka' } = useParams()

  return (
    <nav className="mb-5 flex flex-wrap gap-3">
      <NavLink
        to={`/${language}`}
        className={({ isActive }) =>
          `rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-slate-700 hover:bg-slate-100'
          }`
        }
      >
        {t('home')}
      </NavLink>
      <NavLink
        to={`/${language}/about`}
        className={({ isActive }) =>
          `rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-slate-700 hover:bg-slate-100'
          }`
        }
      >
        {t('about')}
      </NavLink>
      <NavLink
        to={`/${language}/statistics`}
        className={({ isActive }) =>
          `rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-slate-700 hover:bg-slate-100'
          }`
        }
      >
        {t('statistics')}
      </NavLink>
      <NavLink
        to={`/${language}/services`}
        className={({ isActive }) =>
          `rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive
              ? 'bg-blue-100 text-blue-700'
              : 'text-slate-700 hover:bg-slate-100'
          }`
        }
      >
        {t('services')}
      </NavLink>
    </nav>
  )
}
