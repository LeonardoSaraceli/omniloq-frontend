import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function DeleteItem() {
  const { item, token, setShowDeleteItem } = useContext(PasswordManagerContext)

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

      setShowDeleteItem(false)
    })
  }

  return (
    <div id="delete-item">
      <span>This action is irreversible, are you sure that want to do it?</span>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowDeleteItem(false)}>
          Cancel
        </button>

        <button id="delete" onClick={handleDeleteItem}>
          Delete
        </button>
      </div>
    </div>
  )
}
