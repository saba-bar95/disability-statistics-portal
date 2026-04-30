import { useTranslation } from 'react-i18next'

export default function ServicesPage() {
  const { t } = useTranslation()

  return (
    <section className="card">
      <h2>{t('servicesTitle')}</h2>
      <p>{t('servicesText')}</p>
    </section>
  )
}
