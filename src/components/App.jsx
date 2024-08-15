import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Welcome from './Welcome'
import Register from './Register'
import Login from './Login'
import PasswordManager from './PasswordManager'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/welcome" element={<Welcome />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<PasswordManager />} />
      </Routes>
    </>
  )
}

export default App
