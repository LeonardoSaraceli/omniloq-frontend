import { useContext } from 'react'
import firstImage from '../../assets/images/first-image-li.png'
import secondImage from '../../assets/images/second-image-li.png'
import thirdImage from '../../assets/images/third-image-li.png'
import { TranslationContext } from '../App'

export default function SecondSection() {
  const { t } = useContext(TranslationContext)

  return (
    <section id="second-section">
      <h1>{t('second-section-h1')}</h1>

      <ul>
        <li>
          <h2>{t('first-li-h2-second-section')}</h2>

          <img src={firstImage} alt={t('first-li-alt-img-second-section')} />

          <p>{t('first-li-p-second-section')}</p>
        </li>

        <li>
          <h2>{t('second-li-h2-second-section')}</h2>

          <img src={secondImage} alt={t('second-li-alt-img-second-section')} />

          <p>{t('second-li-p-second-section')}</p>
        </li>

        <li>
          <h2>{t('third-li-h2-second-section')}</h2>

          <img src={thirdImage} alt={t('third-li-alt-img-second-section')} />

          <p>{t('third-li-p-second-section')}</p>
        </li>
      </ul>
    </section>
  )
}
