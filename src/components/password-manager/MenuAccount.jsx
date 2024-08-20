import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function MenuAccount() {
  const { theme, modalRef, setShowSettings, setShowManageAccount } = useContext(
    PasswordManagerContext
  )

  return (
    <div id="menu-account" ref={modalRef}>
      <span className={theme} onClick={() => setShowManageAccount(true)}>
        Manage account
      </span>

      <div id="divisor"></div>

      <span className={theme} onClick={() => setShowSettings(true)}>
        Settings
      </span>
    </div>
  )
}
