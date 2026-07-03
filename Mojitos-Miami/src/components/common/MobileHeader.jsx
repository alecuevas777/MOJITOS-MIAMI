import { FiChevronDown, FiMenu } from 'react-icons/fi'
import { siteConfig } from '@/data/siteConfig'
import { useUiStore } from '@/store/uiStore'
import styles from './MobileHeader.module.css'

export default function MobileHeader() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={toggleSidebar}
        aria-label="Menú"
      >
        <FiMenu />
      </button>

      <div className={styles.logo}>
        <img
          src={siteConfig.logo}
          alt={siteConfig.name}
          className={styles.logoImage}
        />
      </div>

      <div className={styles.spacer} aria-hidden="true" />
    </header>
  )
}

export function ViewMoreButton() {
  return (
    <button type="button" className={styles.viewMore}>
      VER MÁS MOJITOS
      <FiChevronDown aria-hidden="true" />
    </button>
  )
}