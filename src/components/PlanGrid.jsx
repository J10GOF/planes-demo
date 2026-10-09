import { Link } from 'react-router-dom'
import PlanCard from './PlanCard'

export default function PlanGrid({ plans, participants, users, getOrganizer, isJoined, onJoin }) {
  if (!plans.length) return <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><span className="text-4xl">🧭</span><h3 className="mt-4 text-lg font-bold">No encontramos planes con esos filtros</h3><p className="mt-1 text-sm text-slate-500">Prueba otra categoría o crea el primer plan.</p><Link to="/crear" className="mt-5 inline-flex rounded-xl bg-[#174c43] px-4 py-2.5 text-sm font-bold text-white">Crear un plan</Link></div>
  return <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{plans.map(plan => <PlanCard key={plan.id} plan={plan} organizer={getOrganizer(plan)} participants={participants.filter(person => person.planId === plan.id && person.status === 'confirmed')} joined={isJoined(plan)} onJoin={onJoin} users={users}/>)}</div>
}
