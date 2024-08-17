import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">
              <h1>Omniloq</h1>
            </a>
          </li>

          <li className="nav-link">
            <span>Product</span>

            <FontAwesomeIcon icon={faAngleDown} />
          </li>

          <li className="nav-link">
            <span>Support</span>

            <FontAwesomeIcon icon={faAngleDown} />
          </li>

          <li className="nav-link">
            <span>About</span>

            <FontAwesomeIcon icon={faAngleDown} />
          </li>
        </ul>
      </nav>

      <div>
        <a href="/login">
          <span id="login">Log in</span>
        </a>

        <a href="/register">
          <span id="get-started">Get started</span>
        </a>
      </div>
    </header>
  )
}
