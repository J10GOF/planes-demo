import { Link, NavLink, Outlet } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import Avatar from './Avatar'

const navClass = ({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-emerald-50 text-emerald-900' : 'text-slate-500 hover:text-slate-900'}`

export default function AppShell() {
  const { user, logout, toast } = useDemo()
  return <div className="min-h-screen bg-[#f7f8f5]">
    <header className="sticky top-0 z-30 border-b border-[#e9ece5] bg-[#fbfcf9]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1320px] items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#174c43] text-lg font-black text-[#c4f168]">↗</span><span className="text-xl font-extrabold tracking-tight text-[#183d36]">vamos<span className="text-emerald-600">.</span></span></Link>
        <nav className="hidden items-center gap-1 md:flex"><NavLink to="/" end className={navClass}>Explorar</NavLink><NavLink to="/negocios" className={navClass}>Negocios</NavLink><NavLink to="/mis-planes" className={navClass}>Mis planes</NavLink></nav>
        <div className="flex items-center gap-3"><Link to="/crear" className="hidden rounded-xl bg-[#c4f168] px-4 py-2.5 text-sm font-bold text-[#21452a] transition hover:bg-[#b6e45a] sm:block">＋ Crear plan</Link><div className="group relative"><button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3"><Avatar label={user.avatar} size="small"/><span className="hidden max-w-24 truncate text-xs font-semibold text-slate-700 sm:block">{user.name.split(' ')[0]}</span><span className="text-slate-400">⌄</span></button><div className="invisible absolute right-0 top-full z-40 mt-2 w-44 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100"><div className="px-3 py-2"><p className="text-xs font-bold">{user.name}</p><p className="text-[10px] text-slate-400">{user.city}</p></div><button onClick={logout} className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-700 hover:bg-rose-50">Cerrar sesión</button></div></div></div>
      </div>
      <div className="flex gap-2 border-t border-slate-100 px-4 py-2 md:hidden"><NavLink to="/" end className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold">Explorar</NavLink><NavLink to="/negocios" className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold">Negocios</NavLink><NavLink to="/mis-planes" className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold">Mis planes</NavLink><Link to="/crear" className="rounded-full bg-[#c4f168] px-3 py-1.5 text-xs font-semibold">＋ Crear</Link></div>
    </header>
    <Outlet />
    <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p><span className="font-extrabold text-[#174c43]">vamos.</span> Demo visual con usuarios y actividades ficticias.</p><p>Los cambios se guardan solo en este navegador · {user.city}</p></div></footer>
    {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl">{toast}</div>}
  </div>
}
