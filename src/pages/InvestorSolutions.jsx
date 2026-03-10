import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import { Users, BarChart2, Target, CheckCircle, ArrowRight } from 'lucide-react'

const solutions = [
  {
    icon: Users,
    type: 'Private Investors',
    tagline: 'Cross-Border Diversification',
    description: 'Tailored solutions for individual investors seeking to diversify across international markets with AI-guided investment opportunities.',
    features: [
      'Personalized AI route recommendations',
      'Access to global liquidity network',
      'Multi-currency portfolio support',
      'Risk-adjusted allocation strategies',
      'Real-time portfolio monitoring',
      'Dedicated relationship manager',
    ],
    color: 'teal',
  },
  {
    icon: BarChart2,
    type: 'Institutional Investors',
    tagline: 'Enterprise-Grade Solutions',
    description: 'Enterprise-grade liquidity access, custom routing protocols, and dedicated account management for pension funds, endowments, and asset managers.',
    features: [
      'Custom liquidity routing protocols',
      'Bulk transaction capabilities',
      'Institutional-grade compliance tools',
      'API integration with existing systems',
      'Dedicated account team',
      'Custom reporting and analytics',
    ],
    color: 'gold',
    featured: true,
  },
  {
    icon: Target,
    type: 'Corporate Clients',
    tagline: 'Working Capital Solutions',
    description: 'Working capital optimization, trade finance, and strategic liquidity management for multinational corporations and growing businesses.',
    features: [
      'Working capital optimization',
      'Trade finance solutions',
      'Multi-entity treasury management',
      'FX risk management tools',
      'Supply chain finance',
      'Cross-border payment automation',
    ],
    color: 'teal',
  },
]

export default function InvestorSolutions() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Investor Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Solutions for <span className="gradient-text">Every Investor</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Whether you're an individual investor, a major institution, or a global corporation, GCRIG offers tailored capital routing and liquidity solutions.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {solutions.map((s) => (
              <div key={s.type} className={`card-glow relative ${s.featured ? 'border-gold-500/30 shadow-lg shadow-gold-500/10' : ''}`}>
                {s.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold-500 text-navy-900 text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${s.color === 'teal' ? 'bg-teal-500/10' : 'bg-gold-500/10'}`}>
                  <s.icon className={`w-7 h-7 ${s.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`} />
                </div>
                <div className={`text-xs font-semibold tracking-wider uppercase mb-2 ${s.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`}>
                  {s.tagline}
                </div>
                <h2 className="text-xl font-bold text-white mb-4">{s.type}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-2 mb-8">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${s.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`} />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={s.color === 'teal' ? 'btn-secondary w-full flex items-center justify-center gap-2' : 'btn-primary w-full flex items-center justify-center gap-2'}>
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-3xl mx-auto">
          <SectionHeading badge="Get Started" title="Speak With Our Team" subtitle="Tell us about your investment goals and we'll find the right solution for you." />
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
