import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Account() {
  return (
    <div id="account">
      <FontAwesomeIcon icon={faUser} id="avatar" />

      <span>Leonardo Lodi</span>

      <FontAwesomeIcon icon={faAngleDown} id="manage-account-icon" />
    </div>
  )
}
