import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import Account from './Account'
import Nav from './Nav'
import MenuAccount from './MenuAccount'

export default function PasswordManagerAside() {
  const { showMenuAccount } = useContext(PasswordManagerContext)

  return (
    <aside id="password-manager-aside">
      <Account />

      {showMenuAccount && <MenuAccount />}

      <Nav />
    </aside>
  )
}
