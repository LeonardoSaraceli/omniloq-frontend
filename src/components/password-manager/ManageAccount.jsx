import {
  faInfo,
  faLock,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PasswordManagerContext } from '../PasswordManager'
import { useContext, useState } from 'react'

export default function ManageAccount() {
  const [showMain, setShowMain] = useState('profile')

  const {
    theme,
    user,
    profile,
    setShowManageAccount,
    setShowEditProfile,
    setShowDeleteAccount,
  } = useContext(PasswordManagerContext)

  const dateObj = new Date(user.created_at)

  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getUTCDate().toString().padStart(2, '0')
  const year = dateObj.getUTCFullYear().toString().slice(-2)

  const formattedDate = `${month}/${day}/${year}`

  return (
    <div id="manage-account">
      <aside className={theme}>
        <ul>
          <li className={theme} onClick={() => setShowMain('profile')}>
            <FontAwesomeIcon icon={faUser} className="icon" id={theme} />

            <span>Profile</span>
          </li>

          <li className={theme} onClick={() => setShowMain('account')}>
            <FontAwesomeIcon icon={faInfo} className="icon" id={theme} />

            <span>Account</span>
          </li>

          <li className={theme} onClick={() => setShowManageAccount(false)}>
            <FontAwesomeIcon icon={faXmark} className="icon" id={theme} />

            <span>Close</span>
          </li>
        </ul>
      </aside>

      {showMain === 'profile' && (
        <main className={theme}>
          <h3>Details</h3>

          <div>
            <label htmlFor="first_name">First name</label>

            <figure>
              <input
                type="text"
                name="first_name"
                id="first_name"
                disabled
                value={profile.first_name}
              />

              <FontAwesomeIcon icon={faLock} className="disabled-icon" />
            </figure>
          </div>

          <div>
            <label htmlFor="last_name">Last name</label>

            <figure>
              <input
                type="text"
                name="last_name"
                id="last_name"
                disabled
                value={profile.last_name}
              />

              <FontAwesomeIcon icon={faLock} className="disabled-icon" />
            </figure>
          </div>

          <button
            id="edit"
            className={theme}
            onClick={() => setShowEditProfile(true)}
          >
            Edit
          </button>
        </main>
      )}

      {showMain === 'account' && (
        <main className={theme}>
          <h3>Credentials</h3>

          <div>
            <label htmlFor="email">Email</label>

            <figure>
              <input
                type="text"
                name="email"
                id="email"
                disabled
                value={user.email}
              />

              <FontAwesomeIcon icon={faLock} className="disabled-icon" />
            </figure>
          </div>

          <div>
            <label htmlFor="created_at">Created at</label>

            <figure>
              <input
                type="text"
                name="created_at"
                id="created_at"
                disabled
                value={formattedDate}
              />

              <FontAwesomeIcon icon={faLock} className="disabled-icon" />
            </figure>
          </div>

          <button id="delete" onClick={() => setShowDeleteAccount(true)}>
            Delete
          </button>
        </main>
      )}
    </div>
  )
}
