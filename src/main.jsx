import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/components/App.jsx'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import './lib/i18n.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
