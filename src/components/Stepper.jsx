/* eslint-disable react/prop-types */
import logoStepper from '../assets/images/logo-stepper.svg'
import '../assets/styles/Stepper.css'

export default function Stepper({ children }) {
  return (
    <main id="stepper">
      <a href="/" id="logo-stepper">
        <img src={logoStepper} alt="Omniloq logo" />
      </a>

      <aside>
        <select>
          <option value="en">English</option>

          <option value="pt">Portuguese</option>
        </select>
      </aside>

      {children}
    </main>
  )
}
