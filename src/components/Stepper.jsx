/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import logoStepper from '../assets/images/logo-stepper.svg'
import '../assets/styles/Stepper.css'
import { TranslationContext } from './App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function Stepper({ children }) {
  const { handleChangeLanguage, currentLanguage } =
    useContext(TranslationContext)

  const [showLanguages, setShowLanguages] = useState(false)

  return (
    <main id="stepper">
      <a href="/" id="logo-stepper">
        <img src={logoStepper} alt="Omniloq logo" />
      </a>

      <aside>
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
      </aside>

      {children}
    </main>
  )
}
