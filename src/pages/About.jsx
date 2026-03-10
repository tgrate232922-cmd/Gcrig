import SectionHeading from '../components/SectionHeading'
import { Globe, Users, Cpu, TrendingUp, CheckCircle, Shield } from 'lucide-react'

const milestones = [
  { year: '2019', title: 'Platform Founded', desc: 'GCRIG established with a mission to modernize cross-border capital routing.' },
  { year: '2020', title: 'First 50 CRB Partners', desc: 'Initial network of Cash Recycle Bodies formed across 10 countries.' },
  { year: '2021', title: 'AI Engine Launched', desc: 'Proprietary AI advisory system deployed for intelligent route optimization.' },
  { year: '2022', title: 'Expanded to 200+ Partners', desc: 'Network grew to 25+ countries with institutional-grade clients onboarded.' },
  { year: '2023', title: 'Global Scale Achieved', desc: '500+ verified CRB partners across 40+ countries. $2B+ capital routed.' },
]

const values = [
  { icon: Globe, title: 'Global Perspective', desc: 'We think at a global scale, connecting markets and enabling cross-border capital flow.' },
  { icon: Shield, title: 'Integrity First', desc: 'Every partner is verified. Every transaction is compliant. Trust is our foundation.' },
  { icon: Cpu, title: 'Technology-Driven', desc: 'AI and advanced analytics underpin every decision on our platform.' },
  { icon: Users, title: 'Partner-Centric', desc: 'Our CRB network partners are the core of the ecosystem. We grow together.' },
]

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-teal-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
              About GCRIG
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Redefining Cross-Border{' '}
              <span className="gradient-text">Capital Flow</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Global Cash Recycle Investment Group (GCRIG) is a cross-border liquidity and trade routing platform designed to improve how capital moves across international markets.
            </p>
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Our Story</h2>
              <p className="text-gray-400 leading-relaxed">
                GCRIG was built to solve a fundamental challenge in global finance: the inefficiency of cross-border capital movement. Traditional methods are slow, costly, and opaque. We built a better way.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The company operates through a network of 500+ verified global partners called Cash Recycle Bodies (CRBs). These partners help facilitate capital transfers, liquidity deployment, and trade routing between different regions.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our system uses AI-assisted market analysis to recommend optimal financial routes and investment opportunities, giving clients a significant advantage in global capital markets.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: '40+ Countries', sub: 'Global network reach', color: 'teal' },
                { icon: Users, label: '500+ CRBs', sub: 'Verified partners', color: 'gold' },
                { icon: TrendingUp, label: '$2B+', sub: 'Capital routed', color: 'teal' },
                { icon: Cpu, label: 'AI-Driven', sub: 'Route optimization', color: 'gold' },
              ].map((item) => (
                <div key={item.label} className="card-glow text-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${item.color === 'teal' ? 'bg-teal-500/10' : 'bg-gold-500/10'}`}>
                    <item.icon className={`w-5 h-5 ${item.color === 'teal' ? 'text-teal-400' : 'text-gold-400'}`} />
                  </div>
                  <div className="text-white font-bold">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-4xl mx-auto">
          <SectionHeading badge="Journey" title="Our Milestones" subtitle="Key moments in building the world's leading cross-border liquidity platform." />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500 via-gold-500 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 pl-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-navy-800 border-2 border-teal-500 flex items-center justify-center relative z-10">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                    </div>
                  </div>
                  <div className="card-glow flex-1 pt-0">
                    <span className="text-gold-400 text-sm font-semibold">{m.year}</span>
                    <h3 className="text-white font-semibold mt-1 mb-2">{m.title}</h3>
                    <p className="text-gray-400 text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Culture" title="Our Core Values" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-glow">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership placeholder */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Leadership" title="Executive Team" subtitle="Experienced professionals from global finance, technology, and regulatory sectors." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Chief Executive Officer', role: 'Platform Strategy & Vision' },
              { name: 'Chief Technology Officer', role: 'AI Platform & Engineering' },
              { name: 'Chief Operating Officer', role: 'Global CRB Network' },
            ].map((member) => (
              <div key={member.name} className="card-glow text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500/20 to-gold-500/20 border border-white/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
