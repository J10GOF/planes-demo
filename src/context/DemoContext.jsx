import { createContext, useContext, useMemo, useState } from 'react'
import usersSeed from '../data/users.json'
import businessesSeed from '../data/businesses.json'
import plansSeed from '../data/plans.json'
import participantsSeed from '../data/planParticipants.json'

const DemoContext = createContext(null)
const readSaved = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}
const writeSaved = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export function DemoProvider({ children }) {
  const [user, setUser] = useState(() => readSaved('vamos.currentUser', null))
  const [plans, setPlans] = useState(() => readSaved('vamos.plans', plansSeed))
  const [participants, setParticipants] = useState(() => readSaved('vamos.participants', participantsSeed))
  const [toast, setToast] = useState('')

  const notify = message => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }
  const login = nextUser => {
    setUser(nextUser)
    writeSaved('vamos.currentUser', nextUser)
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('vamos.currentUser')
  }
  const organizerFor = plan => plan.organizerType === 'business'
    ? businessesSeed.find(business => business.id === plan.organizerId)
    : usersSeed.find(person => person.id === plan.organizerId)
  const isJoined = plan => Boolean(user) && participants.some(entry =>
    entry.planId === plan.id && entry.userId === user.id && entry.status === 'confirmed',
  )
  const joinPlan = plan => {
    if (!user) return
    const existing = participants.find(entry =>
      entry.planId === plan.id && entry.userId === user.id && entry.status === 'confirmed',
    )
    if (existing) {
      const next = participants.map(entry => entry.id === existing.id ? { ...entry, status: 'cancelled' } : entry)
      setParticipants(next)
      writeSaved('vamos.participants', next)
      notify('Saliste del plan. Puedes volver cuando quieras.')
      return
    }
    const confirmedCount = participants.filter(entry => entry.planId === plan.id && entry.status === 'confirmed').length
    if (confirmedCount >= plan.capacity) {
      notify('Este plan ya no tiene cupos.')
      return
    }
    const next = [...participants, {
      id: `member-${Date.now()}`,
      planId: plan.id,
      userId: user.id,
      status: 'confirmed',
      joinedAt: new Date().toISOString(),
    }]
    setParticipants(next)
    writeSaved('vamos.participants', next)
    notify('¡Listo! Ya tienes un lugar en el plan.')
  }
  const createPlan = values => {
    const plan = {
      id: `plan-${Date.now()}`,
      title: values.title,
      description: values.description,
      category: values.category,
      organizerType: values.organizerType,
      organizerId: values.organizerType === 'business' ? values.businessId : user.id,
      city: values.city,
      meetingPoint: values.meetingPoint,
      startsAt: new Date(values.startsAt).toISOString(),
      durationMinutes: Number(values.durationMinutes || 120),
      capacity: Number(values.capacity),
      priceAmount: Number(values.priceAmount || 0),
      status: 'published',
      emoji: values.organizerType === 'business' ? '✨' : '🌿',
      color: values.organizerType === 'business' ? 'from-teal-100 to-emerald-50' : 'from-lime-100 to-emerald-50',
      tags: ['Nuevo plan'],
    }
    const next = [plan, ...plans]
    setPlans(next)
    writeSaved('vamos.plans', next)
    notify('Tu plan ya aparece en la lista.')
    return plan
  }
  const value = useMemo(() => ({
    user, users: usersSeed, businesses: businessesSeed, plans, participants, toast,
    login, logout, organizerFor, isJoined, joinPlan, createPlan, notify,
  }), [user, plans, participants, toast])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) throw new Error('useDemo debe usarse dentro de DemoProvider')
  return context
}
