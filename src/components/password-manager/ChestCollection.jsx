import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFolder,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import truncateString from './truncateString'
import { TranslationContext } from '../App'

export default function ChestCollection() {
  const {
    theme,
    chests,
    setActiveCollection,
    setActiveChest,
    setShowChestCollection,
    setShowCreateChest,
  } = useContext(PasswordManagerContext)

  const { t } = useContext(TranslationContext)

  const [input, setInput] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const allChestsSearch = chests.filter((chest) =>
    chest.name
      .trim()
      .toLowerCase()
      .split(' ')
      .join('')
      .includes(input.trim().toLowerCase().split(' ').join(''))
  )

  return (
    <main id="chest-collection" className={theme}>
      <div id="search-chests">
        <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />

        <input
          type="search"
          name="search-bar"
          placeholder={`${t('search-in')} ${t('chests')}`}
          className={theme}
          value={input}
          onChange={handleChange}
        />
      </div>

      <ul>
        {allChestsSearch.map((chest) => (
          <li className={theme} key={chest.id}>
            <div id="chest-name">
              <FontAwesomeIcon
                id={theme}
                icon={faFolder}
                className="nav-icon"
              />

              <span>{truncateString(chest.name, 30)}</span>
            </div>

            <div id="chest-buttons">
              <span
                onClick={() => [
                  setActiveChest(chest.id),
                  setShowChestCollection(false),
                ]}
              >{`${t('view')} ${t('chest')}`}</span>

              <span
                onClick={() => [
                  setActiveCollection(chest.name),
                  setShowChestCollection(false),
                ]}
              >{`${t('view')} ${t('items')}`}</span>
            </div>
          </li>
        ))}
      </ul>

      <button
        id="create-chest-mobile"
        onClick={() => setShowCreateChest(true)}
        className={theme}
      >
        <FontAwesomeIcon icon={faPlus} className="chest-icon" />

        <span>{t('new-chest')}</span>
      </button>
    </main>
  )
}
