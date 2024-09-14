import Aside from './password-manager/Aside'
import Main from './password-manager/Main'
import '../assets/styles/PasswordManager.css'
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react'
import EditItem from './password-manager/EditItem'
import { useNavigate } from 'react-router-dom'
import DeleteItem from './password-manager/DeleteItem'
import CreateItem from './password-manager/CreateItem'
import CreateChest from './password-manager/CreateChest'
import EditChest from './password-manager/EditChest'
import DeleteChest from './password-manager/DeleteChest'
import CreateTicket from './password-manager/CreateTicket'
import EditItemFeatures from './password-manager/EditItemFeatures'
import AddWebsite from './password-manager/AddWebsite'
import AddToChest from './password-manager/AddToChest'
import EditChestFeatures from './password-manager/EditChestFeatures'
import AddFromChest from './password-manager/AddFromChest'
import Settings from './password-manager/Settings'
import ManageAccount from './password-manager/ManageAccount'
import EditProfile from './password-manager/EditProfile'
import DeleteAccount from './password-manager/DeleteAccounts'
import ConfirmPassword from './password-manager/ConfirmPassword'
import { TranslationContext } from './App'

export const PasswordManagerContext = createContext()

export default function PasswordManager() {
  const { apiUrl } = useContext(TranslationContext)

  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})
  const [chests, setChests] = useState([])
  const [showEditItem, setShowEditItem] = useState(false)
  const [showDeleteItem, setShowDeleteItem] = useState(false)
  const [showCreateItem, setShowCreateItem] = useState(false)
  const [showCreateChest, setShowCreateChest] = useState(false)
  const [showEditChest, setShowEditChest] = useState(false)
  const [showDeleteChest, setShowDeleteChest] = useState(false)
  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [showEditItemFeatures, setShowEditItemFeatures] = useState(false)
  const [showAddWebsite, setShowAddWebsite] = useState(false)
  const [showAddToChest, setShowAddToChest] = useState(false)
  const [showEditChestFeatures, setShowEditChestFeatures] = useState(false)
  const [showAddFromChest, setShowAddFromChest] = useState(false)
  const [item, setItem] = useState({})
  const [chest, setChest] = useState({})
  const [activeCollection, setActiveCollection] = useState('All items')
  const [items, setItems] = useState([])
  const [activeItem, setActiveItem] = useState(0)
  const [activeChest, setActiveChest] = useState(0)
  const [decrypted, setDecrypted] = useState('')
  const [showMenuAccount, setShowMenuAccount] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showManageAccount, setShowManageAccount] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validShowPasswordToken, setValidShowPasswordToken] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [showChestCollection, setShowChestCollection] = useState(false)

  localStorage.setItem('theme', theme)

  const modalRef = useRef(null)

  const navigate = useNavigate()

  const token = localStorage.getItem('jwt')

  const pwToken = localStorage.getItem('pw')

  useEffect(() => {
    fetch(`${apiUrl}chests/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate('/')
        }

        return res.json()
      })
      .then((data) => setChests(data.chests))
  }, [token, navigate, apiUrl])

  useEffect(() => {
    fetch(`${apiUrl}items/`, {
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
  }, [apiUrl, navigate, token])

  const fetchItems = useCallback(() => {
    fetch(`${apiUrl}items/`, {
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
  }, [apiUrl, token, navigate])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const fetchChests = useCallback(() => {
    fetch(`${apiUrl}chests/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate('/')
        }

        return res.json()
      })
      .then((data) => setChests(data.chests))
  }, [apiUrl, navigate, token])

  useEffect(() => {
    fetchChests()
  }, [fetchChests])

  useEffect(() => {
    if (!item.password) {
      return
    }

    fetch(`${apiUrl}decrypt/`, {
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
  }, [apiUrl, item, item.password, token])

  const fetchItem = useCallback(() => {
    if (activeItem === 0) {
      return
    }

    fetch(`${apiUrl}items/${activeItem}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 404) {
          return
        }

        return res.json()
      })
      .then((data) => {
        setItem(data.item)
      })
  }, [activeItem, apiUrl, token])

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  const fetchChest = useCallback(() => {
    if (activeChest === 0) {
      return
    }

    fetch(`${apiUrl}chests/${activeChest}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          return
        }

        return res.json()
      })
      .then((data) => setChest(data.chest))
  }, [activeChest, apiUrl, token])

  useEffect(() => {
    fetchChest()
  }, [fetchChest])

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

  useEffect(() => {
    fetch(`${apiUrl}users/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return
        }

        return res.json()
      })
      .then((data) => setUser(data.user))
  }, [apiUrl, token])

  useEffect(() => {
    fetch(`${apiUrl}profile/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return
        }

        return res.json()
      })
      .then((data) => setProfile(data.profile))
  }, [apiUrl, token])

  const fetchProfile = useCallback(() => {
    fetch(`${apiUrl}profile/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return
        }

        return res.json()
      })
      .then((data) => setProfile(data.profile))
  }, [apiUrl, token])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (showSettings || showManageAccount) {
      setShowMenuAccount(false)
    }
  }, [showManageAccount, showSettings])

  useEffect(() => {
    const account = document.getElementById('account')

    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !account.contains(event.target)
      ) {
        setShowMenuAccount(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!pwToken) {
      setValidShowPasswordToken(false)
      return
    }

    fetch(`${apiUrl}users/verify-token`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pwToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          setValidShowPasswordToken(false)
          localStorage.removeItem('pw')
          return
        }

        return res.json()
      })
      .then((data) => {
        if (!data) {
          return
        }

        setValidShowPasswordToken(data.valid)
      })
  }, [apiUrl, pwToken])

  return (
    <PasswordManagerContext.Provider
      value={{
        user,
        profile,
        chests,
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
        setShowEditChest,
        setShowDeleteChest,
        setShowCreateTicket,
        setShowEditItemFeatures,
        setShowAddWebsite,
        setShowAddToChest,
        setShowEditChestFeatures,
        setShowAddFromChest,
        showMenuAccount,
        setShowMenuAccount,
        setShowSettings,
        setShowManageAccount,
        setShowEditProfile,
        setShowDeleteAccount,
        fetchItems,
        fetchChests,
        fetchItem,
        fetchChest,
        fetchProfile,
        modalRef,
        setShowConfirmPassword,
        validShowPasswordToken,
        theme,
        setTheme,
        showChestCollection,
        setShowChestCollection,
      }}
    >
      <div id="password-manager">
        {(showEditItem ||
          showDeleteItem ||
          showCreateItem ||
          showCreateChest ||
          showEditChest ||
          showDeleteChest ||
          showCreateTicket ||
          showEditItemFeatures ||
          showEditChestFeatures ||
          showSettings ||
          showManageAccount ||
          showConfirmPassword) && (
          <div id={theme} className="modal-active"></div>
        )}

        {(showAddWebsite ||
          showAddToChest ||
          showAddFromChest ||
          showEditProfile ||
          showDeleteAccount) && (
          <div id={theme} className="modal-above-active"></div>
        )}

        <Aside />

        <Main />
      </div>

      {showEditItem && <EditItem />}

      {showDeleteItem && <DeleteItem />}

      {showCreateItem && <CreateItem />}

      {showCreateChest && <CreateChest />}

      {showEditChest && <EditChest />}

      {showDeleteChest && <DeleteChest />}

      {showCreateTicket && <CreateTicket />}

      {showEditItemFeatures && <EditItemFeatures />}

      {showAddWebsite && <AddWebsite />}

      {showAddToChest && <AddToChest />}

      {showEditChestFeatures && <EditChestFeatures />}

      {showAddFromChest && <AddFromChest />}

      {showSettings && <Settings />}

      {showManageAccount && <ManageAccount />}

      {showEditProfile && <EditProfile />}

      {showDeleteAccount && <DeleteAccount />}

      {showConfirmPassword && <ConfirmPassword />}
    </PasswordManagerContext.Provider>
  )
}
