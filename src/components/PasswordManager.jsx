import Auth from '../middlewares/Auth'
import PasswordManagerAside from './password-manager/PasswordManagerAside'
import PasswordManagerMain from './password-manager/PasswordManagerMain'

export default function PasswordManager() {
  return (
    <Auth>
      <PasswordManagerAside />

      <PasswordManagerMain />
    </Auth>
  )
}
