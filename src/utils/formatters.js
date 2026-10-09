export const categories = ['Todos', 'Aire libre', 'Café y comida', 'Deporte', 'Baile y música', 'Juegos y hobbies']

export const money = amount => amount === 0 ? 'Gratis' : `$${amount.toLocaleString('es-CO')} COP`

export const shortDate = value => new Intl.DateTimeFormat('es-CO', {
  weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
}).format(new Date(value)).replace('.', '')
