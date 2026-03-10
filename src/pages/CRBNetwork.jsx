import SectionHeading from '../components/SectionHeading'
import WorldMap from '../components/WorldMap'
import { Globe, ArrowRight, Network, DollarSign, TrendingUp, RefreshCw, BarChart2 } from 'lucide-react'

const capabilities = [
  { icon: DollarSign, title: 'Receive Capital', desc: 'Accept inbound liquidity from partner nodes and institutional sources.' },
  { icon: Globe, title: 'Deploy Liquidity Locally', desc: 'Put capital to work in local markets and investment opportunities.' },
  { icon: ArrowRight, title: 'Cross-Border Transfers', desc: 'Facilitate outbound capital flows to connected CRB nodes globally.' },
  { icon: TrendingUp, title: 'Initiate Trade Routes', desc: 'Launch and manage international trade operations and financing.' },
  { icon: RefreshCw, title: 'Support Investment Cycles', desc: 'Participate in the circular capital recycling model.' },
  { icon: BarChart2, title: 'Market Reporting', desc: 'Provide regional market data to the AI advisory engine.' },
]

const regions = [
  { region: 'North America', nodes: 85, countries: 3 },
  { region: 'Europe', nodes: 120, countries: 12 },
  { region: 'Middle East & Africa', nodes: 95, countries: 11 },
  { region: 'Asia Pacific', nodes: 150, countries: 10 },
  { region: 'South America', nodes: 50, countries: 4 },
]

export default function CRBNetwork() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Global Infrastructure
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The Cash Recycle Body{' '}
            <span className="gradient-text">Network</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Cash Recycle Bodies (CRBs) are partner entities located across different countries that participate in the global liquidity circulation network. Each CRB acts as a regional node in the ecosystem.
          </p>
        </div>
      </section>

      {/* World Map */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Network Map" title="500+ Active Nodes Worldwide" subtitle="Hover over nodes to explore regional CRB partners." />
          <WorldMap />
        </div>
      </section>

      {/* Regional breakdown */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Regions" title="Regional Distribution" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {regions.map((r) => (
              <div key={r.region} className="card-glow text-center">
                <Network className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1">{r.region}</h3>
                <div className="text-2xl font-bold text-teal-400 mb-1">{r.nodes}</div>
                <div className="text-gray-500 text-xs">CRB Nodes</div>
                <div className="text-gold-400 text-xs mt-1">{r.countries} Countries</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRB Capabilities */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Capabilities" title="What Each CRB Can Do" subtitle="Every node in our network is equipped to perform core liquidity functions." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="card-glow flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <cap.icon className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{cap.title}</h3>
                  <p className="text-gray-400 text-sm">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CRB */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glow p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-gold-500/5" />
            <div className="relative z-10">
              <Globe className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Become a CRB Partner</h2>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Organizations that meet our verification criteria can apply to join the global CRB network and participate in cross-border liquidity operations.
              </p>
              <a href="/investor-solutions" className="btn-primary inline-flex items-center gap-2">
                Learn About Partnership <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
