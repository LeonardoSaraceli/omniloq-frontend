import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function AddToChest() {
  const {
    theme,
    chests,
    token,
    item,
    setShowAddToChest,
    fetchItem,
    fetchItems,
  } = useContext(PasswordManagerContext)

  const { t, apiUrl } = useContext(TranslationContext)

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

    fetch(`${apiUrl}chests/add-item/${item.id}`, {
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

      res.json().then(() => {
        setShowAddToChest(false)
        fetchItems()
        fetchItem()
      })
    })
  }

  return (
    <form id="add-chest" onSubmit={handleOnSubmit} className={theme}>
      <select
        name="chests"
        required
        value={chestId}
        onChange={handleOnChange}
        disabled={chestsAvailables.length === 0}
      >
        {chestsAvailables.length === 0 && (
          <option>{t('no-chests-available')}</option>
        )}
        {chestsAvailables.length > 0 &&
          chestsAvailables?.map((chest) => (
            <option key={chest.id} value={chest.id}>
              {chest.name}
            </option>
          ))}
      </select>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowAddToChest(false)}>
          {t('cancel')}
        </button>

        <button
          type="submit"
          id="add"
          disabled={chestsAvailables.length === 0}
          className={theme}
        >
          {t('add')}
        </button>
      </div>
    </form>
  )
}
