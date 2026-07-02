import { FiChevronDown } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { siteConfig } from '@/data/siteConfig'
import styles from './Hero.module.css'

const heroImage =
  'https://res.cloudinary.com/dinhrwram/image/upload/v1782840090/Dise%C3%B1o_sin_t%C3%ADtulo_28_1_rhe8ds.png'

const openHours = siteConfig.hours.replace(/^Lunes a Domingo\s*/i, '')

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <img
        src={heroImage}
        alt=""
        className={styles.bgImage}
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.status}>
        <div className={styles.statusRow}>
          <span className={styles.statusDot} />
          <span>ABIERTO AHORA</span>
        </div>
        <span className={styles.statusHours}>{openHours}</span>
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          EL SABOR
          <span className={styles.titleScript}>que te mueve</span>
        </h1>
        <p className={styles.description}>{siteConfig.description}</p>

        <div className={styles.actions}>
          <a href="#catalogo" className={styles.cta}>
            VER CARTA
            <FiChevronDown aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
