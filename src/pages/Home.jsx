import { Link } from 'react-router-dom'
import {
  Globe, Cpu, ArrowRight, Zap, Shield, BarChart2,
  Network, TrendingUp, DollarSign, Users, CheckCircle, Target
} from 'lucide-react'
import HeroSection from '../components/HeroSection'
import StatCounter from '../components/StatCounter'
import ServiceCard from '../components/ServiceCard'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'

const stats = [
  { value: '500', suffix: '+', label: 'Global Partners' },
  { value: '40', suffix: '+', label: 'Countries' },
  { value: '2', prefix: '$', suffix: 'B+', label: 'Capital Routed' },
  { value: '99', suffix: '.9%', label: 'Platform Uptime' },
]

const steps = [
  { icon: Users, step: '01', title: 'Onboard & Verify', desc: 'Connect with our verified network of Cash Recycle Bodies across 40+ countries.' },
  { icon: Cpu, step: '02', title: 'AI Route Analysis', desc: 'Our AI engine analyzes market conditions, rates, and liquidity levels to identify optimal routes.' },
  { icon: Globe, step: '03', title: 'Deploy Capital', desc: 'Execute cross-border transfers and trade routing with precision and transparency.' },
  { icon: TrendingUp, step: '04', title: 'Monitor & Optimize', desc: 'Continuous monitoring and reinvestment through the Capital Recycling Model.' },
]

const services = [
  { icon: Globe, title: 'Cross-Border Liquidity', desc: 'Move capital across borders through verified partner networks.', accent: 'teal' },
  { icon: Cpu, title: 'AI Investment Intelligence', desc: 'Machine learning algorithms identify optimal investment routes.', accent: 'gold' },
  { icon: Network, title: 'Global Trade Initiation', desc: 'Streamlined international trade operations management.', accent: 'teal' },
  { icon: TrendingUp, title: 'Capital Recycling', desc: 'Systematic reinvestment framework maximizing capital utilization.', accent: 'gold' },
  { icon: DollarSign, title: 'Institutional Liquidity', desc: 'Premium liquidity solutions for large-scale operations.', accent: 'teal' },
  { icon: Users, title: 'Strategic Partnerships', desc: 'Collaborative frameworks for joining the global liquidity network.', accent: 'gold' },
]

const investors = [
  { icon: Users, type: 'Private Investors', desc: 'Tailored cross-border diversification with AI-guided investment opportunities and portfolio management.', color: 'teal' },
  { icon: BarChart2, type: 'Institutional Investors', desc: 'Enterprise-grade liquidity access, custom routing protocols, and dedicated account management.', color: 'gold' },
  { icon: Target, type: 'Corporate Clients', desc: 'Working capital optimization, trade finance, and strategic liquidity management for businesses.', color: 'teal' },
]

const advantages = [
  { icon: Shield, title: 'Verified Network', desc: '500+ vetted CRB partners' },
  { icon: Cpu, title: 'AI-Powered', desc: 'Advanced ML route optimization' },
  { icon: Globe, title: 'Global Reach', desc: '40+ countries covered' },
  { icon: Zap, title: 'Fast Execution', desc: 'Real-time capital routing' },
  { icon: CheckCircle, title: 'Compliance', desc: 'Regulatory-aware operations' },
  { icon: BarChart2, title: 'Transparency', desc: 'Full audit trail & reporting' },
]

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Platform Introduction */}
      <section className="section-padding bg-navy-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 leading-relaxed">
            GCRIG operates at the intersection of fintech innovation and global capital markets. Through our AI-driven platform and extensive Cash Recycle Body network, we enable efficient, compliant cross-border capital movement for investors and institutions worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5 rounded-2xl border border-white/5 bg-navy-800/30 overflow-hidden">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Process" title="How the Platform Works" subtitle="Four steps to optimize your cross-border capital deployment." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="card-glow relative">
                <div className="text-5xl font-bold text-white/5 absolute top-4 right-4">{step.step}</div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Services" title="Core Platform Services" subtitle="Comprehensive solutions for cross-border liquidity and trade routing." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {services.map((s) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.desc} accent={s.accent} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Technology */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading badge="Technology" title="AI-Powered Advisory Engine" subtitle="Our proprietary AI monitors global market conditions to recommend optimal financial routes." center={false} />
              <div className="space-y-3">
                {['Currency exchange rate monitoring', 'Real-time market volatility analysis', 'Regional liquidity level assessment', 'Regulatory environment scanning', 'Inflation and interest rate tracking'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/technology" className="btn-primary inline-flex items-center gap-2">
                  Explore Technology <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="card-glow">
              <div className="space-y-3">
                {[
                  { label: 'Market Efficiency Score', value: 94, color: 'teal' },
                  { label: 'Route Optimization', value: 87, color: 'gold' },
                  { label: 'Network Coverage', value: 78, color: 'teal' },
                  { label: 'Compliance Rate', value: 99, color: 'gold' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{item.label}</span>
                      <span className={item.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}>{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color === 'teal' ? 'bg-teal-500' : 'bg-gold-500'}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Types */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Investors" title="Solutions for Every Investor" subtitle="Tailored approaches for private, institutional, and corporate clients." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investors.map((inv) => (
              <div key={inv.type} className="card-glow text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${inv.color === 'teal' ? 'bg-teal-500/10' : 'bg-gold-500/10'}`}>
                  <inv.icon className={`w-7 h-7 ${inv.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{inv.type}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{inv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Why GCRIG" title="Competitive Advantages" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {advantages.map((adv) => (
              <div key={adv.title} className="card-glow text-center">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <adv.icon className="w-5 h-5 text-teal-400" />
                </div>
                <h4 className="text-white text-sm font-semibold mb-1">{adv.title}</h4>
                <p className="text-gray-500 text-xs">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glow p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-gold-500/10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to optimize your capital flow?</h2>
              <p className="text-gray-400 mb-8">Join 500+ global partners already leveraging the GCRIG platform.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/investor-solutions" className="btn-primary inline-flex items-center gap-2">
                  Get Started Today <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/crb-network" className="btn-secondary inline-flex items-center gap-2">
                  Explore CRB Network
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-3xl mx-auto">
          <SectionHeading badge="Contact" title="Get in Touch" subtitle="Reach out to learn how GCRIG can support your capital objectives." />
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
