"use client"

import { motion } from "framer-motion"

const desktopImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783140512/ChatGPT_Image_4_jul_2026_12_19_58_a.m._vw8nc4.png"

const mobileImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783140509/ChatGPT_Image_4_jul_2026_12_30_53_a.m._ieynjl.png"

export default function HeroBarraMovil() {
  const handleContact = () => {
    window.open(
      "https://wa.me/569XXXXXXXX?text=Hola,%20quiero%20cotizar%20una%20barra%20móvil.",
      "_blank"
    )
  }

  return (
    <section
      id="barra-movil"
      className="bg-black py-12 lg:py-20"
    >
      <div className="w-full">

        {/* Imagen */}
        <motion.picture
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="block"
        >
          <source
            media="(max-width:1023px)"
            srcSet={mobileImage}
          />

          <img
            src={desktopImage}
            alt="Servicio de Barra Móvil"
            className="
              block
              w-full
              object-cover
              object-center

              h-[420px]
              sm:h-[520px]
              lg:h-auto
            "
          />
        </motion.picture>

        {/* Botón */}
 <motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
  className="flex justify-center mt-8 lg:mt-10"
>
 <a
  href="https://wa.me/569XXXXXXXX?text=Hola,%20quiero%20cotizar%20una%20barra%20móvil."
  target="_blank"
  rel="noopener noreferrer"
  className="
    relative
    inline-block
    px-10 py-4
    sm:px-14 sm:py-5
    bg-black
    text-lime-400
    font-semibold
    uppercase
    tracking-wider
    rounded-md
    overflow-hidden
    border border-lime-500
    transition-all
    duration-300
    group
  "
>
  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
    Cotizar evento
  </span>

  <span
    className="
      absolute
      inset-0
      bg-lime-500
      scale-x-0
      origin-left
      transition-transform
      duration-300
      group-hover:scale-x-100
    "
  />
</a>
</motion.div>
      </div>
    </section>
  )
}