import { useContext, useEffect } from 'react'
import omniloqLogo from '../../assets/images/omniloq-logo-main-display.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faKey,
  faPen,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { PasswordManagerContext } from '../PasswordManager'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import truncateString from './truncateString'
import hidePassword from './hidePassword'
import { TranslationContext } from '../App'

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
    fetchItems,
    fetchItem,
    setShowConfirmPassword,
    validShowPasswordToken,
    theme,
  } = useContext(PasswordManagerContext)

  const { t } = useContext(TranslationContext)

  useEffect(() => {
    if (activeItem === 0) {
      return
    }

    fetch(`http://localhost:3030/items/${activeItem}`, {
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
        fetchItems()
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
        fetchItems()
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

  const handleShowPassword = () => {
    if (!item) {
      return
    }

    fetch(`http://localhost:3030/items/show-password/${item.id}`, {
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
      .then(() => {
        fetchItem()
      })
  }

  const handleHidePassword = () => {
    if (!item) {
      return
    }

    fetch(`http://localhost:3030/items/hide-password/${item.id}`, {
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
      .then(() => {
        fetchItem()
      })
  }

  return (
    <section
      id="display-area"
      className={theme}
      style={
        window.innerWidth < 1279
          ? activeItem > 0 || activeChest > 0
            ? null
            : { display: 'none' }
          : null
      }
    >
      {activeItem === 0 && activeChest === 0 && (
        <img src={omniloqLogo} id="app-default-logo" alt="Omniloq logo" />
      )}

      {activeItem > 0 && (
        <div id="item-display">
          <ul id="item-actions">
            <li
              id={theme}
              className={item.favourite ? 'unfavorite-item' : null}
              onClick={() =>
                item.favourite ? handleUnfavoriteItem() : handleFavoriteItem()
              }
            >
              <FontAwesomeIcon icon={faStar} className="action-icon" />

              <span>{item.favourite ? t('unfavorite') : t('favorite')}</span>
            </li>

            <li id={theme} onClick={handleShowEditItem}>
              <FontAwesomeIcon icon={faPen} className="action-icon" />

              <span>{t('edit')}</span>
            </li>

            <li id={theme} onClick={handleShowDeleteItem}>
              <FontAwesomeIcon icon={faTrashCan} className="action-icon" />

              <span>{t('delete')}</span>
            </li>
          </ul>

          <article id="item-info">
            <div id="item-headline">
              <FontAwesomeIcon
                icon={faKey}
                id="item-avatar"
                className={theme}
              />

              <h2>
                {truncateString(item.name, window.innerWidth > 1279 ? 30 : 20)}
              </h2>
            </div>

            <ul>
              {item.email && (
                <li className="element-info">
                  <span>{t('email')}</span>

                  <p>
                    {truncateString(
                      item.email,
                      window.innerWidth > 1279 ? 40 : 25
                    )}
                  </p>
                </li>
              )}

              {item.username && (
                <li className="element-info">
                  <span>{t('username')}</span>

                  <p>
                    {truncateString(
                      item.username,
                      window.innerWidth > 1279 ? 40 : 25
                    )}
                  </p>
                </li>
              )}

              <li>
                <span>{t('password')}</span>

                <div id="password">
                  <p>
                    {validShowPasswordToken && item.show_password
                      ? truncateString(
                          decrypted,
                          window.innerWidth > 1279 ? 30 : 25
                        )
                      : hidePassword(
                          truncateString(
                            decrypted,
                            window.innerWidth > 1279 ? 30 : 25
                          )
                        )}
                  </p>

                  <FontAwesomeIcon
                    icon={
                      validShowPasswordToken && item.show_password
                        ? faEyeSlash
                        : faEye
                    }
                    onClick={() =>
                      validShowPasswordToken
                        ? item.show_password
                          ? handleHidePassword()
                          : handleShowPassword()
                        : setShowConfirmPassword(true)
                    }
                    className="password-icon"
                  />
                </div>
              </li>

              {item.websites && item.websites.length > 0 && (
                <li className="websites-info">
                  <span>{t('websites')}</span>

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
            <li id={theme} onClick={() => setShowEditChest(true)}>
              <FontAwesomeIcon icon={faPen} className="action-icon" />

              <span>{t('edit')}</span>
            </li>

            <li id={theme} onClick={() => setShowDeleteChest(true)}>
              <FontAwesomeIcon icon={faTrashCan} className="action-icon" />

              <span>{t('delete')}</span>
            </li>
          </ul>

          <article id="chest-info">
            <div id="chest-headline">
              <FontAwesomeIcon
                icon={faFolder}
                id="chest-avatar"
                className={theme}
              />

              <h2>
                {truncateString(chest.name, window.innerWidth > 1279 ? 30 : 20)}
              </h2>
            </div>

            {chest.description && (
              <ul>
                <li>
                  <span>{t('description')}</span>

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
