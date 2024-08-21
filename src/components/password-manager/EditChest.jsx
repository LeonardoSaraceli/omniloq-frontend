import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function EditChest() {
  const {
    theme,
    token,
    chest,
    setShowEditChest,
    setShowEditChestFeatures,
    fetchChest,
    fetchChests,
  } = useContext(PasswordManagerContext)

  const { t } = useContext(TranslationContext)

  const [formData, setFormData] = useState({
    name: chest.name,
    description: chest.description,
  })

  const [missingFields, setMissingFields] = useState(false)

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

    fetch(`http://localhost:3030/chests/${chest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
      }),
    }).then((res) => {
      if (res.status === 400) {
        setMissingFields(true)
        return
      }

      res.json().then(() => {
        fetchChest()
        fetchChests()
        setShowEditChest(false)
        setShowEditChestFeatures(true)
      })
    })
  }

  return (
    <form id="edit-chest" onSubmit={handleOnSubmit} className={theme}>
      {missingFields && (
        <div className="error-message">
          <span>{t('all-required-fields')}</span>
        </div>
      )}

      <div className="inputs-edit-chest">
        <label htmlFor="name">{t('name')}</label>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="inputs-edit-chest">
        <label htmlFor="description">{t('description')}</label>

        <textarea
          name="description"
          id="description"
          placeholder={t('optional')}
          value={formData.description}
          onChange={handleOnChange}
        ></textarea>
      </div>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowEditChest(false)}>
          {t('cancel')}
        </button>

        <button type="submit" id="edit" className={theme}>
          {t('save')}
        </button>
      </div>
    </form>
  )
}
