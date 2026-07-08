import { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'
import { getStoreStatus } from '@/utils/storeHours'
import { useConfigStore } from '@/store/configStore'

export default function StoreStatusBadge() {
  const horarios = useConfigStore((state) => state.site.horarios)
  const [status, setStatus] = useState(() => getStoreStatus(new Date(), horarios))

  useEffect(() => {
    const tick = () => setStatus(getStoreStatus(new Date(), horarios))
    tick()
    const interval = window.setInterval(tick, 60_000)
    return () => window.clearInterval(interval)
  }, [horarios])

  return (
    <div
      className="absolute right-3 top-3 z-10 max-w-[min(240px,78vw)] rounded-xl border border-white/15 bg-black/55 px-3.5 py-2.5 text-right shadow-lg backdrop-blur-md sm:right-5 sm:top-5 sm:max-w-[280px] sm:px-4 sm:py-3"
      aria-live="polite"
    >
      <p className="flex items-center justify-end gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:text-xs sm:tracking-[0.16em]">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${status.isOpen ? 'bg-[var(--color-primary)]' : 'bg-red-400'}`}
          aria-hidden
        />
        {status.label}
      </p>

      {status.hours && (
        <p className="mt-1 flex items-center justify-end gap-1.5 text-[10px] font-medium leading-snug tracking-[0.02em] text-white/85 sm:text-[11px]">
          <FiClock className="shrink-0 text-white" size={12} aria-hidden />
          <span>{status.hours}</span>
        </p>
      )}
    </div>
  )
}
