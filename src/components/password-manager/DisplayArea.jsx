import { useContext, useEffect } from 'react'
import omniloqLogo from '../../assets/images/omniloq-logo-main-display.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faKey,
  faPen,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { PasswordManagerContext } from '../PasswordManager'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import truncateString from './truncateString'

export default function DisplayArea() {
  const {
    showEditItem,
    setShowEditItem,
    item,
    setItem,
    token,
    activeItem,
    decrypted,
    showDeleteItem,
    setShowDeleteItem,
    activeChest,
    chest,
    setChest,
    setShowEditChest,
    setShowDeleteChest,
  } = useContext(PasswordManagerContext)

  useEffect(() => {
    if (activeItem === 0) {
      return
    }

    fetch(`http://localhost:3030/items/${activeItem}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 404) {
          return
        }

        return res.json()
      })
      .then((data) => {
        setItem(data.item)
      })
  }, [activeItem, setItem, token])

  const handleFavoriteItem = () => {
    if (!item.id) {
      return
    }

    fetch(`http://localhost:3030/items/favorite/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return
        }

        return res.json()
      })
      .then((data) => {
        setItem(data.item)
      })
  }

  const handleUnfavoriteItem = () => {
    if (!item.id) {
      return
    }

    fetch(`http://localhost:3030/items/unfavorite/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return
        }

        return res.json()
      })
      .then((data) => {
        setItem(data.item)
      })
  }

  const handleShowEditItem = () => {
    return setShowEditItem(!showEditItem)
  }

  const handleShowDeleteItem = () => {
    return setShowDeleteItem(!showDeleteItem)
  }

  useEffect(() => {
    if (activeChest === 0) {
      return
    }

    fetch(`http://localhost:3030/chests/${activeChest}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          return
        }

        return res.json()
      })
      .then((data) => setChest(data.chest))
  }, [activeChest, setChest, token])

  return (
    <section id="display-area">
      {activeItem === 0 && activeChest === 0 && (
        <img src={omniloqLogo} id="app-default-logo" alt="Omniloq logo" />
      )}

      {activeItem > 0 && (
        <div id="item-display">
          <ul id="item-actions">
            <li
              className={item.favourite ? 'unfavorite-item' : null}
              onClick={() =>
                item.favourite ? handleUnfavoriteItem() : handleFavoriteItem()
              }
            >
              <FontAwesomeIcon icon={faStar} className="action-icon" />

              <span>{item.favourite ? 'Unfavorite' : 'Favorite'}</span>
            </li>

            <li onClick={handleShowEditItem}>
              <FontAwesomeIcon icon={faPen} className="action-icon" />

              <span>Edit</span>
            </li>

            <li onClick={handleShowDeleteItem}>
              <FontAwesomeIcon icon={faTrashCan} className="action-icon" />

              <span>Delete</span>
            </li>
          </ul>

          <article id="item-info">
            <div id="item-headline">
              <FontAwesomeIcon icon={faKey} id="item-avatar" />

              <h2>{truncateString(item.name, 30)}</h2>
            </div>

            <ul>
              {item.email && (
                <li className="element-info">
                  <span>E-mail</span>

                  <p>{truncateString(item.email, 40)}</p>
                </li>
              )}

              {item.username && (
                <li className="element-info">
                  <span>Username</span>

                  <p>{truncateString(item.username, 40)}</p>
                </li>
              )}

              <li>
                <span>Password</span>

                <p>{truncateString(decrypted, 40)}</p>
              </li>

              {item.websites && item.websites.length > 0 && (
                <li className="websites-info">
                  <span>Websites</span>

                  {item.websites.map((website) => (
                    <p key={website.id}>{truncateString(website.url, 40)}</p>
                  ))}
                </li>
              )}
            </ul>
          </article>
        </div>
      )}

      {activeChest > 0 && (
        <div id="chest-display">
          <ul id="chest-actions">
            <li onClick={() => setShowEditChest(true)}>
              <FontAwesomeIcon icon={faPen} className="action-icon" />

              <span>Edit</span>
            </li>

            <li onClick={() => setShowDeleteChest(true)}>
              <FontAwesomeIcon icon={faTrashCan} className="action-icon" />

              <span>Delete</span>
            </li>
          </ul>

          <article id="chest-info">
            <div id="chest-headline">
              <FontAwesomeIcon icon={faFolder} id="chest-avatar" />

              <h2>{chest.name}</h2>
            </div>

            {chest.description && (
              <ul>
                <li>
                  <span>Description</span>

                  <p>{chest.description}</p>
                </li>
              </ul>
            )}
          </article>
        </div>
      )}
    </section>
  )
}
