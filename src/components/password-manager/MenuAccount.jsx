import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function MenuAccount() {
  const { setShowSettings, setShowManageAccount } = useContext(
    PasswordManagerContext
  )

  return (
    <div id="menu-account">
      <span onClick={() => setShowManageAccount(true)}>Manage account</span>

      <div id="divisor"></div>

      <span onClick={() => setShowSettings(true)}>Settings</span>
    </div>
  )
}
