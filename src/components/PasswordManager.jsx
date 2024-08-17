import Aside from './password-manager/Aside'
import Main from './password-manager/Main'
import '../assets/styles/PasswordManager.css'
import { createContext, useState, useEffect } from 'react'
import EditItem from './password-manager/EditItem'
import { useNavigate } from 'react-router-dom'
import DeleteItem from './password-manager/DeleteItem'
import CreateItem from './password-manager/CreateItem'
import CreateChest from './password-manager/CreateChest'

export const PasswordManagerContext = createContext()

export default function PasswordManager() {
  const [showEditItem, setShowEditItem] = useState(false)
  const [showDeleteItem, setShowDeleteItem] = useState(false)
  const [showCreateItem, setShowCreateItem] = useState(false)
  const [showCreateChest, setShowCreateChest] = useState(false)
  const [item, setItem] = useState({})
  const [chest, setChest] = useState({})
  const [activeCollection, setActiveCollection] = useState('All items')
  const [items, setItems] = useState([])
  const [activeItem, setActiveItem] = useState(0)
  const [activeChest, setActiveChest] = useState(0)
  const [decrypted, setDecrypted] = useState('')

  const navigate = useNavigate()

  const token = localStorage.getItem('jwt')

  useEffect(() => {
    fetch('http://localhost:3030/items/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate('/')
          return
        }

        return res.json()
      })
      .then((data) => setItems(data.items))
  }, [navigate, token])

  useEffect(() => {
    if (!item.password) {
      return
    }

    fetch('http://localhost:3030/decrypt/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: item.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => setDecrypted(data.decrypted))
  }, [item, item.password, token])

  useEffect(() => {
    if (activeItem > 0) {
      setActiveChest(0)
    }
  }, [activeItem])

  useEffect(() => {
    if (activeChest > 0) {
      setActiveItem(0)
    }
  }, [activeChest])

  return (
    <PasswordManagerContext.Provider
      value={{
        activeCollection,
        setActiveCollection,
        showEditItem,
        setShowEditItem,
        item,
        setItem,
        activeItem,
        setActiveItem,
        items,
        token,
        decrypted,
        showDeleteItem,
        setShowDeleteItem,
        setShowCreateItem,
        setShowCreateChest,
        activeChest,
        setActiveChest,
        chest,
        setChest,
      }}
    >
      <div id="password-manager">
        {(showEditItem ||
          showDeleteItem ||
          showCreateItem ||
          showCreateChest) && <div className="modal-active"></div>}

        <Aside />

        <Main />
      </div>

      {showEditItem && <EditItem />}

      {showDeleteItem && <DeleteItem />}

      {showCreateItem && <CreateItem />}

      {showCreateChest && <CreateChest />}
    </PasswordManagerContext.Provider>
  )
}
