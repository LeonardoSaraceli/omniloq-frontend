/* eslint-disable react/no-unescaped-entities */
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function ThirdSection() {
  const [showFirstMessage, setShowFirstMessage] = useState(false)
  const [showSecondMessage, setShowSecondMessage] = useState(false)
  const [showThirdMessage, setShowThirdMessage] = useState(false)
  const [showFourthMessage, setShowFourthMessage] = useState(false)

  const handleMessageDisplay = (message, setMessage) => {
    return () => setMessage(!message)
  }

  return (
    <section id="third-section">
      <h1>FAQ</h1>

      <article>
        <div className={showFirstMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showFirstMessage,
              setShowFirstMessage
            )}
          >
            <span>What's an password manager?</span>

            <FontAwesomeIcon
              icon={showFirstMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showFirstMessage && (
            <p>
              Omniloq makes it easy to store your passwords. In a practical way,
              we encrypt all your information to prevent your password from
              being leaked, using a simple application so that you always have
              secure access to your accounts.
            </p>
          )}

          <div className="bottom-div"></div>
        </div>

        <div className={showSecondMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showSecondMessage,
              setShowSecondMessage
            )}
          >
            <span>Is Omniloq safe?</span>

            <FontAwesomeIcon
              icon={showSecondMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showSecondMessage && (
            <p>
              Yes, we work with cutting-edge technology to encrypt all your
              passwords. We change each one when entering our database, thus
              ensuring security so that no one has access to it.
            </p>
          )}

          <div className="bottom-div"></div>
        </div>

        <div className={showThirdMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showThirdMessage,
              setShowThirdMessage
            )}
          >
            <span>Does Omniloq store the passwords in the cloud?</span>

            <FontAwesomeIcon
              icon={showThirdMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showThirdMessage && (
            <p>Yes, all your data is located on our servers.</p>
          )}

          <div className="bottom-div"></div>
        </div>

        <div className={showFourthMessage ? 'active' : 'not-active'}>
          <div
            className="summary"
            onClick={handleMessageDisplay(
              showFourthMessage,
              setShowFourthMessage
            )}
          >
            <span>Is Omniloq free to use?</span>

            <FontAwesomeIcon
              icon={showFourthMessage ? faAngleUp : faAngleDown}
              className="icon"
            />
          </div>

          {showFourthMessage && (
            <p>
              Yes, Omniloq offers fully encrypted, convenient and useful
              password storage for free for your use.
            </p>
          )}

          <div className="bottom-div"></div>
        </div>
      </article>
    </section>
  )
}
