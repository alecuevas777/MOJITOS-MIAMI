import {
  FiHome,
  FiUsers,
  FiTag,
  FiBox,
  FiGift,
  FiSettings,
  FiPercent,
  FiBell,
  FiSearch,
} from "react-icons/fi";

const stats = [
  { title: "Usuarios", value: 124, icon: <FiUsers /> },
  { title: "Categorías", value: 12, icon: <FiTag /> },
  { title: "Productos", value: 84, icon: <FiBox /> },
  { title: "Extras", value: 23, icon: <FiGift /> },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* Sidebar */}
      <aside className="w-72 border-r border-zinc-800 bg-zinc-900 p-6">

        <h1 className="mb-10 text-2xl font-bold">
          Fast<span className="text-red-500">Food</span>
        </h1>

        <nav className="space-y-2">

          <Item active icon={<FiHome />}>
            Dashboard
          </Item>

          <Item icon={<FiUsers />}>Usuarios</Item>

          <Item icon={<FiTag />}>Categorías</Item>

          <Item icon={<FiBox />}>Productos</Item>

          <Item icon={<FiGift />}>Extras</Item>

          <Item icon={<FiPercent />}>Cupones</Item>

          <Item icon={<FiSettings />}>Configuración</Item>

        </nav>

      </aside>

      {/* Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="mt-1 text-zinc-400">
              Resumen general del sistema.
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">

              <FiSearch className="mr-2 text-zinc-500" />

              <input
                placeholder="Buscar..."
                className="bg-transparent outline-none placeholder:text-zinc-500"
              />

            </div>

            <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 hover:bg-zinc-800">
              <FiBell />
            </button>

            <img
              src="https://i.pravatar.cc/40"
              className="h-11 w-11 rounded-full"
            />

          </div>

        </div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-500"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-xl text-red-500">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold">{item.value}</h3>

              <p className="mt-2 text-zinc-400">{item.title}</p>

            </div>
          ))}
        </div>

        {/* Bottom */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div className="col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h3 className="mb-5 text-lg font-semibold">
              Actividad reciente
            </h3>

            <div className="space-y-4">

              <Activity text="Nuevo producto agregado." />

              <Activity text="Categoría actualizada." />

              <Activity text="Cupón creado." />

              <Activity text="Usuario registrado." />

            </div>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <h3 className="mb-5 text-lg font-semibold">
              Acciones rápidas
            </h3>

            <div className="space-y-3">

              <Button>Nuevo Producto</Button>

              <Button>Nueva Categoría</Button>

              <Button>Crear Cupón</Button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

function Item({ children, icon, active }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition
      ${
        active
          ? "bg-red-500 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Activity({ text }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
      <span>{text}</span>
      <span className="text-sm text-zinc-500">Hace 2 min</span>
    </div>
  );
}

function Button({ children }) {
  return (
    <button className="w-full rounded-xl bg-red-500 py-3 font-medium transition hover:bg-red-600">
      {children}
    </button>
  );
}