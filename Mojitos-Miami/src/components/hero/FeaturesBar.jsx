import { FiHeart, FiStar } from 'react-icons/fi'
import { FaLeaf } from 'react-icons/fa'
import { GiTestTubes } from 'react-icons/gi'
import { features } from '@/data/menuData'
import styles from './FeaturesBar.module.css'

const featureIcons = {
  leaf: FaLeaf,
  flask: GiTestTubes,
  star: FiStar,
  heart: FiHeart,
}

export default function FeaturesBar() {
  return (
    <div className={styles.bar}>
      {features.map((feature) => {
        const Icon = featureIcons[feature.icon]

        return (
          <div key={feature.id} className={styles.item}>
            <Icon className={styles.icon} aria-hidden="true" />
            <span>{feature.label.toUpperCase()}</span>
          </div>
        )
      })}
    </div>
  )
}
