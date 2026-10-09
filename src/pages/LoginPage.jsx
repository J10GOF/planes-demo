import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import Avatar from '../components/Avatar'

export default function LoginPage() {
  const { user, users, login } = useDemo()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  if (user) return <Navigate to="/" replace />

  const submit = event => {
    event.preventDefault()
    const account = users.find(person => person.email.toLowerCase() === email.trim().toLowerCase())
    if (account && password === '123456') {
      login(account)
      navigate('/', { replace: true })
    } else {
      setError('Usa un correo de muestra terminado en @demo.com y la clave 123456.')
    }
  }

  return <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_.95fr]">
    <section className="relative hidden overflow-hidden bg-[#174c43] p-12 text-white lg:flex lg:flex-col lg:justify-between"><div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border border-white/10"/><div className="absolute -bottom-36 -left-24 h-[32rem] w-[32rem] rounded-full border border-white/10"/><div className="relative flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#c4f168] text-xl text-[#174c43]">↗</span><span className="text-xl font-extrabold tracking-tight">vamos<span className="text-[#c4f168]">.</span></span></div><div className="relative max-w-xl pb-6"><p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-[#c4f168]">Planes que se disfrutan más juntos</p><h1 className="text-5xl font-semibold leading-[1.08] tracking-tight">Tu próximo plan empieza con un hola.</h1><p className="mt-6 max-w-md text-lg leading-8 text-white/75">Encuentra personas con ganas de salir, descubre experiencias locales y haz espacio para algo nuevo.</p><div className="mt-10 flex items-center gap-3"><div className="flex -space-x-2"><Avatar label="CT"/><Avatar label="AR"/><Avatar label="VM"/></div><p className="text-sm text-white/70">Gente real. Planes sencillos. Buenos momentos.</p></div></div><p className="relative text-xs text-white/45">Una demo para explorar la idea de Vamos</p></section>
    <section className="flex min-h-screen items-center justify-center px-6 py-12"><div className="w-full max-w-[420px]"><div className="mb-12 flex items-center gap-3 lg:hidden"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#174c43] text-xl text-[#c4f168]">↗</span><span className="text-xl font-extrabold">vamos<span className="text-emerald-600">.</span></span></div><p className="text-sm font-semibold text-emerald-700">Qué bueno tenerte por aquí</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Inicia sesión</h2><p className="mt-2 text-sm leading-6 text-slate-500">Entra para descubrir un plan que te saque de la rutina.</p>
      <form className="mt-8 space-y-5" onSubmit={submit} autoComplete="off"><label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Correo electrónico</span><input className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10" type="email" value={email} onChange={event=>setEmail(event.target.value)} placeholder="tu@demo.com" autoComplete="off" required/></label><label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Contraseña</span><input className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10" type="password" value={password} onChange={event=>setPassword(event.target.value)} autoComplete="new-password" required/></label>{error && <p className="text-sm font-medium text-rose-600">{error}</p>}<button className="w-full rounded-xl bg-[#174c43] py-3.5 font-semibold text-white shadow-lg shadow-emerald-950/10 transition hover:bg-[#103a33]">Entrar a la demo <span className="ml-1">→</span></button></form>
      <div className="my-7 flex items-center gap-4"><span className="h-px flex-1 bg-slate-200"/><span className="text-xs text-slate-400">ACCESO DE MUESTRA</span><span className="h-px flex-1 bg-slate-200"/></div><p className="text-center text-xs leading-5 text-slate-400">Usa un correo de muestra terminado en <span className="font-semibold">@demo.com</span> y la clave ficticia <span className="font-semibold">123456</span>.</p><p className="mt-8 text-center text-xs text-slate-400">Acceso ficticio solo para esta demostración. No uses una contraseña real.</p>
    </div></section>
  </main>
}
