# Mojitos Miami — Manual de usuario

Manual para operar la aplicación web de **Mojitos Miami**: catálogo digital, carrito, pedidos por WhatsApp y panel administrativo.

**Sitio en producción:** [https://mojitosmiami.cl](https://mojitosmiami.cl)

---

## Acceso al panel (importante)

| Dato | Valor |
|------|-------|
| **URL de login** | [https://mojitosmiami.cl/admin/login](https://mojitosmiami.cl/admin/login) |
| **Nombre de usuario** | Administrador |
| **Correo** | `admin@mojito.cl` |
| **Contraseña** | `Admin123!` |
| **Teléfono (registro)** | `56912345678` |

> **Seguridad:** cambie la contraseña en **Usuarios → Editar** después del primer acceso. No comparta estas credenciales fuera del equipo autorizado.

---

## Tabla de contenidos

1. [¿Qué es esta aplicación?](#1-qué-es-esta-aplicación)
2. [Sitio público (vista del cliente)](#2-sitio-público-vista-del-cliente)
3. [Panel administrativo](#3-panel-administrativo)
4. [Dashboard](#4-dashboard)
5. [Usuarios](#5-usuarios)
6. [Categorías](#6-categorías)
7. [Productos](#7-productos)
8. [Cupones](#8-cupones)
9. [Zonas de delivery](#9-zonas-de-delivery)
10. [Ingredientes extra](#10-ingredientes-extra)
11. [Configuración del negocio](#11-configuración-del-negocio)
12. [Flujos de trabajo frecuentes](#12-flujos-de-trabajo-frecuentes)
13. [Cómo se gestionan los pedidos](#13-cómo-se-gestionan-los-pedidos)
14. [Descuentos y promociones](#14-descuentos-y-promociones)
15. [Consejos y buenas prácticas](#15-consejos-y-buenas-prácticas)
16. [Limitaciones actuales](#16-limitaciones-actuales)
17. [Anexo técnico](#17-anexo-técnico)

---

## 1. ¿Qué es esta aplicación?

**Mojitos Miami** es una carta digital interactiva para mostrar productos, aplicar descuentos y recibir pedidos. Los clientes navegan el catálogo desde el celular o computador, arman su pedido y lo envían por **WhatsApp**.

| Parte | Quién la usa | Para qué |
|-------|--------------|----------|
| **Sitio público** | Clientes finales | Ver menú, carrito y pedir |
| **Panel admin** | Dueño y equipo | Gestionar productos, precios, cupones, delivery y configuración |

> **Importante:** La app **no procesa pagos** ni guarda pedidos en una bandeja interna. El seguimiento del pedido ocurre en WhatsApp. El pago se coordina por **transferencia** con los datos bancarios configurados en el admin.

---

## 2. Sitio público (vista del cliente)

### Secciones principales

- **Inicio (Hero):** imagen, título, subtítulo y estado **Abierto / Cerrado** según el horario del admin.
- **Catálogo:** productos con filtro por categoría y buscador.
- **Barra libre:** presentación del servicio de barra móvil / eventos, con botón **Cotizar evento** por WhatsApp.
- **Pie de página:** Instagram, WhatsApp, horarios y teléfono de contacto.

### Catálogo

Cada producto muestra imagen, nombre, descripción, precio (o **“Desde $X”** si tiene variantes) y botones **Añadir** / **Pedir ahora**.

En el modal de detalle:

- Foto (con ícono de ojo para ampliar)
- Descripción
- Selector de sabor (si hay variantes)
- Cantidad, **Añadir** y **Pedir ahora**

### Carrito

- Ícono flotante con cantidad de ítems.
- Cambiar cantidades, eliminar o vaciar.
- Se guarda en el navegador del cliente.
- **Pedir por WhatsApp** abre la confirmación del pedido.

### Confirmación de pedido

| Campo | Obligatorio |
|-------|-------------|
| Cupón | No |
| Extras (Red Bull, hielo, etc.) | No |
| Nombre | Sí |
| Celular (+56 9…) | Sí |
| Correo | No |
| Comuna (zona de delivery) | Sí |
| Dirección | Sí |

El sistema calcula subtotal, extras, descuentos, costo de envío según la **comuna** (o gratis si aplica umbral/cupón) y total estimado.

También muestra los **datos bancarios** para transferencia, con opción de copiar cada dato o todos juntos.

Al confirmar, se abre WhatsApp con el mensaje del pedido.

### WhatsApp flotante

Botón verde flotante para escribir directamente al número de pedidos configurado en el admin.

---

## 3. Panel administrativo

### Acceso

| Dato | Valor |
|------|-------|
| Producción | `https://mojitosmiami.cl/admin/login` |
| Local (desarrollo) | `http://localhost:5173/admin/login` |
| Correo | `admin@mojito.cl` |
| Contraseña | `Admin123!` |

### Inicio de sesión

1. Ingrese **correo** y **contraseña**.
2. Pulse **Entrar al panel**.
3. Será llevado al Dashboard.

### Menú del panel

| Sección | Función |
|---------|---------|
| Dashboard | Resumen de cantidades |
| Usuarios | Cuentas con acceso al admin |
| Categorías | Grupos del menú |
| Productos | Carta completa |
| Cupones | Códigos promocionales |
| Delivery | Comunas, costos y tiempos |
| Extras | Productos adicionales al pedido |
| Configuración | Datos del negocio, horarios, WhatsApp, banco |

En celular: menú hamburguesa, **Volver al sitio** y **Cerrar sesión**.

### Herramientas comunes

- Buscador y paginación
- Botón **Nuevo**
- **Editar** / **Eliminar** por fila
- Confirmación antes de eliminar

---

## 4. Dashboard

Contadores en tiempo real:

- Usuarios
- Categorías
- Productos
- Cupones
- Zonas de delivery
- Ingredientes extra

---

## 5. Usuarios

| Campo | Requerido | Notas |
|-------|-----------|-------|
| Nombre | Sí | Ej.: Administrador |
| Correo | Sí | Único; se usa para iniciar sesión |
| Teléfono | Sí | |
| Contraseña | Sí al crear | Mínimo 8 caracteres; ojito para mostrar/ocultar |

### Credenciales del usuario inicial

| Campo | Valor |
|-------|-------|
| Nombre | Administrador |
| Correo | `admin@mojito.cl` |
| Contraseña | `Admin123!` |
| Teléfono | `56912345678` |

**Reglas:**

- Todos los usuarios tienen el mismo nivel de acceso.
- No puede eliminar su propia cuenta mientras esté conectado.
- Cree un usuario por persona del equipo.

---

## 6. Categorías

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| Nombre | Sí | Visible en el filtro del catálogo |
| Descripción | No | |
| Descuento % | No | Aplica a productos de la categoría |
| Aviso stock desde | No | Uso interno |

Cree las categorías **antes** de cargar productos.

---

## 7. Productos

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| Nombre | Sí | Nombre en la carta |
| Categoría | Sí | |
| Usa variantes | No | Sabores/opciones con precio propio |
| Precio | Sí si no usa variantes | CLP |
| Mostrar imágenes de variantes | No | Solo si usa variantes; por defecto el cliente ve nombre y precio |
| Descripción | No | Visible en tarjeta y modal |
| Imagen | No | URL o subida de archivo |
| Descuento % | No | Descuento del producto |
| Stock | No | Informativo |

### Variantes (sabores)

Si activa **Usa variantes**:

- Agregue cada sabor con nombre y precio.
- El catálogo muestra **Desde $X** (el precio más bajo).
- El cliente elige el sabor antes de añadir o pedir.

### Imágenes

1. Pegar URL, o  
2. Subir archivo desde el computador.

---

## 8. Cupones

| Campo | Descripción |
|-------|-------------|
| Código | Ej.: `MOJITO10` |
| Descripción | Texto interno / para el cliente al validar |
| Tipo | % pedido, % categoría, % producto o envío gratis |
| Valor | Porcentaje o 0 si es envío gratis |
| Pedido mínimo | Monto mínimo del subtotal |
| Solo delivery | Marca informativa |
| Activo / fechas | Vigencia |

Cupones de ejemplo en la base:

| Código | Efecto |
|--------|--------|
| `MOJITO10` | 10% en el pedido (mín. $15.000) |
| `DELIVERY20` | 15% en pedidos con delivery (mín. $20.000) |
| `ENVIO30` | Envío gratis (mín. $25.000) |

---

## 9. Zonas de delivery

Define comunas y costos de envío.

| Campo | Descripción |
|-------|-------------|
| Comuna | Nombre visible en el selector del pedido |
| Costo | Precio del delivery en CLP |
| Tiempo estimado | Ej.: `20-35 min` |
| Activo | Si está desactivado, no aparece al cliente |

Ejemplos cargados: Coronel, Lomas Coloradas, Lota.

---

## 10. Ingredientes extra

Productos opcionales que el cliente puede sumar al pedido (cantidad).

| Campo | Descripción |
|-------|-------------|
| Nombre | Ej.: Red Bull, Hielo |
| Precio | CLP |
| Activo | Visible u oculto en el checkout |

---

## 11. Configuración del negocio

### Identidad y contacto

- Nombre del negocio, logo
- **WhatsApp (pedidos)** — número que usa el botón flotante y los pedidos
- Teléfono, correo, Instagram

### Hero y carta

- Títulos, subtítulos e imágenes de portada (desktop / móvil)
- Textos de la sección “Nuestra Carta”

### Horarios

- Día por día: apertura, cierre y si está abierto
- El sitio muestra **Abierto / Cerrado** según el día actual

### Pedidos y delivery

- **Delivery gratis desde** cierto monto (se aplica en el checkout)

### Cuenta bancaria (transferencias)

Datos que el cliente ve y puede copiar al pedir:

- Titular, RUT, correo, banco, tipo y número de cuenta

---

## 12. Flujos de trabajo frecuentes

### Agregar un producto nuevo

1. Categorías → crear categoría si falta.
2. Productos → **Nuevo producto**.
3. Completar nombre, categoría, precio o variantes, descripción e imagen.
4. Guardar y revisar en el sitio público.

### Crear un cupón

1. Cupones → **Nuevo**.
2. Definir código, tipo, valor y pedido mínimo.
3. Activar y, si aplica, fechas.
4. Probar en un pedido de prueba.

### Actualizar WhatsApp o datos bancarios

1. Configuración → Contacto / Cuenta bancaria.
2. Guardar.
3. Probar el botón flotante y un pedido de prueba.

### Cotizar barra libre

El cliente va a la sección **Barra libre** y pulsa **Cotizar evento** (WhatsApp con mensaje prellenado).

---

## 13. Cómo se gestionan los pedidos

1. El cliente arma el carrito o usa **Pedir ahora**.
2. Completa datos, comuna, dirección, extras y cupón si tiene.
3. Copia los datos de transferencia si paga así.
4. Confirma → se abre WhatsApp con el detalle.
5. El negocio responde, confirma stock, envío y pago.

No hay bandeja de pedidos dentro de la web: todo queda en el chat de WhatsApp.

---

## 14. Descuentos y promociones

Pueden combinarse según reglas del sistema:

- Descuento de **categoría**
- Descuento de **producto**
- **Cupón** validado en el checkout
- **Envío gratis** por umbral (`delivery_gratis_desde`) o cupón de envío

El precio tachado / etiqueta de descuento se muestra cuando hay descuento de producto o categoría.

---

## 15. Consejos y buenas prácticas

- Fotos livianas (menos de 1 MB) y claras.
- Descripciones cortas.
- Códigos de cupón fáciles de recordar.
- Verificar WhatsApp y horarios tras cada cambio importante.
- Probar un pedido completo desde el celular.
- Un usuario admin por persona; cerrar sesión en PCs compartidos.
- **Cambiar `Admin123!` apenas entregue el sistema al cliente.**

---

## 16. Limitaciones actuales

| Funcionalidad | Estado |
|---------------|--------|
| Bandeja de pedidos interna | No — todo por WhatsApp |
| Roles (cajero / admin) | No — todos con acceso completo |
| Pago en línea | No — transferencia + WhatsApp |
| Retiro en local | No — solo delivery en el formulario |
| Banner `texto_promo` | Guardado en admin; visibilidad en sitio pendiente |

---

## 17. Anexo técnico

### Credenciales de administrador

| Campo | Valor |
|-------|-------|
| Nombre | `Administrador` |
| Correo de acceso | `admin@mojito.cl` |
| Contraseña | `Admin123!` |
| Teléfono | `56912345678` |
| Login producción | `https://mojitosmiami.cl/admin/login` |

### URLs importantes

| Página | Ruta |
|--------|------|
| Sitio público | `/` o `https://mojitosmiami.cl` |
| Login admin | `/admin/login` |
| Dashboard | `/admin/dashboard` |
| Usuarios | `/admin/usuarios` |
| Categorías | `/admin/categorias` |
| Productos | `/admin/productos` |
| Cupones | `/admin/cupones` |
| Delivery | `/admin/delivery-zonas` |
| Extras | `/admin/ingredientes-extra` |
| Configuración | `/admin/configuracion` |

### Tecnología

| Componente | Tecnología |
|------------|------------|
| Interfaz | React + Vite |
| API | PHP |
| Base de datos | MySQL |
| Pedidos | WhatsApp (`wa.me`) |

### Desarrollo local

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:8000`

### Soporte

Para cambios, correcciones o capacitación, contacte a su proveedor de desarrollo.

---

*Manual Mojitos Miami — Actualizado: julio 2026.*
