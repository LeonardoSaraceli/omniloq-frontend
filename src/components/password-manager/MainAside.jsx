import { faKey, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import truncateString from './truncateString'
import { TranslationContext } from '../App'

export default function MainAside() {
  const { theme, items, setActiveItem, activeCollection } = useContext(
    PasswordManagerContext
  )
  const [input, setInput] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const { t } = useContext(TranslationContext)

  const allItemsSearch = items.filter((item) =>
    item.name
      .trim()
      .toLowerCase()
      .split(' ')
      .join('')
      .includes(input.trim().toLowerCase().split(' ').join(''))
  )

  const favourites = allItemsSearch.filter((item) => item.favourite === true)

  const chestItems = allItemsSearch.filter((item) =>
    item.chests.some((chest) => chest.name === activeCollection)
  )

  return (
    <aside id="password-manager-main-aside" className={theme}>
      <div id="search-items" className={theme}>
        <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />

        <input
          type="search"
          placeholder={`${t('search-in')} ${
            activeCollection === 'All items'
              ? t('all-items')
              : activeCollection === 'Favourites'
              ? t('favourites')
              : activeCollection
          }`}
          className={theme}
          value={input}
          onChange={handleChange}
        />
      </div>

      <ul>
        {activeCollection === 'All items' &&
          allItemsSearch.map((item) => (
            <li
              className={theme}
              key={item.id}
              onClick={() => setActiveItem(item.id)}
            >
              <FontAwesomeIcon icon={faKey} className="item-icon" id={theme} />
              <span>{truncateString(item.name, 20)}</span>
            </li>
          ))}

        {activeCollection === 'Favourites' &&
          favourites.map((item) => (
            <li
              className={theme}
              key={item.id}
              onClick={() => setActiveItem(item.id)}
            >
              <FontAwesomeIcon icon={faKey} className="item-icon" id={theme} />
              <span>{truncateString(item.name, 20)}</span>
            </li>
          ))}

        {activeCollection !== 'All items' &&
          activeCollection !== 'Favourites' &&
          chestItems.map((item) => (
            <li
              className={theme}
              key={item.id}
              onClick={() => setActiveItem(item.id)}
            >
              <FontAwesomeIcon icon={faKey} className="item-icon" id={theme} />
              <span>{truncateString(item.name, 20)}</span>
            </li>
          ))}
      </ul>
    </aside>
  )
}
