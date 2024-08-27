import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PasswordManagerContext } from '../PasswordManager'
import { useContext, useState } from 'react'
import { TranslationContext } from '../App'

export default function CreateChest() {
  const { theme, token, setShowCreateChest, fetchChests } = useContext(
    PasswordManagerContext
  )

  const { t, apiUrl } = useContext(TranslationContext)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
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

    fetch(`${apiUrl}chests/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
      }),
    }).then((res) => {
      if (!res.ok) {
        return
      }

      res.json().then(() => {
        setShowCreateChest(false)
        fetchChests()
      })
    })
  }

  return (
    <section id="create-chest-modal" className={theme}>
      <div id="chest-name-avatar">
        <FontAwesomeIcon
          icon={faFolder}
          className="avatar-chest-icon"
          id={theme}
        />

        <h2>{t('new-chest')}</h2>
      </div>

      <form id="create-chest" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t('name')}
          required
          value={formData.name}
          onChange={handleOnChange}
        />

        <textarea
          name="description"
          placeholder={`${t('description')} ${t('optional')}`}
          value={formData.description}
          onChange={handleOnChange}
        ></textarea>

        <div id="buttons">
          <button id="cancel" onClick={() => setShowCreateChest(false)}>
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
