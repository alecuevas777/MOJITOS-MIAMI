import {
  FiBarChart2,
  FiUsers,
  FiTag,
  FiBox,
  FiCreditCard,
  FiSettings,
} from 'react-icons/fi'

export const adminMenuItems = [
  { id: 'dashboard', path: '/admin/dashboard', label: 'Dashboard', icon: FiBarChart2 },
  { id: 'usuarios', path: '/admin/usuarios', label: 'Usuarios', icon: FiUsers },
  { id: 'categorias', path: '/admin/categorias', label: 'Categorías', icon: FiTag },
  { id: 'productos', path: '/admin/productos', label: 'Productos', icon: FiBox },
  { id: 'cupones', path: '/admin/cupones', label: 'Cupones', icon: FiCreditCard },
  { id: 'configuracion', path: '/admin/configuracion', label: 'Configuración', icon: FiSettings },
]

export const adminTheme = {
  bg: '#0B0B0C',
  surface: '#151517',
  border: '#262629',
  text: '#F2F2EF',
  textDim: '#8C8C90',
  accent: '#B7F26A',
}
