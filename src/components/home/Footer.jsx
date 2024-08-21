import { useContext, useState } from 'react'
import { TranslationContext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const { handleChangeLanguage, currentLanguage } =
    useContext(TranslationContext)

  const [showLanguages, setShowLanguages] = useState(false)

  return (
    <footer>
      <div id="languages" onClick={() => setShowLanguages(!showLanguages)}>
        <span id="select">
          {currentLanguage === 'en' ? 'English' : 'Português'}

          <FontAwesomeIcon icon={showLanguages ? faAngleUp : faAngleDown} />
        </span>

        {showLanguages && (
          <span id="option" onClick={handleChangeLanguage}>
            {currentLanguage === 'en' ? 'Português' : 'English'}
          </span>
        )}
      </div>

      <a href="/">
        <h1>Omniloq</h1>
      </a>
    </footer>
  )
}
