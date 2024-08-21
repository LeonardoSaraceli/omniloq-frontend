import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function DeleteItem() {
  const { theme, item, token, setShowDeleteItem, fetchItems, setActiveItem } =
    useContext(PasswordManagerContext)

  const { t } = useContext(TranslationContext)

  const handleDeleteItem = () => {
    fetch(`http://localhost:3030/items/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 404) {
        return
      }

      res.json().then(() => {
        setShowDeleteItem(false)
        setActiveItem(0)
        fetchItems()
      })
    })
  }

  return (
    <div id="delete-item" className={theme}>
      <span>{t('action-irreversible')}</span>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowDeleteItem(false)}>
          {t('cancel')}
        </button>

        <button id="delete" onClick={handleDeleteItem}>
          {t('delete')}
        </button>
      </div>
    </div>
  )
}
