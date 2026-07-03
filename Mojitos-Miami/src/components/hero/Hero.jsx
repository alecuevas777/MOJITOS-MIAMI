import { motion } from 'framer-motion'

const heroImage =
  'https://res.cloudinary.com/dinhrwram/image/upload/v1783038111/ChatGPT_Image_2_jul_2026_08_21_40_p.m._hyxduq.png'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-black"
    >
  <motion.img
  src={heroImage}
  alt="Miami Cocktails Banner"
  className="
    w-full
    h-[550px]
    sm:h-[650px]
    md:h-[720px]
    object-contain
    object-center
    bg-black
  "
/>

      <div className="absolute inset-0 bg-black/5" />
    </section>
  )
}