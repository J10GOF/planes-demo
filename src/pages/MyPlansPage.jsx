import { useMemo } from 'react'
import { useDemo } from '../context/DemoContext'
import PlanGrid from '../components/PlanGrid'

export default function MyPlansPage() {
  const { user, plans, participants, users, organizerFor, isJoined, joinPlan } = useDemo()
  const myPlans = useMemo(() => plans.filter(plan =>
    (plan.organizerType === 'user' && plan.organizerId === user.id) || isJoined(plan),
  ).sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt)), [plans, participants, user])
  return <main className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">Tu agenda social</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Mis planes</h1><p className="mt-2 text-sm text-slate-500">Planes a los que te uniste y actividades que organizas.</p><PlanGrid plans={myPlans} participants={participants} users={users} getOrganizer={organizerFor} isJoined={isJoined} onJoin={joinPlan}/></main>
}
