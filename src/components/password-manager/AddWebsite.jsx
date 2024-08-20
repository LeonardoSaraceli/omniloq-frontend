import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function AddWebsite() {
  const { theme, token, item, setShowAddWebsite, fetchItem } = useContext(
    PasswordManagerContext
  )

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
          Cancel
        </button>

        <button type="submit" id="add" className={theme}>
          Add
        </button>
      </div>
    </form>
  )
}
