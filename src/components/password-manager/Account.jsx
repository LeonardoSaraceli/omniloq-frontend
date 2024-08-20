import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import truncateString from './truncateString'

export default function Account() {
  const { theme, profile, showMenuAccount, setShowMenuAccount } = useContext(
    PasswordManagerContext
  )

  return (
    <div
      id="account"
      className={theme}
      onClick={() => setShowMenuAccount(!showMenuAccount)}
    >
      <FontAwesomeIcon icon={faUser} id="avatar" className={theme} />

      <span>{`${truncateString(
        `${profile.first_name} ${profile.last_name}`,
        13
      )}`}</span>

      <FontAwesomeIcon
        icon={showMenuAccount ? faAngleDown : faAngleUp}
        id="manage-account-icon"
      />
    </div>
  )
}
