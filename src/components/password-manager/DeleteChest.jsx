import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

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
      <span>This action is irreversible, are you sure that want to do it?</span>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowDeleteChest(false)}>
          Cancel
        </button>

        <button id="delete" onClick={handleDeleteChest}>
          Delete
        </button>
      </div>
    </div>
  )
}
