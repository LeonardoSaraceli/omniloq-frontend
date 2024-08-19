import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PasswordManagerContext } from '../PasswordManager'
import { useContext, useState } from 'react'

export default function CreateChest() {
  const { token, setShowCreateChest, fetchChests } = useContext(
    PasswordManagerContext
  )

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3030/chests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
      }),
    }).then((res) => {
      if (!res.ok) {
        return
      }

      res.json().then(() => {
        setShowCreateChest(false)
        fetchChests()
      })
    })
  }

  return (
    <section id="create-chest-modal">
      <div id="chest-name-avatar">
        <FontAwesomeIcon icon={faFolder} className="avatar-chest-icon" />

        <h2>New chest</h2>
      </div>

      <form id="create-chest" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleOnChange}
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleOnChange}
        ></textarea>

        <div id="buttons">
          <button id="cancel" onClick={() => setShowCreateChest(false)}>
            Cancel
          </button>

          <button type="submit" id="create">
            Create
          </button>
        </div>
      </form>
    </section>
  )
}
