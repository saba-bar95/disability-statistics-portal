import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <section className="card">
      <h2>{t('aboutTitle')}</h2>
      <p>{t('aboutText')}</p>
    </section>
  )
}
