import { FiClock, FiMapPin } from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { siteConfig } from '@/data/siteConfig'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} id="contacto">
      <div className={styles.grid}>
  <div className={styles.brand}>
  <img
    src={siteConfig.logo}
    alt={siteConfig.name}
    className={styles.logoImage}
  />
</div>
        <div>
          <h3 className={styles.colTitle}>SÍGUENOS</h3>
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
        </div>

        <div>
          <h3 className={styles.colTitle}>
            <FiClock aria-hidden="true" /> HORARIOS
          </h3>
          <p className={styles.text}>{siteConfig.hours}</p>
        </div>

        <div>
          <h3 className={styles.colTitle}>
            <FiMapPin aria-hidden="true" /> UBICACIÓN
          </h3>
          <p className={styles.text}>{siteConfig.address}</p>

          <h3 className={`${styles.colTitle} ${styles.colTitleSpaced}`}>
            <FaWhatsapp aria-hidden="true" /> ESCRÍBENOS
          </h3>
          <a href={siteConfig.social.whatsapp} className={styles.phone}>
            +{siteConfig.phone}
          </a>
        </div>
      </div>

      <p className={styles.copy}>© {year} {siteConfig.name}. Todos los derechos reservados.</p>
    </footer>
  )
}
