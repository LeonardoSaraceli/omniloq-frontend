import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function MenuAccount() {
  const { setShowSettings } = useContext(PasswordManagerContext)

  return (
    <div id="menu-account">
      <span>Manage account</span>

      <div id="divisor"></div>

      <span onClick={() => setShowSettings(true)}>Settings</span>
    </div>
  )
}
