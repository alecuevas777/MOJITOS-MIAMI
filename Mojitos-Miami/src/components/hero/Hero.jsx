"use client"

import { motion } from "framer-motion"

const desktopImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783038111/ChatGPT_Image_2_jul_2026_08_21_40_p.m._hyxduq.png"
const mobileImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783134210/bannermovil_udm7zm.png"

export default function Hero() {
  const handleScrollToCatalog = () => {
    const catalogSection = document.getElementById("catalogo")
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="inicio" className="relative overflow-hidden bg-black">
      {/* Imagen responsive */}
      <picture>
        <source media="(max-width: 1023px)" srcSet={mobileImage} />
        <motion.img
          src={desktopImage}
          alt="Miami Cocktails Banner"
          className="w-full h-[420px] sm:h-[550px] lg:h-[720px] object-cover object-center"
        />
      </picture>

      {/* Overlay suave */}
      <div className="absolute inset-0 bg-black/10" />

      {/* BOTÓN
          Móvil: centrado y más arriba, para que se vea de inmediato bajo el título.
          Escritorio: a la izquierda, debajo de los títulos y a la izquierda de la imagen. */}
      <div
        className="
          absolute
          left-1/2 -translate-x-1/2 top-[46%]
          lg:left-[24%] lg:-translate-x-1/2 lg:top-[70%]
        "
      >
    <a
  href="#catalogo"
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
  <span className="relative z-10">Ver carta</span>

  {/* Efecto hover (wipe izquierda → derecha) */}
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

  {/* Cambio de color del texto en hover */}
<span
  className="
    absolute
    inset-0
    bg-[##6f9330]
    scale-x-0
    origin-left
    transition-transform
    duration-300
    group-hover:scale-x-100
  "
/>
    </a>
      </div>
    </section>
  )
}
