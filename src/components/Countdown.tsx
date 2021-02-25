import { useState, useEffect } from 'react'
import { useChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout
const INITIAL_STATE = 0.05 * 60

export default function Countdown() {
  const [time, setTime] = useState(INITIAL_STATE)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const { startNewChallenge } = useChallengesContext()

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(INITIAL_STATE)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <img src="icons/check.svg" alt="Check" style={{ marginLeft: '1rem' }} />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}
