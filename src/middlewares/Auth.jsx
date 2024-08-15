import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth({ children }) {
  const navigate = useNavigate()

  const token = localStorage.getItem('jwt')

  const [invalidToken, setInvalidToken] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3030/token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        setInvalidToken(true)
        return
      }
    })
  }, [token])

  useEffect(() => {
    if (invalidToken) {
      navigate('/')
    }
  }, [invalidToken, navigate])

  return children
}
