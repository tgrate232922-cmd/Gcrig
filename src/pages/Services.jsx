import SectionHeading from '../components/SectionHeading'
import { Globe, Cpu, TrendingUp, RefreshCw, DollarSign, Users } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Cross-Border Liquidity Routing',
    description: 'Efficient capital movement across international borders through our network of 500+ verified CRB partners. We optimize routes based on real-time market conditions, regulatory requirements, and liquidity availability.',
    features: ['Multi-currency routing', 'Compliance-aware transfers', 'Real-time settlement tracking', 'Automated documentation'],
    accent: 'teal',
  },
  {
    icon: Cpu,
    title: 'AI Investment Intelligence',
    description: 'Machine learning algorithms continuously analyze global market conditions to identify optimal investment routes and opportunities. Our AI advisory engine processes millions of data points in real time.',
    features: ['Predictive market analytics', 'Risk-adjusted route scoring', 'Opportunity identification', 'Portfolio correlation analysis'],
    accent: 'gold',
  },
  {
    icon: TrendingUp,
    title: 'Global Trade Initiation',
    description: 'Streamlined processes for initiating and managing international trade operations. We connect buyers, sellers, and financiers across different markets through our verified partner network.',
    features: ['Trade finance structuring', 'Counter-party matching', 'Documentation management', 'Settlement facilitation'],
    accent: 'teal',
  },
  {
    icon: RefreshCw,
    title: 'Capital Recycling Investment Model',
    description: 'Systematic reinvestment framework that maximizes capital utilization across markets. Capital is continuously deployed, returned, and redeployed to optimize efficiency and returns over time.',
    features: ['Automated reinvestment cycles', 'Portfolio rebalancing', 'Capital efficiency tracking', 'Cycle optimization reporting'],
    accent: 'gold',
  },
  {
    icon: DollarSign,
    title: 'Institutional Liquidity Access',
    description: 'Premium liquidity solutions designed for large-scale institutional operations. Access deep liquidity pools across multiple asset classes and geographies through a single platform.',
    features: ['Deep liquidity pools', 'Institutional-grade execution', 'Custom routing protocols', 'Dedicated account management'],
    accent: 'teal',
  },
  {
    icon: Users,
    title: 'Strategic Partnership Programs',
    description: 'Collaborative frameworks for organizations seeking to join the global liquidity network as a CRB. We provide onboarding, training, technology access, and ongoing support.',
    features: ['CRB onboarding program', 'Technology platform access', 'Training and certification', 'Revenue sharing framework'],
    accent: 'gold',
  },
]

export default function Services() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Platform Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Comprehensive <span className="gradient-text">Financial Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Six core service pillars designed to address every aspect of cross-border liquidity management and capital optimization.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((s, i) => (
            <div key={s.title} className={`card-glow grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${s.accent === 'teal' ? 'bg-teal-500/10' : 'bg-gold-500/10'}`}>
                  <s.icon className={`w-7 h-7 ${s.accent === 'teal' ? 'text-teal-400' : 'text-gold-400'}`} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{s.title}</h2>
                <p className="text-gray-400 leading-relaxed">{s.description}</p>
              </div>
              <div>
                <h4 className="text-gray-300 font-medium text-sm mb-4 uppercase tracking-wider">Key Features</h4>
                <ul className="space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.accent === 'teal' ? 'bg-teal-400' : 'bg-gold-400'}`} />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
