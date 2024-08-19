import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function EditChest() {
  const { token, chest, setShowEditChest, setShowEditChestFeatures } =
    useContext(PasswordManagerContext)

  const [formData, setFormData] = useState({
    name: chest.name,
    description: chest.description,
  })

  const [missingFields, setMissingFields] = useState(false)

  const handleOnChange = (e) => {
    if (missingFields) {
      setMissingFields(false)
    }

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3030/chests/${chest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
      }),
    }).then((res) => {
      if (res.status === 400) {
        setMissingFields(true)
        return
      }
      setShowEditChest(false)
    })
  }

  return (
    <form id="edit-chest" onSubmit={handleOnSubmit}>
      {missingFields && (
        <div className="error-message">
          <span>All required fields must be filled in.</span>
        </div>
      )}

      <div className="inputs-edit-chest">
        <label htmlFor="name">Name</label>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="inputs-edit-chest">
        <label htmlFor="description">Description</label>

        <textarea
          name="description"
          id="description"
          placeholder="(optional)"
          value={formData.description}
          onChange={handleOnChange}
        ></textarea>
      </div>

      <div id="buttons">
        <button id="cancel" onClick={() => setShowEditChest(false)}>
          Cancel
        </button>

        <button
          type="submit"
          id="edit"
          onClick={() => setShowEditChestFeatures(true)}
        >
          Save
        </button>
      </div>
    </form>
  )
}
