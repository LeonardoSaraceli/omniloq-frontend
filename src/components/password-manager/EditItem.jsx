import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function EditItem() {
  const { token, item, setShowEditItem, decrypted, setShowEditItemFeatures } =
    useContext(PasswordManagerContext)

  const [missingFields, setMissingFields] = useState(false)

  const [formData, setFormData] = useState({
    name: item.name,
    email: item.email,
    username: item.username,
    password: decrypted,
  })

  const handleOnChange = (e) => {
    if (missingFields) {
      setMissingFields(false)
    }

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3030/items/edit/${item.id}`, {
      method: 'PUT',
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
      setShowEditItem(false)
    })
  }

  return (
    <form id="edit-item" onSubmit={handleOnSubmit}>
      {missingFields && (
        <div className="error-message">
          <span>All required fields must be filled in.</span>
        </div>
      )}

      <div className="inputs-edit-item">
        <label htmlFor="name">Name</label>

        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="inputs-edit-item">
        <label htmlFor="email">E-mail</label>

        <input
          type="email"
          name="email"
          id="email"
          value={formData.email ? formData.email : ''}
          onChange={handleOnChange}
          placeholder="(optional)"
          autoComplete="current-email"
        />
      </div>

      <div className="inputs-edit-item">
        <label htmlFor="username">Username</label>

        <input
          type="text"
          name="username"
          id="username"
          value={formData.username ? formData.username : ''}
          onChange={handleOnChange}
          placeholder="(optional)"
          autoComplete="current-username"
        />
      </div>

      <div className="inputs-edit-item">
        <label htmlFor="password">Password</label>

        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleOnChange}
          required
        />
      </div>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowEditItem(false)}>
          Cancel
        </button>

        <button
          type="submit"
          id="edit"
          onClick={() => setShowEditItemFeatures(true)}
        >
          Save
        </button>
      </div>
    </form>
  )
}
