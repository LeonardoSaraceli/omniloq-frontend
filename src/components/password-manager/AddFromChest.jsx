import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function AddFromChest() {
  const {
    theme,
    items,
    token,
    chest,
    setShowAddFromChest,
    fetchItems,
    fetchChest,
  } = useContext(PasswordManagerContext)

  const { t, apiUrl } = useContext(TranslationContext)

  const itemsAvailables = items.filter(
    (item) => !chest.items.some((chestItem) => chestItem.id === item.id)
  )

  const [itemId, setItemId] = useState(
    itemsAvailables.length > 0 ? itemsAvailables[0].id : 0
  )

  const handleOnChange = (e) => {
    setItemId(parseInt(e.target.value))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch(`${apiUrl}chests/add-item/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chestId: chest.id,
      }),
    }).then((res) => {
      if (res.status === 404) {
        return
      }

      res.json().then(() => {
        fetchChest()
        fetchItems()
        setShowAddFromChest(false)
      })
    })
  }

  return (
    <form id="add-chest" onSubmit={handleOnSubmit} className={theme}>
      <select
        name="chests"
        required
        value={itemId}
        onChange={handleOnChange}
        disabled={itemsAvailables.length === 0}
      >
        {itemsAvailables.length === 0 && (
          <option>{t('no-items-available')}</option>
        )}
        {itemsAvailables.length > 0 &&
          itemsAvailables?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowAddFromChest(false)}>
          {t('cancel')}
        </button>

        <button
          type="submit"
          id="add"
          disabled={itemsAvailables.length === 0}
          className={theme}
        >
          {t('add')}
        </button>
      </div>
    </form>
  )
}
