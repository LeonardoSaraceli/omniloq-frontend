import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function MenuAccount() {
  const { modalRef, setShowSettings, setShowManageAccount } = useContext(
    PasswordManagerContext
  )

  return (
    <div id="menu-account" ref={modalRef}>
      <span onClick={() => setShowManageAccount(true)}>Manage account</span>

      <div id="divisor"></div>

      <span onClick={() => setShowSettings(true)}>Settings</span>
    </div>
  )
}
