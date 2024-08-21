import { faBug, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function PasswordManagerHeader() {
  const { theme, setShowCreateTicket, setShowCreateItem } = useContext(
    PasswordManagerContext
  )

  const { t } = useContext(TranslationContext)

  return (
    <header id="password-manager-main-header" className={theme}>
      <FontAwesomeIcon
        icon={faBug}
        id="bug"
        className={theme}
        onClick={() => setShowCreateTicket(true)}
      />

      <button className={theme} onClick={() => setShowCreateItem(true)}>
        <FontAwesomeIcon icon={faPlus} id="header-icon" />

        <span>{t('new-item')}</span>
      </button>
    </header>
  )
}
