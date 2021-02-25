import { useChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {
  const { level } = useChallengesContext()
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/roavellarm.png" alt="Rodrigo Avellar" />
      <div>
        <strong>Rodrigo Avellar</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}
