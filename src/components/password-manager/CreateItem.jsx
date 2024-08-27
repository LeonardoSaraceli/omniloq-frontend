import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { TranslationContext } from '../App'

export default function CreateItem() {
  const { theme, token, setShowCreateItem, fetchItems } = useContext(
    PasswordManagerContext
  )

  const { t, apiUrl } = useContext(TranslationContext)

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

    fetch(`${apiUrl}items/`, {
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
    <section id="create-item-modal" className={theme}>
      <div id="item-name-avatar">
        <FontAwesomeIcon icon={faKey} className="avatar-item-icon" id={theme} />

        <h2>{t('new-item')}</h2>
      </div>

      <form id="create-item" onSubmit={handleOnSubmit}>
        {missingFields && (
          <div className="error-message">
            <span>{t('all-required-fields')}</span>
          </div>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          placeholder={t('name')}
          required
        />

        <input
          type="email"
          name="email"
          placeholder={`${t('email')} ${t('optional')}`}
          value={formData.email}
          onChange={handleOnChange}
          autoComplete="current-email"
        />

        <input
          type="text"
          name="username"
          placeholder={`${t('username')} ${t('optional')}`}
          value={formData.username}
          onChange={handleOnChange}
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder={t('password')}
          value={formData.password}
          onChange={handleOnChange}
          autoComplete="current-password"
          required
        />

        <div id="buttons">
          <button id="cancel" onClick={() => setShowCreateItem(false)}>
            {t('cancel')}
          </button>

          <button type="submit" id="create" className={theme}>
            {t('create')}
          </button>
        </div>
      </form>
    </section>
  )
}
