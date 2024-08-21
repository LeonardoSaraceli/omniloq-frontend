import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function DeleteChest() {
  const {
    theme,
    chest,
    token,
    setShowDeleteChest,
    fetchChests,
    setActiveChest,
    setActiveCollection,
  } = useContext(PasswordManagerContext)

  const { t } = useContext(TranslationContext)

  const handleDeleteChest = () => {
    fetch(`http://localhost:3030/chests/${chest.id}`, {
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
        fetchChests()
        setActiveChest(0)
        setActiveCollection('All items')
        setShowDeleteChest(false)
      })
    })
  }

  return (
    <div id="delete-chest" className={theme}>
      <span>{t('action-irreversible')}</span>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowDeleteChest(false)}>
          {t('cancel')}
        </button>

        <button id="delete" onClick={handleDeleteChest}>
          {t('delete')}
        </button>
      </div>
    </div>
  )
}
