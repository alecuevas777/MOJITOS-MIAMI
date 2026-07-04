import { motion } from 'framer-motion'
import { Leaf, FlaskConical, Star, Heart } from 'lucide-react'

const features = [
  { icon: Leaf, title: 'Ingredientes Frescos' },
  { icon: FlaskConical, title: 'Recetas Artesanales' },
  { icon: Star, title: 'Sabores Únicos' },
  { icon: Heart, title: 'Experiencia Inolvidable' },
]

export default function Features() {
  return (
    <section className="relative z-20 bg-black px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8 lg:-mt-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 sm:px-6 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  className="
                    relative
                    flex
                    flex-col
                    items-center
                    gap-2
                    px-3
                    text-center
                    sm:not-last:after:absolute
                    sm:not-last:after:right-0
                    sm:not-last:after:top-1/2
                    sm:not-last:after:h-8
                    sm:not-last:after:w-px
                    sm:not-last:after:-translate-y-1/2
                    sm:not-last:after:bg-white/10
                  "
                >
                  <Icon
                    className="h-5 w-5 sm:h-6 sm:w-6 text-lime-400"
                    strokeWidth={1.75}
                  />

                  <span className="text-[11px] sm:text-sm font-bold uppercase tracking-wide text-white leading-tight">
                    {feature.title}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}