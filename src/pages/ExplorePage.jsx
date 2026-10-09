import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import { categories } from '../utils/formatters'
import PlanGrid from '../components/PlanGrid'

export default function ExplorePage() {
  const { plans, participants, users, organizerFor, isJoined, joinPlan } = useDemo()
  const [category, setCategory] = useState('Todos')
  const [organizerType, setOrganizerType] = useState('Todos')
  const [query, setQuery] = useState('')
  const visiblePlans = useMemo(() => plans.filter(plan => {
    const term = query.toLowerCase().trim()
    const organizer = organizerFor(plan)
    return (category === 'Todos' || plan.category === category)
      && (organizerType === 'Todos' || plan.organizerType === organizerType)
      && (!term || `${plan.title} ${plan.description} ${plan.city} ${organizer?.name}`.toLowerCase().includes(term))
  }).sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt)), [plans, category, organizerType, query])

  return <main className="mx-auto max-w-[1320px] px-5 pb-16 pt-9 lg:px-8 lg:pt-12">
    <section className="relative overflow-hidden rounded-[28px] bg-[#174c43] px-7 py-8 text-white sm:px-10 sm:py-10 lg:px-14 lg:py-12"><div className="absolute -right-16 -top-32 h-96 w-96 rounded-full border border-white/10"/><div className="absolute right-36 top-20 h-36 w-36 rounded-full border border-white/10"/><div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#c4f168]">Planes para compartir</p><h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">Encuentra tu próximo plan<span className="text-[#c4f168]">.</span></h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">Gente nueva, lugares que no conocías y un buen motivo para salir.</p></div><div className="relative rounded-2xl bg-white p-2 shadow-xl shadow-black/10 sm:flex sm:min-w-[450px] sm:items-center"><span className="hidden px-3 text-xl text-slate-400 sm:block">⌕</span><input aria-label="Buscar planes" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Busca una actividad, lugar o plan" className="w-full rounded-xl border-0 px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:px-0"/><button onClick={()=>setQuery(query.trim())} className="mt-2 w-full rounded-xl bg-[#c4f168] px-5 py-3 text-sm font-bold text-[#21452a] sm:mt-0 sm:w-auto">Buscar</button></div></div><div className="relative mt-8 flex flex-wrap gap-5 border-t border-white/15 pt-5 text-xs text-white/70"><span>✦ {plans.length} planes</span><span>◉ Planes de personas y negocios</span><span>⌖ Explora actividades en tu ciudad</span></div></section>
    <div className="mt-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">Descubre algo nuevo</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Planes cerca de ti</h2></div><p className="text-sm text-slate-500">{visiblePlans.length} {visiblePlans.length === 1 ? 'plan' : 'planes'} disponibles</p></div>
    <div className="mt-5 flex flex-col gap-3 border-b border-[#e4e8df] pb-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-2 overflow-x-auto pb-1">{categories.map(item=><button key={item} onClick={()=>setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${category === item ? 'bg-[#174c43] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>{item}</button>)}</div><select aria-label="Filtrar organizador" value={organizerType} onChange={event=>setOrganizerType(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 outline-none sm:w-48"><option value="Todos">Todos los organizadores</option><option value="user">Personas</option><option value="business">Negocios</option></select></div>
    <PlanGrid plans={visiblePlans} participants={participants} users={users} getOrganizer={organizerFor} isJoined={isJoined} onJoin={joinPlan}/>
    <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-emerald-100 bg-[#eef6ed] p-6 sm:flex-row sm:items-center sm:p-8"><div className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl">🌱</span><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-800">¿Tienes un plan en mente?</p><h3 className="mt-1 text-lg font-bold text-slate-900">Invita a alguien a sumarse</h3><p className="mt-1 text-sm text-slate-600">Crea un plan y encuentra personas que también quieran ir.</p></div></div><Link to="/crear" className="rounded-xl bg-[#174c43] px-5 py-3 text-sm font-bold text-white hover:bg-[#103a33]">＋ Publicar un plan</Link></section>
  </main>
}
