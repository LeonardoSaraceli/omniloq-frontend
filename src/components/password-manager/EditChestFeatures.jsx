import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PasswordManagerContext } from '../PasswordManager'
import { useContext } from 'react'
import { TranslationContext } from '../App'

export default function EditChestFeatures() {
  const {
    theme,
    token,
    chest,
    setShowEditChestFeatures,
    setShowAddFromChest,
    fetchChest,
    fetchItems,
  } = useContext(PasswordManagerContext)

  const { t, apiUrl } = useContext(TranslationContext)

  const handleItemRemove = (itemId) => {
    fetch(`${apiUrl}chests/remove-item/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chestId: chest.id,
      }),
    }).then((res) => {
      if (!res.ok) {
        return
      }

      res.json().then(() => {
        fetchItems()
        fetchChest()
      })
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    setShowEditChestFeatures(false)
  }

  return (
    <form id="edit-chest-features" onSubmit={handleOnSubmit} className={theme}>
      <div className="edit-chest">
        <span id="label">{t('items')}</span>

        <ul>
          {chest &&
            chest.items.map((item) => (
              <li key={item.id}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="delete-icon"
                  onClick={() => handleItemRemove(item.id)}
                />

                <p>{item.name}</p>
              </li>
            ))}

          <div id="add" onClick={() => setShowAddFromChest(true)}>
            <FontAwesomeIcon icon={faPlus} className="add-icon" />

            <span>
              {chest && chest.items.length > 0
                ? t('add-another-item')
                : t('add-an-item')}
            </span>
          </div>
        </ul>
      </div>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowEditChestFeatures(false)}>
          {t('cancel')}
        </button>

        <button type="submit" id="edit" className={theme}>
          {t('save')}
        </button>
      </div>
    </form>
  )
}
