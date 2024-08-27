import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function EditItem() {
  const {
    theme,
    token,
    item,
    setShowEditItem,
    decrypted,
    setShowEditItemFeatures,
    fetchItem,
  } = useContext(PasswordManagerContext)

  const { t, apiUrl } = useContext(TranslationContext)

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

    fetch(`${apiUrl}items/edit/${item.id}`, {
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

      res.json().then(() => {
        setShowEditItem(false)
        fetchItem()
        setShowEditItemFeatures(true)
      })
    })
  }

  return (
    <form id="edit-item" onSubmit={handleOnSubmit} className={theme}>
      {missingFields && (
        <div className="error-message">
          <span>{t('all-required-fields')}</span>
        </div>
      )}

      <div className="inputs-edit-item">
        <label htmlFor="name">{t('name')}</label>

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
        <label htmlFor="email">{t('email')}</label>

        <input
          type="email"
          name="email"
          id="email"
          value={formData.email ? formData.email : ''}
          onChange={handleOnChange}
          placeholder={t('optional')}
          autoComplete="current-email"
        />
      </div>

      <div className="inputs-edit-item">
        <label htmlFor="username">{t('username')}</label>

        <input
          type="text"
          name="username"
          id="username"
          value={formData.username ? formData.username : ''}
          onChange={handleOnChange}
          placeholder={t('optional')}
          autoComplete="current-username"
        />
      </div>

      <div className="inputs-edit-item">
        <label htmlFor="password">{t('password')}</label>

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
          {t('cancel')}
        </button>

        <button type="submit" id="edit" className={theme}>
          {t('save')}
        </button>
      </div>
    </form>
  )
}
