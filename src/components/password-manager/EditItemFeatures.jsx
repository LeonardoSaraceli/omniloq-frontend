import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PasswordManagerContext } from '../PasswordManager'
import { useContext } from 'react'

export default function EditItemFeatures() {
  const {
    theme,
    token,
    item,
    setShowEditItemFeatures,
    setShowAddWebsite,
    setShowAddToChest,
    fetchItem,
    fetchItems,
  } = useContext(PasswordManagerContext)

  const handleWebsiteDelete = (websiteId) => {
    fetch(`http://localhost:3030/websites/${websiteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return
      }

      res.json().then(() => {
        fetchItem()
      })
    })
  }

  const handleChestRemove = (chestId) => {
    fetch(`http://localhost:3030/chests/remove-item/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chestId: chestId,
      }),
    }).then((res) => {
      if (!res.ok) {
        return
      }

      res.json().then(() => {
        fetchItem()
        fetchItems()
      })
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    setShowEditItemFeatures(false)
  }

  return (
    <form id="edit-item-features" onSubmit={handleOnSubmit} className={theme}>
      <div className="edit-item">
        <span id="label">Websites</span>

        <ul>
          {item.websites &&
            item.websites.map((website) => (
              <li key={website.id}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="delete-icon"
                  onClick={() => handleWebsiteDelete(website.id)}
                />

                <p>{website.url}</p>
              </li>
            ))}

          <div id="add" onClick={() => setShowAddWebsite(true)}>
            <FontAwesomeIcon icon={faPlus} className="add-icon" />

            <span>
              {item.websites && item.websites.length > 0
                ? 'add another website'
                : 'add an website'}
            </span>
          </div>
        </ul>
      </div>

      <div className="edit-item">
        <span id="label">Chests</span>

        <ul>
          {item.chests &&
            item.chests.map((chest) => (
              <li key={chest.id}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="delete-icon"
                  onClick={() => handleChestRemove(chest.id)}
                />

                <p>{chest.name}</p>
              </li>
            ))}

          <div id="add" onClick={() => setShowAddToChest(true)}>
            <FontAwesomeIcon icon={faPlus} className="add-icon" />

            <span>
              {item.chests && item.chests.length > 0
                ? 'add to another chest'
                : 'add to an chest'}
            </span>
          </div>
        </ul>
      </div>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowEditItemFeatures(false)}>
          Cancel
        </button>

        <button type="submit" id="edit" className={theme}>
          Save
        </button>
      </div>
    </form>
  )
}
