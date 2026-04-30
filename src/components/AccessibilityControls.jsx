import { useTranslation } from 'react-i18next'

export default function AccessibilityControls({ isEnabled, setIsEnabled, stop }) {
  const { t } = useTranslation()

  return (
    <section className="voice-controls" data-no-tts="true">
      <button type="button" onClick={() => setIsEnabled(!isEnabled)}>
        {isEnabled ? t('voiceEnabled') : t('voiceDisabled')}
      </button>
      <button type="button" onClick={stop}>
        {t('stopVoice')}
      </button>
      <p>{t('voiceHint')}</p>
    </section>
  )
}
