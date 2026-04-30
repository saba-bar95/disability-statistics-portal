import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <section className="card">
      <h2>{t('heroTitle')}</h2>
      <p>{t('heroText')}</p>
    </section>
  )
}
