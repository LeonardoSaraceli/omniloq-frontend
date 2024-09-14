/* eslint-disable react/prop-types */
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TranslationContext } from './App'
import { useContext } from 'react'

export default function WarningToast({ setWarningToast }) {
  const { t } = useContext(TranslationContext)

  return (
    <div id="warning-toast">
      <div id="text">
        <span>{t('warning')}</span>

        <p>{t('warning-description')}</p>
      </div>

      <FontAwesomeIcon icon={faX} onClick={() => setWarningToast(false)} />
    </div>
  )
}
