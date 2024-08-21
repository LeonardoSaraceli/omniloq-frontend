import { faCheck, faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function Settings() {
  const { theme, setTheme, setShowSettings } = useContext(
    PasswordManagerContext
  )

  const { t, handleChangeLanguage, currentLanguage } =
    useContext(TranslationContext)

  return (
    <div id="settings">
      <div id="nav-settings" className={theme}>
        <div className="nav" id={theme}>
          <FontAwesomeIcon
            icon={faGear}
            className="nav-settings-icon"
            id={theme}
          />

          <span className="headline">{t('general')}</span>
        </div>

        <div className="nav" id={theme} onClick={() => setShowSettings(false)}>
          <FontAwesomeIcon
            icon={faXmark}
            className="nav-settings-icon"
            id={theme}
          />

          <span className="headline">{t('close')}</span>
        </div>
      </div>

      <div id="display-settings" className={theme}>
        <div id="theme">
          <span className="headline">{t('theme')}</span>

          <div id="light">
            <div
              className={`checkbox ${theme === 'light' ? 'active' : null}`}
              onClick={() => (theme === 'light' ? null : setTheme('light'))}
            >
              {theme === 'light' ? (
                <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
              ) : null}
            </div>

            <span>{t('light')}</span>
          </div>

          <div id="dark">
            <div
              className={`checkbox ${theme === 'dark' ? 'active' : null}`}
              onClick={() => (theme === 'dark' ? null : setTheme('dark'))}
            >
              {theme === 'dark' ? (
                <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
              ) : null}
            </div>

            <span>{t('dark')}</span>
          </div>
        </div>

        <div id="language">
          <span className="headline">{t('language')}</span>

          <div id="en">
            <div
              className={`checkbox ${
                currentLanguage === 'en' ? 'active' : null
              }`}
              onClick={() =>
                currentLanguage === 'en' ? null : handleChangeLanguage()
              }
            >
              {currentLanguage === 'en' ? (
                <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
              ) : null}
            </div>

            <span>English</span>
          </div>

          <div id="pt">
            <div
              className={`checkbox ${
                currentLanguage === 'pt' ? 'active' : null
              }`}
              onClick={() =>
                currentLanguage === 'pt' ? null : handleChangeLanguage()
              }
            >
              {currentLanguage === 'pt' ? (
                <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
              ) : null}
            </div>

            <span>Português</span>
          </div>
        </div>
      </div>
    </div>
  )
}
