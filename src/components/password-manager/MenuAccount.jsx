import { useContext } from 'react'
import { PasswordManagerContext } from '../PasswordManager'
import { TranslationContext } from '../App'

export default function MenuAccount() {
  const { theme, modalRef, setShowSettings, setShowManageAccount } = useContext(
    PasswordManagerContext
  )

  const { t } = useContext(TranslationContext)

  return (
    <div id="menu-account" ref={modalRef} className={theme}>
      <span className={theme} onClick={() => setShowManageAccount(true)}>
        {t('manage-account')}
      </span>

      <div id="divisor"></div>

      <span className={theme} onClick={() => setShowSettings(true)}>
        {t('settings')}
      </span>
    </div>
  )
}
