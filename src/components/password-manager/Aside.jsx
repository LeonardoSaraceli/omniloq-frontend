import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import Account from './Account'
import Nav from './Nav'
import MenuAccount from './MenuAccount'

export default function PasswordManagerAside() {
  const { showMenuAccount, theme } = useContext(PasswordManagerContext)

  return (
    <aside id="password-manager-aside" className={theme}>
      <Account />

      {showMenuAccount && <MenuAccount />}

      <Nav />
    </aside>
  )
}
