import { motion } from "framer-motion"
import {
  FiBriefcase,
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiUsers,
} from "react-icons/fi"
import {
  FaBirthdayCake,
  FaGlassCheers,
  FaGraduationCap,
} from "react-icons/fa"
import { GiDiamondRing, GiPartyPopper, GiSaltShaker } from "react-icons/gi"
import { useConfigStore } from "@/store/configStore"

const desktopImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783140512/ChatGPT_Image_4_jul_2026_12_19_58_a.m._vw8nc4.png"

const mobileImage =
  "https://res.cloudinary.com/dinhrwram/image/upload/v1783140509/ChatGPT_Image_4_jul_2026_12_30_53_a.m._ieynjl.png"

const CELEBRATIONS = [
  { icon: GiDiamondRing, label: "Matrimonios" },
  { icon: FaBirthdayCake, label: "Cumpleaños" },
  { icon: FiBriefcase, label: "Eventos Corporativos" },
  { icon: FaGraduationCap, label: "Graduaciones" },
  { icon: GiPartyPopper, label: "Fiestas Privadas" },
  { icon: FiUsers, label: "Eventos de Empresas" },
]

const STEPS = [
  {
    number: 1,
    icon: FiMessageCircle,
    title: "Cotizas",
    description: "Cuéntanos los detalles de tu evento.",
  },
  {
    number: 2,
    icon: FiCalendar,
    title: "Confirmamos",
    description: "Te enviamos la propuesta y reservas la fecha.",
  },
  {
    number: 3,
    icon: GiSaltShaker,
    title: "Preparamos",
    description: "Nos encargamos de todo para que no te preocupes.",
  },
  {
    number: 4,
    icon: FaGlassCheers,
    title: "Disfrutas",
    description: "Tú y tus invitados disfrutan de la mejor experiencia.",
  },
]

const WHATSAPP_MESSAGE = "Hola, quiero cotizar una barra móvil."

const BARRA_LIBRE_HEADER = {
  label: "Para tu evento",
  title: "Servicios de barra libre",
  subtitle:
    "Llevamos la barra a tu celebración con cócteles premium. Cotiza por WhatsApp y nos encargamos del resto.",
}

function CelebrationItem({ icon: Icon, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="flex flex-col items-center gap-3 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 sm:h-[72px] sm:w-[72px]">
        <Icon className="h-7 w-7 text-black sm:h-8 sm:w-8" aria-hidden />
      </div>
      <span className="max-w-[9rem] text-[11px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs">
        {label}
      </span>
    </motion.div>
  )
}

function StepItem({ step, index }) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative flex flex-1 flex-col items-center text-center"
    >
      <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-lime-500 text-sm font-bold text-black">
        {step.number}
      </div>

      <div className="mb-3 flex h-12 w-12 items-center justify-center text-lime-400">
        <Icon className="h-8 w-8" aria-hidden />
      </div>

      <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-white sm:text-base">
        {step.title}
      </h4>
      <p className="max-w-[11rem] text-xs leading-relaxed text-white/80 sm:text-sm">
        {step.description}
      </p>
    </motion.div>
  )
}

export default function HeroBarraMovil() {
  const whatsappBase = useConfigStore((state) => state.site.social.whatsapp)
  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section
      id="barra-movil"
      className="bg-black px-8 pt-16 pb-16 max-[1100px]:px-5 max-[1100px]:pt-12"
    >
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.34em] text-[var(--color-text-dim)] sm:text-[11px] sm:tracking-[0.38em]">
          {BARRA_LIBRE_HEADER.label}
        </p>

        <div className="mt-3 sm:mt-4">
          <h2 className="min-w-0 text-[clamp(1.65rem,4.2vw,2.35rem)] font-extrabold leading-[1.12] tracking-[0.02em] text-[var(--color-text)] sm:tracking-[0.025em]">
            {BARRA_LIBRE_HEADER.title}
          </h2>
        </div>

        <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.7] tracking-[0.015em] text-[var(--color-text-muted)] sm:mt-5">
          {BARRA_LIBRE_HEADER.subtitle}
        </p>
      </motion.header>

      <motion.picture
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-6 block"
      >
        <source media="(max-width:1023px)" srcSet={mobileImage} />
        <img
          src={desktopImage}
          alt="Servicio de Barra Móvil"
          className="block h-[420px] w-full object-cover object-center sm:h-[520px] lg:h-auto"
        />
      </motion.picture>

      <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-center"
          >
            <h2 className="text-xl font-bold uppercase tracking-wide text-white sm:text-2xl lg:text-3xl">
              Ideal para cualquier{" "}
              <span className="text-lime-400">celebración</span>
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-6">
              {CELEBRATIONS.map((item, index) => (
                <CelebrationItem key={item.label} {...item} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-center text-xl font-bold uppercase tracking-wide text-white sm:text-2xl lg:text-3xl">
              ¿Cómo funciona?
            </h2>

            <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-stretch lg:gap-8">
              <div className="flex-1">
                <div className="relative">
                  <div
                    className="pointer-events-none absolute left-[12%] right-[12%] top-5 hidden border-t-2 border-dashed border-lime-500 lg:block"
                    aria-hidden
                  />

                  <div className="grid grid-cols-2 gap-8 lg:flex lg:gap-4">
                    {STEPS.map((step, index) => (
                      <StepItem key={step.number} step={step} index={index} />
                    ))}
                  </div>
                </div>
              </div>

              <motion.aside
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex shrink-0 flex-col items-center justify-center border border-lime-500 px-6 py-10 text-center lg:w-72 xl:w-80"
              >
                <FaGlassCheers
                  className="mb-6 h-10 w-10 text-lime-400"
                  aria-hidden
                />
                <p className="text-sm font-bold uppercase leading-relaxed tracking-wide text-white sm:text-base">
                  Tú{" "}
                  <span className="text-lime-400">disfrutas</span>, nosotros nos
                  encargamos del resto.
                </p>
                <FiHeart
                  className="mt-6 h-5 w-5 text-lime-400"
                  aria-hidden
                />
              </motion.aside>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center pt-2"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block overflow-hidden rounded-md border border-lime-500 bg-black px-10 py-4 font-semibold uppercase tracking-wider text-lime-400 transition-all duration-300 sm:px-14 sm:py-5"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Cotizar evento
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-lime-500 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </motion.div>
        </div>
    </section>
  )
}
