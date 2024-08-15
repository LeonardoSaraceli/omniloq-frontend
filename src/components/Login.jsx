import { useState } from 'react'
import Stepper from './Stepper'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [incorrectLogin, setIncorrectLogin] = useState(false)

  const navigate = useNavigate()

  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  })

  const handleOnChange = (e) => {
    if (incorrectLogin) {
      setIncorrectLogin(false)
    }

    const { name, value } = e.target

    setFormDetails({
      ...formDetails,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3030/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formDetails.email,
        password: formDetails.password,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          setIncorrectLogin(true)
          return
        }

        return res.json()
      })
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        navigate('/app')
      })
  }

  return (
    <Stepper>
      <section id="login-section">
        <h1>Sign in</h1>

        {incorrectLogin && (
          <span className="error-message">Incorrect e-mail or password.</span>
        )}

        <form onSubmit={handleOnSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            autoComplete="current-email"
            name="email"
            value={formDetails.email}
            onChange={handleOnChange}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            name="password"
            value={formDetails.password}
            onChange={handleOnChange}
          />

          <button type="submit">Continue</button>
        </form>
      </section>
    </Stepper>
  )
}
