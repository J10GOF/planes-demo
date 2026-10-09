import { useDemo } from '../context/DemoContext'
import PlanGrid from '../components/PlanGrid'

export default function BusinessPlansPage() {
  const { plans, businesses, participants, users, organizerFor, isJoined, joinPlan } = useDemo()
  const businessPlans = plans.filter(plan => plan.organizerType === 'business').sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))
  return <main className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">Experiencias locales</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Planes de negocios</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Actividades organizadas por espacios y comercios de tu ciudad.</p>
    <div className="mt-7 grid gap-4 md:grid-cols-2">{businesses.map(business=><article key={business.id} className={`flex items-center gap-4 rounded-2xl border border-white bg-gradient-to-r ${business.color} p-5`}><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl">{business.emoji}</span><div><p className="text-xs font-semibold text-slate-500">{business.category} · {business.address}</p><h2 className="mt-0.5 text-lg font-bold text-slate-900">{business.name}</h2><p className="mt-1 text-sm text-slate-600">{business.description}</p></div></article>)}</div>
    <h2 className="mt-10 text-xl font-bold text-slate-900">Próximas actividades</h2><PlanGrid plans={businessPlans} participants={participants} users={users} getOrganizer={organizerFor} isJoined={isJoined} onJoin={joinPlan}/>
  </main>
}
