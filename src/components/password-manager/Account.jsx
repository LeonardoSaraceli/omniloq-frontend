import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import truncateString from './truncateString'

export default function Account() {
  const { profile, showMenuAccount, setShowMenuAccount } = useContext(
    PasswordManagerContext
  )

  return (
    <div id="account" onClick={() => setShowMenuAccount(!showMenuAccount)}>
      <FontAwesomeIcon icon={faUser} id="avatar" />

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
