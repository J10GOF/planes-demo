import { Link } from 'react-router-dom'
import { money, shortDate } from '../utils/formatters'
import Avatar from './Avatar'

export default function PlanCard({ plan, organizer, participants, joined, onJoin, users }) {
  const confirmed = participants.filter(person => person.status === 'confirmed')
  const remaining = Math.max(0, plan.capacity - confirmed.length)

  return <article className="group overflow-hidden rounded-2xl border border-[#e9ece5] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[.06]">
    <Link to={`/planes/${plan.id}`} className={`relative block h-44 bg-gradient-to-br ${plan.color}`}>
      <span className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur">{plan.category}</span>
      <span className="absolute bottom-2 right-6 text-7xl drop-shadow-sm transition duration-300 group-hover:scale-110">{plan.emoji}</span>
      {plan.organizerType === 'business' && <span className="absolute bottom-4 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">Plan de negocio</span>}
    </Link>
    <div className="p-5">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/planes/${plan.id}`} className="text-lg font-bold leading-snug text-slate-900 hover:text-emerald-800">{plan.title}</Link>
        <span className="shrink-0 rounded-lg bg-[#f4f6f2] px-2.5 py-1.5 text-xs font-bold text-slate-700">{money(plan.priceAmount)}</span>
      </div>
      <p className="mt-3 flex items-center gap-2 text-sm text-slate-500"><span className="text-emerald-700">◷</span>{shortDate(plan.startsAt)}</p>
      <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><span className="text-emerald-700">⌖</span>{plan.city} · {plan.meetingPoint}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex min-w-0 items-center gap-2"><Avatar label={organizer?.avatar || organizer?.emoji || 'V'} size="small"/><div className="truncate"><p className="truncate text-xs font-semibold text-slate-700">{organizer?.name || 'Organizador'}</p><p className="text-[10px] text-slate-400">{plan.organizerType === 'business' ? 'Negocio' : 'Organiza el plan'}</p></div></div>
        <button onClick={() => onJoin(plan)} disabled={remaining === 0 && !joined} className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${joined ? 'bg-emerald-50 text-emerald-800 hover:bg-rose-50 hover:text-rose-700' : remaining === 0 ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-[#174c43] text-white hover:bg-[#103a33]'}`}>
          {joined ? 'Ya estás dentro' : remaining === 0 ? 'Completo' : 'Unirme'}
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between"><div className="flex -space-x-2">{confirmed.slice(0, 3).map(person => <Avatar key={person.id} label={users.find(user => user.id === person.userId)?.avatar} size="small"/>)}<span className="ml-3 self-center text-[11px] text-slate-500">{confirmed.length} van · {remaining} cupos</span></div><Link to={`/planes/${plan.id}`} className="text-xs font-semibold text-emerald-800">Ver detalles ↗</Link></div>
    </div>
  </article>
}
