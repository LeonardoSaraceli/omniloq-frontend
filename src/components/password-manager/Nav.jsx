import { faFolder, faStar } from '@fortawesome/free-regular-svg-icons'
import { faAngleDown, faPlus, faVault } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PasswordManagerContext } from '../PasswordManager'

export default function Nav() {
  const { setActiveCollection, setShowCreateChest, setActiveChest } = useContext(
    PasswordManagerContext
  )

  const token = localStorage.getItem('jwt')

  const navigate = useNavigate()

  const [chests, setChests] = useState([])

  useEffect(() => {
    fetch('http://localhost:3030/chests/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate('/')
        }

        return res.json()
      })
      .then((data) => setChests(data.chests))
  }, [token, navigate])

  return (
    <nav id="password-manager-nav">
      <ul>
        <li onClick={() => setActiveCollection('All items')}>
          <FontAwesomeIcon icon={faVault} className="nav-icon" />

          <span>All items</span>
        </li>

        <li onClick={() => setActiveCollection('Favourites')}>
          <FontAwesomeIcon icon={faStar} className="nav-icon" />

          <span>Favourites</span>
        </li>

        <ul>
          <div id="nav-chests">
            <FontAwesomeIcon icon={faAngleDown} className="chest-icon" />

            <span>Chests</span>

            <FontAwesomeIcon
              icon={faPlus}
              className="chest-icon"
              onClick={() => setShowCreateChest(true)}
            />
          </div>

          {chests.map((chest) => (
            <li onClick={() => [setActiveCollection(chest.name), setActiveChest(chest.id)]} key={chest.id}>
              <FontAwesomeIcon icon={faFolder} className="nav-icon" />

              <span>{chest.name}</span>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  )
}
