import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HomeFooter() {
  return (
    <footer>
      <button>
        <span>English</span>

        <FontAwesomeIcon icon={faAngleDown} />
      </button>

      <ul>
        <li id="features">
          <h3>Features</h3>

          <a href="/password-manager">
            <span>Password Manager</span>
          </a>

          <a href="/">
            <h1>Omniloq</h1>
          </a>
        </li>

        <li id="support">
          <h3>Support</h3>

          <a href="/tour">
            <span>App Guide</span>
          </a>
        </li>

        <li id="company">
          <h3>Company</h3>

          <a href="/about">
            <span>About</span>
          </a>
        </li>
      </ul>
    </footer>
  )
}
