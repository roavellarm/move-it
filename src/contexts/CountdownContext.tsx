import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useChallengesContext } from './ChallengesContext'

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownContextProps {
  children: ReactNode
}

const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout
const INITIAL_STATE = 25 * 60

export function CountdownProvider({ children }: CountdownContextProps) {
  const { startNewChallenge } = useChallengesContext()
  const [time, setTime] = useState(INITIAL_STATE)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
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

  const value = { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown }

  return <CountdownContext.Provider value={value}>{children}</CountdownContext.Provider>
}

export function useCountdownContext() {
  return useContext(CountdownContext)
}
