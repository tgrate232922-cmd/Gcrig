import SectionHeading from '../components/SectionHeading'
import { Cpu, Activity, Globe, TrendingUp, Shield, BarChart2, Zap, Database } from 'lucide-react'

const metrics = [
  { icon: Activity, label: 'Currency Exchange Rates', desc: 'Live monitoring of 150+ currency pairs with AI-driven trend detection.', value: '150+', unit: 'Pairs' },
  { icon: BarChart2, label: 'Market Volatility', desc: 'Real-time volatility index for key global markets and asset classes.', value: '24/7', unit: 'Monitoring' },
  { icon: Globe, label: 'Trade Demand', desc: 'Cross-border trade flow analysis by region and sector.', value: '40+', unit: 'Markets' },
  { icon: Database, label: 'Regional Liquidity Levels', desc: 'Tracking available liquidity across CRB nodes in real time.', value: '500+', unit: 'Data Points' },
  { icon: TrendingUp, label: 'Inflation & Interest Rates', desc: 'Macro-economic indicator monitoring for 40+ country markets.', value: '40+', unit: 'Economies' },
  { icon: Shield, label: 'Regulatory Environments', desc: 'Compliance database covering financial regulations across jurisdictions.', value: '60+', unit: 'Jurisdictions' },
]

const capabilities = [
  { icon: Cpu, title: 'Machine Learning Core', desc: 'Ensemble ML models trained on years of cross-border transaction data to predict optimal routing.' },
  { icon: Zap, title: 'Real-Time Processing', desc: 'Sub-second data ingestion and analysis across thousands of market feeds simultaneously.' },
  { icon: Activity, title: 'Predictive Analytics', desc: 'Forward-looking models that anticipate market movements and liquidity shifts before they occur.' },
  { icon: Shield, title: 'Risk Assessment', desc: 'Automated risk scoring for every proposed route, factoring in market, credit, and operational risks.' },
]

export default function Technology() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-widest uppercase mb-6">
            AI Technology
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The AI <span className="gradient-text">Advisory Engine</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A proprietary artificial intelligence platform that continuously monitors global market conditions to identify optimal financial routes for capital deployment and cross-border transfers.
          </p>
        </div>
      </section>

      {/* Dashboard visual */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="card-glow p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-gold-500/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-teal-400 text-sm font-medium">AI Engine — Live Monitoring</span>
                <div className="ml-auto text-gray-500 text-xs">Last updated: just now</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Routes Analyzed', value: '2,847', trend: '+12%' },
                  { label: 'Optimal Routes', value: '314', trend: '+5%' },
                  { label: 'Avg. Route Score', value: '87.4', trend: '+2.1' },
                  { label: 'Risk Alerts', value: '3', trend: '-2' },
                  { label: 'Markets Active', value: '38', trend: '0' },
                  { label: 'Data Points', value: '1.2M', trend: '+8%' },
                ].map((item) => (
                  <div key={item.label} className="bg-navy-700/50 rounded-xl p-4">
                    <div className="text-gray-400 text-xs mb-2">{item.label}</div>
                    <div className="text-white font-bold text-xl">{item.value}</div>
                    <div className={`text-xs mt-1 ${item.trend.startsWith('+') ? 'text-teal-400' : item.trend.startsWith('-') ? 'text-red-400' : 'text-gray-500'}`}>
                      {item.trend}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                {[
                  { label: 'USD → EUR → AED Route Efficiency', value: 94 },
                  { label: 'CNY → USD → GBP Route Efficiency', value: 87 },
                  { label: 'JPY → SGD → INR Route Efficiency', value: 79 },
                  { label: 'BRL → USD → ZAR Route Efficiency', value: 72 },
                ].map((route) => (
                  <div key={route.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{route.label}</span>
                      <span className="text-teal-400">{route.value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-gold-500 rounded-full" style={{ width: `${route.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it monitors */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Data Sources" title="What the AI Monitors" subtitle="Six critical market dimensions analyzed continuously for optimal routing decisions." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="card-glow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <m.icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm">{m.label}</h3>
                      <span className="ml-auto text-gold-400 font-bold">{m.value}</span>
                    </div>
                    <div className="text-gray-500 text-xs mb-2">{m.unit}</div>
                    <p className="text-gray-400 text-sm">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Capabilities" title="Core Technology Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="card-glow flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <cap.icon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{cap.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
