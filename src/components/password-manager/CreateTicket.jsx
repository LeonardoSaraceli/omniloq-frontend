import { faBug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { PasswordManagerContext } from '../PasswordManager'

export default function CreateTicket() {
  const { theme, token, setShowCreateTicket } = useContext(
    PasswordManagerContext
  )

  const [formData, setFormData] = useState({
    title: '',
    message: '',
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

    fetch('http://localhost:3030/tickets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        message: formData.message,
      }),
    }).then((res) => {
      if (!res.ok) {
        return
      }

      setShowCreateTicket(false)
    })
  }

  return (
    <section id="create-ticket-modal" className={theme}>
      <div id="ticket-name-avatar">
        <FontAwesomeIcon
          icon={faBug}
          className="avatar-ticket-icon"
          id={theme}
        />

        <h2>New ticket</h2>
      </div>

      <form id="create-ticket" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleOnChange}
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleOnChange}
          required
        ></textarea>

        <div id="buttons">
          <button id="cancel" onClick={() => setShowCreateTicket(false)}>
            Cancel
          </button>

          <button type="submit" id="create" className={theme}>
            Create
          </button>
        </div>
      </form>
    </section>
  )
}
