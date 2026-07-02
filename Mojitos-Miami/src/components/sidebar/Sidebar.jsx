import { FiBookOpen, FiHome } from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { navLinks } from '@/data/menuData'
import { siteConfig } from '@/data/siteConfig'
import { useUiStore } from '@/store/uiStore'
import { cn } from '@/utils'
import styles from './Sidebar.module.css'

const navIcons = {
  home: FiHome,
  book: FiBookOpen,
}

export default function Sidebar() {
  const activeNav = useUiStore((state) => state.activeNav)
  const setActiveNav = useUiStore((state) => state.setActiveNav)
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen)
  const closeSidebar = useUiStore((state) => state.closeSidebar)

  const handleNavClick = (id) => {
    setActiveNav(id)
    closeSidebar()
  }

  return (
    <>
      <div
        className={cn(styles.overlay, isSidebarOpen && styles.overlayVisible)}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside className={cn(styles.sidebar, isSidebarOpen && styles.sidebarOpen)}>
        <div className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true">
            🌿
          </span>
          <div>
            <span className={styles.logoBrand}>{siteConfig.brand}</span>
            <span className={styles.logoSuffix}>{siteConfig.brandSuffix}</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul>
            {navLinks.map((link) => {
              const Icon = navIcons[link.icon]
              const isActive = activeNav === link.id

              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={cn(styles.navLink, isActive && styles.navLinkActive)}
                    onClick={() => handleNavClick(link.id)}
                  >
                    <Icon aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.social}>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram aria-hidden="true" />
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook aria-hidden="true" />
          </a>
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp aria-hidden="true" />
          </a>
        </div>

      
      </aside>
    </>
  )
}
