import { useContext } from 'react'
import firstImage from '../../assets/images/first-section-img.png'
import { TranslationContext } from '../App'

export default function FirstSection() {
  const { t } = useContext(TranslationContext)

  return (
    <section id="first-section">
      <article>
        <h1>{t('first-section-h1')}</h1>

        <p>{t('first-section-p')}</p>

        <a href="/welcome" id="welcome">
          <span>{t('try-it-out')}</span>
        </a>
      </article>

      <img src={firstImage} alt={t('first-section-alt-img')} />
    </section>
  )
}
