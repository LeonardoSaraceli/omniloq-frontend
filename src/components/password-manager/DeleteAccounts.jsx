import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { useNavigate } from 'react-router-dom'
import { TranslationContext } from '../App'

export default function DeleteAccount() {
  const { theme, token, setShowDeleteAccount } = useContext(
    PasswordManagerContext
  )

  const { t } = useContext(TranslationContext)

  const navigate = useNavigate()

  const handleDeleteAccount = () => {
    fetch('http://localhost:3030/users/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 404) {
        return
      }

      localStorage.clear()

      navigate('/')
    })
  }

  return (
    <div id="delete-account" className={theme}>
      <span>{t('action-irreversible')}</span>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowDeleteAccount(false)}>
          {t('cancel')}
        </button>

        <button id="delete" onClick={handleDeleteAccount}>
          {t('delete')}
        </button>
      </div>
    </div>
  )
}
