import { useNavigate } from 'react-router-dom'
import Stepper from './Stepper'
import { TranslationContext } from './App'
import { useContext } from 'react'
import WarningToast from './WarningToast'

export default function Welcome() {
  const { t, warningToast, setWarningToast } = useContext(TranslationContext)

  const navigate = useNavigate()

  return (
    <Stepper>
      <section id="welcome-section">
        {warningToast && <WarningToast setWarningToast={setWarningToast} />}

        <div id="welcome-message">
          <h1>{t('welcome-to')}</h1>

          <h2>Omniloq</h2>
        </div>

        <button id="create-account" onClick={() => navigate('/register')}>
          <span>{t('create-new-account')}</span>
        </button>

        <button id="sign-in" onClick={() => navigate('/login')}>
          <span>{t('sign-in')}</span>
        </button>
      </section>
    </Stepper>
  )
}
