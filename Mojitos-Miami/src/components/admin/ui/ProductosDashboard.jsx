import { useCallback, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminTable from '@/components/admin/AdminTable'
import AdminListToolbar from '@/components/admin/AdminListToolbar'
import AdminPagination from '@/components/admin/AdminPagination'
import AdminRowActions from '@/components/admin/AdminRowActions'
import AdminModal, { AdminField, AdminFormActions, adminInputClass, adminInputStyle } from '@/components/admin/AdminModal'
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog'
import ProductImageInput from '@/components/admin/ProductImageInput'
import ProductoVariantesEditor from '@/components/admin/ProductoVariantesEditor'
import {
  createProducto,
  deleteProducto,
  getAdminCategorias,
  getAdminProductos,
  updateProducto,
} from '@/services/adminApi'
import { formatPrice } from '@/utils'
import { useAdminListControls } from '@/hooks/useAdminListControls'

const emptyForm = {
  nom_producto: '',
  precio_producto: '',
  categoria_id: '',
  descripcion_producto: '',
  img_prod: '',
  descuento_porcentaje: '',
  stock_disponible: '',
  aviso_stock_desde: '',
  caracteristicas: '{}',
  usa_variantes: false,
  mostrar_imagen_variantes: false,
  max_sabores: '1',
}

function toPayload(form) {
  return {
    nom_producto: form.nom_producto.trim(),
    precio_producto: form.usa_variantes ? null : Number(form.precio_producto),
    categoria_id: Number(form.categoria_id),
    descripcion_producto: form.descripcion_producto.trim(),
    img_prod: form.img_prod.trim(),
    descuento_porcentaje: form.descuento_porcentaje !== '' ? Number(form.descuento_porcentaje) : null,
    stock_disponible: form.stock_disponible !== '' ? Number(form.stock_disponible) : null,
    aviso_stock_desde: form.aviso_stock_desde !== '' ? Number(form.aviso_stock_desde) : null,
    presentacion: '',
    detalles: '',
    caracteristicas: form.caracteristicas || '{}',
    usa_variantes: form.usa_variantes,
    mostrar_imagen_variantes: form.usa_variantes ? form.mostrar_imagen_variantes : false,
    max_sabores: form.usa_variantes ? Number(form.max_sabores) || 1 : 1,
  }
}

export default function ProductosDashboard() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [isSaving, setIsSaving] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [variantes, setVariantes] = useState([])

  const list = useAdminListControls(productos, {
    searchKeys: [
      'nom_producto',
      'nom_categoria',
      'descripcion_producto',
      (row) => String(row.id_producto ?? ''),
    ],
  })

  const loadData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [productosRes, categoriasRes] = await Promise.all([
        getAdminProductos(),
        getAdminCategorias(),
      ])
      setProductos(productosRes.data ?? [])
      setCategorias(categoriasRes.data ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const openCreate = () => {
    setForm({
      ...emptyForm,
      categoria_id: categorias[0]?.id_categoria?.toString() ?? '',
    })
    setVariantes([])
    setModal({ mode: 'create' })
  }

  const openEdit = (row) => {
    setVariantes(row.variantes ?? [])
    setForm({
      nom_producto: row.nom_producto ?? '',
      precio_producto: row.precio_producto ?? '',
      categoria_id: String(row.categoria_id ?? ''),
      descripcion_producto: row.descripcion_producto ?? '',
      img_prod: row.img_prod ?? '',
      descuento_porcentaje: row.descuento_porcentaje ?? '',
      stock_disponible: row.stock_disponible ?? '',
      aviso_stock_desde: row.aviso_stock_desde ?? '',
      caracteristicas: row.caracteristicas ?? '{}',
      usa_variantes: Boolean(Number(row.usa_variantes)),
      mostrar_imagen_variantes: Boolean(Number(row.mostrar_imagen_variantes)),
      max_sabores: String(Math.min(2, Math.max(1, Number(row.max_sabores) || 1))),
    })
    setModal({ mode: 'edit', id: row.id_producto })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom_producto.trim()) {
      toast.error('El nombre es obligatorio')
      return
    }
    if (!form.categoria_id) {
      toast.error('Selecciona una categoría')
      return
    }
    if (!form.usa_variantes && form.precio_producto === '') {
      toast.error('El precio es obligatorio')
      return
    }

    setIsSaving(true)
    try {
      const payload = toPayload(form)
      if (modal.mode === 'create') {
        const res = await createProducto(payload)
        await loadData()
        if (form.usa_variantes) {
          setModal({ mode: 'edit', id: res.data.id_producto })
          setVariantes(res.data.variantes ?? [])
          toast.success('Producto creado. Agrega las variantes abajo.')
          return
        }
        toast.success('Producto creado')
      } else {
        await updateProducto(modal.id, payload)
        toast.success('Producto actualizado')
      }
      setModal(null)
      await loadData()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!toDelete) return
    try {
      await deleteProducto(toDelete.id_producto)
      toast.success('Producto eliminado')
      setToDelete(null)
      await loadData()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const columns = [
    { key: 'id', label: 'ID', render: (row) => row.id_producto },
    { key: 'nombre', label: 'Producto', render: (row) => row.nom_producto },
    { key: 'categoria', label: 'Categoría', render: (row) => row.nom_categoria || '—' },
    {
      key: 'precio',
      label: 'Precio',
      render: (row) => {
        if (Number(row.usa_variantes)) {
          return row.precio_desde != null
            ? `Desde ${formatPrice(Number(row.precio_desde))}`
            : 'Variantes'
        }
        return row.precio_producto != null ? formatPrice(Number(row.precio_producto)) : '—'
      },
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (row) => (row.stock_disponible != null ? row.stock_disponible : '—'),
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (row) => (
        <AdminRowActions onEdit={() => openEdit(row)} onDelete={() => setToDelete(row)} />
      ),
    },
  ]

  return (
    <>
      <AdminPageHeader
        title="Productos"
        description="Listado y gestión de productos del menú."
        action={
          <AdminListToolbar
            searchValue={list.search}
            onSearchChange={list.setSearch}
            searchPlaceholder="Buscar producto..."
            action={
              <button
                type="button"
                onClick={openCreate}
                disabled={!categorias.length}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
                style={{ backgroundColor: 'var(--admin-accent)', color: 'var(--admin-bg)' }}
              >
                <FiPlus size={16} />
                Nuevo producto
              </button>
            }
          />
        }
      />

      <div
        className="mt-6 overflow-hidden rounded-xl border sm:mt-8"
        style={{
          backgroundColor: 'var(--admin-surface)',
          borderColor: 'var(--admin-border)',
        }}
      >
        {isLoading ? (
          <p className="py-12 text-center text-sm" style={{ color: 'var(--admin-text-dim)' }}>
            Cargando productos...
          </p>
        ) : error ? (
          <p className="py-12 text-center text-sm text-red-400">{error}</p>
        ) : (
          <>
            <AdminTable
              columns={columns}
              rows={list.paginated.map((p) => ({ ...p, id: p.id_producto }))}
              emptyMessage={
                list.hasSearch
                  ? 'No se encontraron productos con esa búsqueda.'
                  : 'No hay productos registrados.'
              }
            />
            <AdminPagination
              page={list.page}
              totalPages={list.totalPages}
              totalItems={list.totalItems}
              pageSize={list.pageSize}
              onPageChange={list.setPage}
            />
          </>
        )}
      </div>

      {modal && (
        <AdminModal
          title={modal.mode === 'create' ? 'Nuevo producto' : 'Editar producto'}
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminField label="Nombre *">
              <input
                className={adminInputClass}
                style={adminInputStyle()}
                value={form.nom_producto}
                onChange={(e) => setForm({ ...form, nom_producto: e.target.value })}
                required
              />
            </AdminField>

            <AdminField label="Categoría *">
              <select
                className={adminInputClass}
                style={adminInputStyle()}
                value={form.categoria_id}
                onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
                required
              >
                <option value="">Seleccionar...</option>
                {categorias.map((c) => (
                  <option key={c.id_categoria} value={c.id_categoria}>
                    {c.nom_categoria}
                  </option>
                ))}
              </select>
            </AdminField>

            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--admin-text-dim)' }}>
              <input
                type="checkbox"
                checked={form.usa_variantes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    usa_variantes: e.target.checked,
                    mostrar_imagen_variantes: e.target.checked
                      ? form.mostrar_imagen_variantes
                      : false,
                    max_sabores: e.target.checked ? form.max_sabores : '1',
                  })
                }
              />
              Usa variantes (sin precio fijo)
            </label>

            {!form.usa_variantes && (
              <AdminField label="Precio *">
                <input
                  type="number"
                  min="0"
                  className={adminInputClass}
                  style={adminInputStyle()}
                  value={form.precio_producto}
                  onChange={(e) => setForm({ ...form, precio_producto: e.target.value })}
                />
              </AdminField>
            )}

            {form.usa_variantes && (
              <>
                <AdminField label="Sabores permitidos">
                  <select
                    className={adminInputClass}
                    style={adminInputStyle()}
                    value={form.max_sabores}
                    onChange={(e) => setForm({ ...form, max_sabores: e.target.value })}
                  >
                    <option value="1">1 sabor (elige uno)</option>
                    <option value="2">Hasta 2 sabores (mezcla, ej. mango + maracuyá)</option>
                  </select>
                </AdminField>
                <p className="text-xs" style={{ color: 'var(--admin-text-dim)' }}>
                  Define cuántos sabores puede elegir el cliente en este producto.
                </p>

                <label
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--admin-text)' }}
                >
                  <input
                    type="checkbox"
                    checked={form.mostrar_imagen_variantes}
                    onChange={(e) =>
                      setForm({ ...form, mostrar_imagen_variantes: e.target.checked })
                    }
                  />
                  Mostrar imágenes de variantes en el sitio
                </label>
                <p className="text-xs" style={{ color: 'var(--admin-text-dim)' }}>
                  Por defecto el cliente solo ve nombre y precio al elegir sabor. Las imágenes
                  de cada variante se muestran en la carta únicamente si activas esta opción.
                </p>

                <ProductoVariantesEditor
                  productoId={modal.mode === 'edit' ? modal.id : null}
                  variantes={variantes}
                  onChange={setVariantes}
                  mostrarImagenVariantes={form.mostrar_imagen_variantes}
                />
              </>
            )}

            <AdminField label="Descripción">
              <textarea
                className={`${adminInputClass} min-h-16 resize-y`}
                style={adminInputStyle()}
                value={form.descripcion_producto}
                onChange={(e) => setForm({ ...form, descripcion_producto: e.target.value })}
              />
            </AdminField>

            <ProductImageInput
              value={form.img_prod}
              onChange={(img_prod) => setForm({ ...form, img_prod })}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AdminField label="Descuento %">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={adminInputClass}
                  style={adminInputStyle()}
                  value={form.descuento_porcentaje}
                  onChange={(e) => setForm({ ...form, descuento_porcentaje: e.target.value })}
                />
              </AdminField>
              <AdminField label="Stock">
                <input
                  type="number"
                  min="0"
                  className={adminInputClass}
                  style={adminInputStyle()}
                  value={form.stock_disponible}
                  onChange={(e) => setForm({ ...form, stock_disponible: e.target.value })}
                />
              </AdminField>
            </div>

            <AdminFormActions>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="w-full rounded-lg border px-4 py-2.5 text-sm font-semibold sm:w-auto sm:py-2"
                style={{ borderColor: 'var(--admin-border)', color: 'var(--admin-text-dim)' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-bold disabled:opacity-60 sm:w-auto sm:py-2"
                style={{ backgroundColor: 'var(--admin-accent)', color: 'var(--admin-bg)' }}
              >
                {isSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </AdminFormActions>
          </form>
        </AdminModal>
      )}

      {toDelete && (
        <AdminConfirmDialog
          title="Eliminar producto"
          message={`¿Eliminar "${toDelete.nom_producto}"? Esta acción no se puede deshacer.`}
          onClose={() => setToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  )
}
