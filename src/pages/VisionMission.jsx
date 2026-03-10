import SectionHeading from '../components/SectionHeading'
import { Eye, Target, Heart, Globe, Shield, Zap, Users, TrendingUp } from 'lucide-react'

const coreValues = [
  { icon: Globe, title: 'Global Perspective', desc: 'We think beyond borders, enabling capital to flow efficiently across the world.' },
  { icon: Shield, title: 'Integrity & Trust', desc: 'Every relationship is built on transparency, compliance, and verified credentials.' },
  { icon: Zap, title: 'Innovation', desc: 'We continuously advance our technology to stay ahead of global market dynamics.' },
  { icon: Users, title: 'Partnership', desc: 'Our CRB network thrives through collaboration and mutual benefit.' },
  { icon: TrendingUp, title: 'Excellence', desc: 'We hold ourselves and our partners to the highest operational standards.' },
  { icon: Heart, title: 'Responsibility', desc: 'We operate with awareness of the broader economic and social impact of capital flows.' },
]

export default function VisionMission() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Our Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Vision, Mission &{' '}
            <span className="gradient-text">Core Values</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The principles that guide every decision, partnership, and innovation at Global Cash Recycle Investment Group.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-teal-400" />
                </div>
                <div className="text-teal-400 text-sm font-semibold tracking-wider uppercase mb-3">Our Vision</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  The World's Leading Cross-Border Liquidity Routing Ecosystem
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  To become the world's most trusted and efficient cross-border liquidity routing ecosystem — a platform where capital moves seamlessly, intelligently, and compliantly across every market on earth.
                </p>
                <div className="mt-6 p-4 bg-teal-500/5 rounded-xl border border-teal-500/10">
                  <p className="text-teal-300 text-sm italic">
                    "We envision a world where geographical barriers no longer impede the efficient flow of capital."
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="card-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-gold-400" />
                </div>
                <div className="text-gold-400 text-sm font-semibold tracking-wider uppercase mb-3">Our Mission</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Empowering Businesses & Investors with AI-Driven Capital Routing
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  To empower businesses and investors with AI-driven capital routing and global liquidity access — enabling them to move capital efficiently, identify optimal investment routes, and participate in the global economy with confidence.
                </p>
                <div className="mt-6 p-4 bg-gold-500/5 rounded-xl border border-gold-500/10">
                  <p className="text-gold-300 text-sm italic">
                    "Our mission is to democratize access to global liquidity through technology and verified partnerships."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-navy-800/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Values" title="Core Values" subtitle="The principles that shape our culture, guide our decisions, and define our relationships." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <div key={v.title} className="card-glow flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${i % 2 === 0 ? 'bg-teal-500/10' : 'bg-gold-500/10'}`}>
                  <v.icon className={`w-6 h-6 ${i % 2 === 0 ? 'text-teal-400' : 'text-gold-400'}`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic goals */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Strategic Goals" title="Where We're Headed" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { year: '2025', goal: 'Expand to 1,000+ CRB Partners', desc: 'Double our network size with a focus on emerging markets in Africa, Southeast Asia, and Latin America.' },
              { year: '2026', goal: 'Launch Next-Gen AI Platform', desc: 'Deploy the next generation of our AI advisory engine with enhanced predictive capabilities and real-time route optimization.' },
              { year: '2027', goal: '$10B+ Capital Routed', desc: 'Scale the platform to route over $10 billion in cross-border capital annually through the GCRIG network.' },
            ].map((goal) => (
              <div key={goal.year} className="card-glow">
                <div className="text-gold-400 font-bold text-2xl mb-2">{goal.year}</div>
                <h3 className="text-white font-semibold mb-3">{goal.goal}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
