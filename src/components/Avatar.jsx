export default function Avatar({ label, size = 'normal' }) {
  const colors = {
    CT: 'bg-emerald-100 text-emerald-800',
    AR: 'bg-sky-100 text-sky-800',
    VM: 'bg-violet-100 text-violet-800',
    NP: 'bg-orange-100 text-orange-800',
    LC: 'bg-rose-100 text-rose-800',
    JD: 'bg-cyan-100 text-cyan-800',
  }
  const dimensions = size === 'small' ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-xs'
  return <span className={`${dimensions} ${colors[label] || 'bg-slate-100 text-slate-700'} inline-flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-white`}>
    {label || 'U'}
  </span>
}
