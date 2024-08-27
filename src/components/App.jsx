import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Welcome from './Welcome'
import Register from './Register'
import Login from './Login'
import PasswordManager from './PasswordManager'
import { createContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const TranslationContext = createContext()

function App() {
  const apiUrl = import.meta.env.VITE_API_URL

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('lng') || language
  )

  useEffect(() => {
    localStorage.setItem('lng', currentLanguage)
  }, [currentLanguage])

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en'
    changeLanguage(newLanguage)
    setCurrentLanguage(newLanguage)
  }

  return (
    <TranslationContext.Provider
      value={{ t, handleChangeLanguage, currentLanguage, apiUrl }}
    >
      <Routes>
        <Route path="*" element={<Home />} />

        <Route path="/welcome" element={<Welcome />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<PasswordManager />} />
      </Routes>
    </TranslationContext.Provider>
  )
}

export default App
