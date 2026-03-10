export default function ServiceCard({ icon: Icon, title, description, accent = 'teal' }) {
  const accentClasses = {
    teal: 'text-teal-400 bg-teal-400/10 group-hover:bg-teal-400/20',
    gold: 'text-gold-400 bg-gold-400/10 group-hover:bg-gold-400/20',
  }

  return (
    <div className="card-glow group cursor-default">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${accentClasses[accent]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
