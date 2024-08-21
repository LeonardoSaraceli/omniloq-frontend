import { useContext } from 'react'
import { TranslationContext } from '../App'

export default function Header() {
  const { t } = useContext(TranslationContext)

  return (
    <header>
      <a href="/">
        <h1>Omniloq</h1>
      </a>

      <div>
        <a href="/login">
          <span id="login">{t('log-in')}</span>
        </a>

        <a href="/register">
          <span id="get-started">{t('get-started')}</span>
        </a>
      </div>
    </header>
  )
}
