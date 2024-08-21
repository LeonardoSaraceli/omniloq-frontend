import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { TranslationContext } from '../App'

export default function ThirdSection() {
  const { t } = useContext(TranslationContext)

  const [showFirstMessage, setShowFirstMessage] = useState(false)
  const [showSecondMessage, setShowSecondMessage] = useState(false)
  const [showThirdMessage, setShowThirdMessage] = useState(false)
  const [showFourthMessage, setShowFourthMessage] = useState(false)

  const handleMessageDisplay = (message, setMessage) => {
    return () => setMessage(!message)
  }

  return (
    <section id="third-section">
      <h1>{t('third-section-faq')}</h1>

      <article>
        <div className={showFirstMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showFirstMessage,
              setShowFirstMessage
            )}
          >
            <span>{t('third-section-first-span')}</span>

            <FontAwesomeIcon
              icon={showFirstMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showFirstMessage && <p>{t('third-section-first-p')}</p>}

          <div className="bottom-div"></div>
        </div>

        <div className={showSecondMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showSecondMessage,
              setShowSecondMessage
            )}
          >
            <span>{t('third-section-second-span')}</span>

            <FontAwesomeIcon
              icon={showSecondMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showSecondMessage && <p>{t('third-section-second-p')}</p>}

          <div className="bottom-div"></div>
        </div>

        <div className={showThirdMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showThirdMessage,
              setShowThirdMessage
            )}
          >
            <span>{t('third-section-third-span')}</span>

            <FontAwesomeIcon
              icon={showThirdMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showThirdMessage && <p>{t('third-section-third-p')}</p>}

          <div className="bottom-div"></div>
        </div>

        <div className={showFourthMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showFourthMessage,
              setShowFourthMessage
            )}
          >
            <span>{t('third-section-fourth-span')}</span>

            <FontAwesomeIcon
              icon={showFourthMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showFourthMessage && <p>{t('third-section-fourth-p')}</p>}

          <div className="bottom-div"></div>
        </div>
      </article>
    </section>
  )
}
