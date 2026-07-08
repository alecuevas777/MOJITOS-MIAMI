import { NavLink } from 'react-router-dom'
import { adminMenuItems } from '@/data/adminConfig'

export default function AdminSidebar({ onNavigate }) {
  return (
    <>
      <p
        className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em]"
        style={{ color: 'var(--admin-text-dim)' }}
      >
        MENÚ
      </p>

      <nav className="flex flex-col gap-1">
        {adminMenuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.id === 'dashboard'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors sm:py-2.5 ${
                  isActive ? '' : 'hover:text-[var(--admin-text)]'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: 'var(--admin-accent)', color: 'var(--admin-bg)' }
                  : { color: 'var(--admin-text-dim)' }
              }
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}
