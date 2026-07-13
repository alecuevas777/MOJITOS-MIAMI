import { FiClock } from 'react-icons/fi'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { useConfigStore, formatHoursLabel } from '@/store/configStore'
import { formatPhone } from '@/utils'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const site = useConfigStore((state) => state.site)
  const hours = formatHoursLabel(site.horarios)

  return (
    <footer className={styles.footer} id="contacto">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <img src={site.logo} alt={site.name} className={styles.logoImage} />
        </div>

        <div>
          <h3 className={styles.colTitle}>SÍGUENOS</h3>
          <div className={styles.social}>
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            )}
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h3 className={styles.colTitle}>
            <FiClock aria-hidden="true" /> HORARIOS
          </h3>
          <p className={styles.text}>{hours}</p>
        </div>

        <div>
          <h3 className={styles.colTitle}>
            <FaWhatsapp aria-hidden="true" /> ESCRÍBENOS
          </h3>
          <a href={site.social.whatsapp} className={styles.phone}>
            {formatPhone(site.phone)}
          </a>
        </div>
      </div>

      <p className={styles.copy}>
        © {year} {site.name}. Todos los derechos reservados.
      </p>
    </footer>
  )
}
