import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function EditProfile() {
  const { token, profile, setShowEditProfile, fetchProfile } = useContext(
    PasswordManagerContext
  )

  const [formData, setFormData] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3030/profile/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
      }),
    }).then((res) => {
      if (!res.ok) {
        return
      }

      res.json().then(() => {
        fetchProfile()
        setShowEditProfile(false)
      })
    })
  }

  return (
    <form id="edit-profile" onSubmit={handleOnSubmit}>
      <div className="profile-info">
        <label htmlFor="first_name">First name</label>

        <input
          type="text"
          name="first_name"
          id="first_name"
          value={formData.first_name}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="profile-info">
        <label htmlFor="last_name">Last name</label>

        <input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleOnChange}
          required
        />
      </div>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowEditProfile(false)}>
          Cancel
        </button>

        <button type="submit" id="edit">
          Save
        </button>
      </div>
    </form>
  )
}
