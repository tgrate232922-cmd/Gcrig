import SectionHeading from '../components/SectionHeading'
import { DollarSign, TrendingUp, Cpu, BarChart2, Users, ArrowRight } from 'lucide-react'

const streams = [
  {
    icon: DollarSign,
    title: 'Cross-Border Transaction Fees',
    description: 'A percentage-based fee is applied to cross-border capital transfers facilitated through the GCRIG platform. Fees vary by transaction size, route complexity, and client tier.',
    details: ['Volume-based tiering', 'Multi-currency support', 'Transparent fee structure'],
    color: 'teal',
  },
  {
    icon: TrendingUp,
    title: 'Trade Routing Commissions',
    description: 'When GCRIG facilitates international trade initiation and routing, a commission is earned based on the trade value and services provided to buyer, seller, and financier parties.',
    details: ['Trade finance facilitation', 'Counter-party matching', 'Settlement services'],
    color: 'gold',
  },
  {
    icon: Cpu,
    title: 'AI Advisory Subscriptions',
    description: 'Institutional and corporate clients can subscribe to premium AI advisory services, gaining access to advanced market analytics, route optimization tools, and predictive insights.',
    details: ['Monthly/annual plans', 'API data access', 'Custom analytics dashboards'],
    color: 'teal',
  },
  {
    icon: BarChart2,
    title: 'Investment Management Fees',
    description: 'For clients utilizing GCRIG\'s capital recycling investment framework, asset-under-management fees apply to actively managed capital deployment strategies.',
    details: ['AUM-based fees', 'Performance components', 'Transparent reporting'],
    color: 'gold',
  },
  {
    icon: Users,
    title: 'Strategic Partnership Programs',
    description: 'CRB partners and network participants contribute through partnership fees, technology licensing, and revenue sharing arrangements as part of the global liquidity ecosystem.',
    details: ['CRB onboarding fees', 'Technology licensing', 'Revenue sharing model'],
    color: 'teal',
  },
]

export default function BusinessModel() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Business Model
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Diversified <span className="gradient-text">Revenue Streams</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            GCRIG's business model is built on multiple complementary revenue streams that align the platform's success with that of its clients and partners.
          </p>
        </div>
      </section>

      {/* Revenue flow visual */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Revenue Model" title="How GCRIG Generates Value" />
          <div className="flex flex-col items-center gap-4 mb-16">
            <div className="card-glow w-full max-w-xs text-center py-4">
              <div className="text-gold-400 font-bold text-lg">GCRIG Platform</div>
              <div className="text-gray-500 text-sm">Core Infrastructure</div>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-teal-500 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              {['Clients & Investors', 'CRB Partners', 'Trade Participants'].map((node) => (
                <div key={node} className="card-glow text-center py-3">
                  <div className="text-teal-400 font-medium text-sm">{node}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue streams */}
          <div className="space-y-6">
            {streams.map((s, i) => (
              <div key={s.title} className="card-glow grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${s.color === 'teal' ? 'bg-teal-500/10' : 'bg-gold-500/10'}`}>
                    <s.icon className={`w-7 h-7 ${s.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold tracking-wider uppercase mb-1 ${s.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`}>
                      Stream {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-white font-bold">{s.title}</h3>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
                </div>
                <div>
                  <ul className="space-y-2">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 ${s.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`} />
                        <span className="text-gray-300 text-sm">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
