"use client"

import { motion } from "framer-motion"
import StoreStatusBadge from "@/components/hero/StoreStatusBadge"
import { useConfigStore } from "@/store/configStore"

const fallbackDesktopImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783038111/ChatGPT_Image_2_jul_2026_08_21_40_p.m._hyxduq.png"
const fallbackMobileImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783134210/bannermovil_udm7zm.png"

export default function Hero() {
  const hero = useConfigStore((state) => state.site.hero)
  const desktopImage = hero.image || fallbackDesktopImage
  const mobileImage = hero.imageMobile || fallbackMobileImage

  return (
    <section id="inicio" className="relative overflow-hidden bg-black">
      <picture>
        <source media="(max-width: 1023px)" srcSet={mobileImage} />
        <motion.img
          src={desktopImage}
          alt="Banner principal"
          className="w-full h-[420px] sm:h-[550px] lg:h-[720px] object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-black/10" />

      <StoreStatusBadge />

      <div
        className="
          absolute left-1/2 top-[56%] w-full -translate-x-1/2 px-4 text-center
          lg:left-[24%] lg:top-[70%] lg:w-auto lg:px-0 lg:text-left
        "
      >
        <a
          href="#catalogo"
          className="
            group relative inline-block
            px-10 py-4
            sm:px-14 sm:py-5
            bg-black text-lime-400 font-semibold uppercase tracking-wider
            rounded-md overflow-hidden border border-lime-500
            transition-all duration-300
          "
        >
          <span className="relative z-10">Ver carta</span>
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
      </div>
    </section>
  )
}
