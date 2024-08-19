import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'

export default function CreateItem() {
  const { token, setShowCreateItem, fetchItems } = useContext(
    PasswordManagerContext
  )

  const [missingFields, setMissingFields] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })

  const handleOnChange = (e) => {
    setMissingFields(false)

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3030/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      }),
    }).then((res) => {
      if (res.status === 400) {
        setMissingFields(true)
        return
      }

      res.json().then(() => {
        setShowCreateItem(false)
        fetchItems()
      })
    })
  }

  return (
    <section id="create-item-modal">
      <div id="item-name-avatar">
        <FontAwesomeIcon icon={faKey} className="avatar-item-icon" />

        <h2>New item</h2>
      </div>

      <form id="create-item" onSubmit={handleOnSubmit}>
        {missingFields && (
          <div className="error-message">
            <span>All required fields must be filled in.</span>
          </div>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          placeholder="Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail (optional)"
          value={formData.email}
          onChange={handleOnChange}
          autoComplete="current-email"
        />

        <input
          type="text"
          name="username"
          placeholder="Username (optional)"
          value={formData.username}
          onChange={handleOnChange}
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleOnChange}
          autoComplete="current-password"
          required
        />

        <div id="buttons">
          <button id="cancel" onClick={() => setShowCreateItem(false)}>
            Cancel
          </button>

          <button type="submit" id="create">
            Create
          </button>
        </div>
      </form>
    </section>
  )
}
