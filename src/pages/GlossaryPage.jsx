import { useTranslation } from 'react-i18next'

export default function GlossaryPage() {
  const { t } = useTranslation()

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">{t('glossary')}</h2>
      <p className="text-slate-700 dark:text-slate-300">{t('glossaryText')}</p>
    </section>
  )
}
