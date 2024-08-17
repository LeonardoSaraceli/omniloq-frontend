import { faBug, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function PasswordManagerHeader() {
  const { setShowCreateItem } = useContext(PasswordManagerContext)

  return (
    <header id="password-manager-main-header">
      <FontAwesomeIcon icon={faBug} id="bug" />

      <button onClick={() => setShowCreateItem(true)}>
        <FontAwesomeIcon icon={faPlus} id="header-icon" />

        <span>New item</span>
      </button>
    </header>
  )
}
