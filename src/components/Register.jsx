/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import Stepper from './Stepper'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [missingFields, setMissingFields] = useState(false)
  const [existingEmail, setExistingEmail] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const navigate = useNavigate()

  const [formDetails, setFormDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const handleOnChange = (e) => {
    if (missingFields || existingEmail || !passwordMatch) {
      setMissingFields(false)
      setExistingEmail(false)
      setPasswordMatch(true)
    }

    const { name, value } = e.target

    setFormDetails({
      ...formDetails,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (formDetails.password !== formDetails.confirm_password) {
      setPasswordMatch(false)
      return
    }

    fetch('http://localhost:3030/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: formDetails.first_name,
        last_name: formDetails.last_name,
        email: formDetails.email,
        password: formDetails.password,
      }),
    }).then((res) => {
      if (res.status === 400) {
        setMissingFields(true)
        return
      }

      if (res.status === 409) {
        setExistingEmail(true)
        return
      }

      navigate('/login')
    })
  }

  return (
    <Stepper>
      <section id="register-section">
        <h1>Sign up</h1>

        {!passwordMatch && (
          <span className="error-message">The password dosen't match.</span>
        )}

        {existingEmail && (
          <span className="error-message">E-mail already registered.</span>
        )}

        {missingFields && (
          <span className="error-message">All fields must be filled in.</span>
        )}

        <form onSubmit={handleOnSubmit}>
          <div id="full-name-input">
            <input
              type="text"
              placeholder="First name"
              name="first_name"
              autoComplete="first name"
              value={formDetails.first_name}
              onChange={handleOnChange}
              required
            />

            <input
              type="text"
              placeholder="Last name"
              name="last_name"
              autoComplete="last name"
              value={formDetails.last_name}
              onChange={handleOnChange}
              required
            />
          </div>

          <input
            type="email"
            placeholder="E-mail"
            name="email"
            autoComplete="email"
            value={formDetails.email}
            onChange={handleOnChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            value={formDetails.password}
            onChange={handleOnChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            name="confirm_password"
            value={formDetails.confirm_password}
            onChange={handleOnChange}
            required
          />

          <button type="submit">Continue</button>
        </form>
      </section>
    </Stepper>
  )
}
