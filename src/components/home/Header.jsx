export default function Header() {
  return (
    <header>
      <a href="/">
        <h1>Omniloq</h1>
      </a>

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
