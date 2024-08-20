import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function ConfirmPassword() {
  const { token, setShowConfirmPassword } = useContext(PasswordManagerContext)

  const [password, setPassword] = useState('')

  const [incorrectPassword, setIncorrectPassword] = useState(false)

  const handleOnChange = (e) => {
    if (incorrectPassword) {
      setIncorrectPassword(false)
    }

    return setPassword(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3030/users/create-pw-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setIncorrectPassword(true)
          return
        }

        return res.json()
      })
      .then((data) => {
        localStorage.setItem('pw', data.token)
        setShowConfirmPassword(false)
      })
  }

  return (
    <form id="confirm-password" onSubmit={handleOnSubmit}>
      {incorrectPassword && (
        <span className="error-message">Incorrect password</span>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleOnChange}
        required
      />

      <div id="buttons">
        <button id="cancel" onClick={() => setShowConfirmPassword(false)}>
          Cancel
        </button>

        <button type="submit" id="edit">
          Send
        </button>
      </div>
    </form>
  )
}
