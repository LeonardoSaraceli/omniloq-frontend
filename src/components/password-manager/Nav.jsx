import { faFolder, faStar } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleDown,
  faAngleUp,
  faPlus,
  faVault,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import truncateString from './truncateString'
import { TranslationContext } from '../App'

export default function Nav() {
  const {
    theme,
    chests,
    setActiveCollection,
    setShowCreateChest,
    setActiveChest,
  } = useContext(PasswordManagerContext)

  const { t } = useContext(TranslationContext)

  const [showChests, setShowChests] = useState(true)

  return (
    <nav id="password-manager-nav" className={theme}>
      <ul>
        <li className={theme} onClick={() => setActiveCollection('All items')}>
          <FontAwesomeIcon icon={faVault} className="nav-icon" />

          <span>{t('all-items')}</span>
        </li>

        <li className={theme} onClick={() => setActiveCollection('Favourites')}>
          <FontAwesomeIcon icon={faStar} className="nav-icon" />

          <span>{t('favourites')}</span>
        </li>

        <ul>
          <div id="nav-chests">
            <FontAwesomeIcon
              icon={showChests ? faAngleDown : faAngleUp}
              id={theme}
              className="chest-icon"
              onClick={() => setShowChests(!showChests)}
            />

            <span>{t('chests')}</span>

            <FontAwesomeIcon
              icon={faPlus}
              id={theme}
              className="chest-icon"
              onClick={() => setShowCreateChest(true)}
            />
          </div>

          {showChests &&
            chests.map((chest) => (
              <li
                className={theme}
                onClick={() => [
                  setActiveCollection(chest.name),
                  setActiveChest(chest.id),
                ]}
                key={chest.id}
              >
                <FontAwesomeIcon icon={faFolder} className="nav-icon" />

                <span>{truncateString(chest.name, 30)}</span>
              </li>
            ))}
        </ul>
      </ul>
    </nav>
  )
}
