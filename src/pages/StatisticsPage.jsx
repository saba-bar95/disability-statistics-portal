import { useTranslation } from 'react-i18next'

export default function StatisticsPage() {
  const { t } = useTranslation()

  return (
    <section className="card">
      <h2>{t('statisticsTitle')}</h2>
      <p>{t('statisticsText')}</p>
    </section>
  )
}
