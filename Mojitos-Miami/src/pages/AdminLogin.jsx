import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { siteConfig } from '@/data/siteConfig'
import { adminTheme } from '@/data/adminConfig'
import { useAuthStore } from '@/store/authStore'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const status = useAuthStore((state) => state.status)
  const login = useAuthStore((state) => state.login)
  const checkSession = useAuthStore((state) => state.checkSession)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  const redirectTo = location.state?.from || '/admin/dashboard'

  useEffect(() => {
    checkSession().finally(() => setIsChecking(false))
  }, [checkSession])

  if (!isChecking && status === 'authenticated') {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email.trim() || !password) {
      toast.error('Completa correo y contraseña')
      return
    }

    setIsSubmitting(true)

    try {
      await login(email.trim(), password)
      toast.success('Bienvenido al panel')
      navigate(redirectTo, { replace: true })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{ backgroundColor: adminTheme.bg, color: adminTheme.text }}
    >
      <div
        className="w-full max-w-[400px] rounded-2xl border px-5 py-7 shadow-2xl sm:px-8 sm:py-8"
        style={{
          backgroundColor: adminTheme.surface,
          borderColor: adminTheme.border,
        }}
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <img
            src={siteConfig.logo}
            alt={siteConfig.name}
            className="block object-contain"
            style={{
              height: '36px',
              width: 'auto',
              maxWidth: '88px',
              marginBottom: '0.75rem',
            }}
          />
          <p
            className="text-[10px] font-bold tracking-[0.2em]"
            style={{ color: adminTheme.textDim }}
          >
            PANEL ADMINISTRATIVO
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Iniciar sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span
              className="mb-2 block text-sm font-semibold"
              style={{ color: adminTheme.textDim }}
            >
              Correo
            </span>
            <input
              type="email"
              autoComplete="username"
              placeholder="admin@mojito.cl"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--admin-accent)]"
              style={{
                backgroundColor: adminTheme.bg,
                borderColor: adminTheme.border,
                color: adminTheme.text,
              }}
            />
          </label>

          <label className="block">
            <span
              className="mb-2 block text-sm font-semibold"
              style={{ color: adminTheme.textDim }}
            >
              Contraseña
            </span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-[var(--admin-accent)]"
                style={{
                  backgroundColor: adminTheme.bg,
                  borderColor: adminTheme.border,
                  color: adminTheme.text,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: adminTheme.textDim }}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isSubmitting || isChecking}
            className="w-full rounded-full py-3.5 text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
          >
            {isSubmitting ? 'Ingresando...' : 'Entrar al panel'}
          </button>
        </form>

        <div
          className="mt-8 pt-6 text-center text-sm"
          style={{ borderTop: `1px solid ${adminTheme.border}` }}
        >
          <Link
            to="/"
            className="inline-block font-semibold underline-offset-4 transition-colors hover:underline"
            style={{ color: adminTheme.accent }}
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
