import { useNavigate } from 'react-router-dom'
import Stepper from './Stepper'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <Stepper>
      <section id="welcome-section">
        <div id="welcome-message">
          <h1>Welcome to</h1>

          <h2>Omniloq</h2>
        </div>

        <button id="create-account" onClick={() => navigate('/register')}>
          <span>Create new account</span>
        </button>

        <button id="sign-in" onClick={() => navigate('/login')}>
          <span>Sign in</span>
        </button>
      </section>
    </Stepper>
  )
}
