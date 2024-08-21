import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function AddWebsite() {
  const { theme, token, item, setShowAddWebsite, fetchItem } = useContext(
    PasswordManagerContext
  )

  const { t } = useContext(TranslationContext)

  const [url, setUrl] = useState('')

  const handleOnChange = (e) => {
    setUrl(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3030/websites/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId: item.id,
        url: url,
      }),
    }).then((res) => {
      if (!res.ok) {
        return
      }

      res.json().then(() => {
        setShowAddWebsite(false)
        fetchItem()
      })
    })
  }

  return (
    <form id="add-website" onSubmit={handleOnSubmit} className={theme}>
      <input
        type="text"
        placeholder="Url"
        value={url}
        onChange={handleOnChange}
        required
      />

      <div id="buttons">
        <button id="cancel" onClick={() => setShowAddWebsite(false)}>
          {t('cancel')}
        </button>

        <button type="submit" id="add" className={theme}>
          {t('add')}
        </button>
      </div>
    </form>
  )
}
