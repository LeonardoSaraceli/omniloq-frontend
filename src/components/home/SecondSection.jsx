/* eslint-disable react/no-unescaped-entities */
import firstImage from '../../assets/images/first-image-li.png'
import secondImage from '../../assets/images/second-image-li.png'
import thirdImage from '../../assets/images/third-image-li.png'

export default function SecondSection() {
  return (
    <section id='second-section'>
      <h1>Much more than a password manager</h1>

      <ul>
        <li>
          <h2>Everything in one place</h2>

          <img src={firstImage} alt="One place img" />

          <p>
            Passwords, bank accounts, credit cards and everything you need at
            any time.
          </p>
        </li>

        <li>
          <h2>More security, less risk</h2>

          <img src={secondImage} alt="More security img" />

          <p>
            All your passwords are encrypted in our database, ensuring they are
            not leaked.
          </p>
        </li>

        <li>
          <h2>From any device</h2>

          <img src={thirdImage} alt="Any device img" />

          <p>
            Lost your phone? Your data will be the last thing you need to worry
            about, it's safe on our app.
          </p>
        </li>
      </ul>
    </section>
  )
}
