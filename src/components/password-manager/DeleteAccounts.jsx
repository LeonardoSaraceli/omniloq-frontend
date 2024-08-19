import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { useNavigate } from 'react-router-dom'

export default function DeleteAccount() {
  const { token, setShowDeleteAccount } = useContext(PasswordManagerContext)

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
    <div id="delete-account">
      <span>This action is irreversible, are you sure that want to do it?</span>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowDeleteAccount(false)}>
          Cancel
        </button>

        <button id="delete" onClick={handleDeleteAccount}>
          Delete
        </button>
      </div>
    </div>
  )
}
