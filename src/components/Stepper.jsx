/* eslint-disable react/prop-types */
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoStepper from '../assets/images/logo-stepper.svg'
import '../assets/styles/Stepper.css'

export default function Stepper({ children }) {
  return (
    <main id="stepper">
      <aside>
        <button>
          <span>English</span>

          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </aside>

      <a href="/" id='logo-stepper'>
        <img src={logoStepper} alt="Omniloq logo" />
      </a>

      {children}
    </main>
  )
}
