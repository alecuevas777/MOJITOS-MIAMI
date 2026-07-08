import { useEffect, useState } from 'react'
import { FiUsers, FiTag, FiBox, FiCreditCard } from 'react-icons/fi'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import StatCard from '@/components/admin/StatCard'
import { getAdminStats } from '@/services/adminApi'

const statConfig = [
  { key: 'usuarios', label: 'Usuarios', icon: FiUsers },
  { key: 'categorias', label: 'Categorías', icon: FiTag },
  { key: 'productos', label: 'Productos', icon: FiBox },
  { key: 'cupones', label: 'Cupones', icon: FiCreditCard },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Resumen en tiempo real desde la base de datos."
      />

      {error && (
        <p className="mt-6 text-sm text-red-400">{error}</p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {statConfig.map(({ key, label, icon }) => (
          <StatCard
            key={key}
            icon={icon}
            label={label}
            value={stats ? stats[key] : '—'}
          />
        ))}
      </div>
    </>
  )
}
