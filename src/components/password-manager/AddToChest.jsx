import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function AddToChest() {
  const { chests, token, item, setShowAddToChest } = useContext(
    PasswordManagerContext
  )

  const chestsAvailables = chests.filter(
    (chest) => !item.chests.some((itemChest) => itemChest.id === chest.id)
  )

  const [chestId, setChestId] = useState(
    chestsAvailables.length > 0 ? chestsAvailables[0].id : 0
  )

  const handleOnChange = (e) => {
    setChestId(parseInt(e.target.value))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3030/chests/add-item/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chestId: chestId,
      }),
    }).then((res) => {
      if (res.status === 404) {
        return
      }

      setShowAddToChest(false)
    })
  }

  return (
    <form id="add-chest" onSubmit={handleOnSubmit}>
      <select
        name="chests"
        required
        value={chestId}
        onChange={handleOnChange}
        disabled={chestsAvailables.length === 0}
      >
        {chestsAvailables.length === 0 && <option>No chests available</option>}
        {chestsAvailables.length > 0 &&
          chestsAvailables?.map((chest) => (
            <option key={chest.id} value={chest.id}>
              {chest.name}
            </option>
          ))}
      </select>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowAddToChest(false)}>
          Cancel
        </button>

        <button type="submit" id="add" disabled={chestsAvailables.length === 0}>
          Add
        </button>
      </div>
    </form>
  )
}
