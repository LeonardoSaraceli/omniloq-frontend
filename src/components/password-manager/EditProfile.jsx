import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function EditProfile() {
  const { theme, token, profile, setShowEditProfile, fetchProfile } =
    useContext(PasswordManagerContext)

  const { t, apiUrl } = useContext(TranslationContext)

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

    fetch(`${apiUrl}profile/`, {
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
    <form id="edit-profile" onSubmit={handleOnSubmit} className={theme}>
      <div className="profile-info">
        <label htmlFor="first_name">{t('first-name')}</label>

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
        <label htmlFor="last_name">{t('last-name')}</label>

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
          {t('cancel')}
        </button>

        <button type="submit" id="edit" className={theme}>
          {t('save')}
        </button>
      </div>
    </form>
  )
}
