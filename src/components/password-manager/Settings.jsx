import { faCheck, faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function Settings() {
  const { theme, setTheme, language, setLanguage, setShowSettings } =
    useContext(PasswordManagerContext)

  return (
    <div id="settings">
      <div id="nav-settings" className={theme}>
        <div className="nav" id={theme}>
          <FontAwesomeIcon
            icon={faGear}
            className="nav-settings-icon"
            id={theme}
          />

          <span className="headline">General</span>
        </div>

        <div className="nav" id={theme} onClick={() => setShowSettings(false)}>
          <FontAwesomeIcon
            icon={faXmark}
            className="nav-settings-icon"
            id={theme}
          />

          <span className="headline">Close</span>
        </div>
      </div>

      <div id="display-settings" className={theme}>
        <div id="theme">
          <span className="headline">Theme</span>

          <div id="light">
            <div
              className={`checkbox ${theme === 'light' ? 'active' : null}`}
              onClick={() => (theme === 'light' ? null : setTheme('light'))}
            >
              {theme === 'light' ? (
                <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
              ) : null}
            </div>

            <span>Light</span>
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

            <span>Dark</span>
          </div>
        </div>

        <div id="language">
          <span className="headline">Language</span>

          <div id="en">
            <div
              className={`checkbox ${language === 'en' ? 'active' : null}`}
              onClick={() => (language === 'en' ? null : setLanguage('en'))}
            >
              {language === 'en' ? (
                <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
              ) : null}
            </div>

            <span>English</span>
          </div>

          <div id="pt">
            <div
              className={`checkbox ${language === 'pt' ? 'active' : null}`}
              onClick={() => (language === 'pt' ? null : setLanguage('pt'))}
            >
              {language === 'pt' ? (
                <FontAwesomeIcon icon={faCheck} className="checkbox-icon" />
              ) : null}
            </div>

            <span>Portuguese</span>
          </div>
        </div>
      </div>
    </div>
  )
}
