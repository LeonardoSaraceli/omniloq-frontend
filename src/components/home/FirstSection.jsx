import firstImage from '../../assets/images/first-section-img.png'

export default function FirstSection() {
  return (
    <section id="first-section">
      <article>
        <h1>Still using notepad to keep your passwords?</h1>

        <p>
          Protect yourself and your entire family with an application that will
          store your most valuable information safely.
        </p>

        <a href="/welcome" id="welcome">
          <span>Try it out</span>
        </a>
      </article>

      <img src={firstImage} alt="Cybersecurity Img" />
    </section>
  )
}
