import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import firstImage from '../../assets/images/first-section-img.png'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function FirstSection() {
  return (
    <section id="first-section">
      <article>
        <h1>Still using notepad to keep your passwords?</h1>

        <p>
          Protect yourself and your entire family with an application that will
          store your most valuable information safely.
        </p>

        <ul>
          <li>
            <a href="/welcome" id="welcome">
              <span>Try it out</span>
            </a>
          </li>

          <li>
            <a href="/tour" id="tour">
              <span>Take a tour of the app</span>

              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </li>
        </ul>
      </article>

      <img src={firstImage} alt="Cybersecurity Img" />
    </section>
  )
}
