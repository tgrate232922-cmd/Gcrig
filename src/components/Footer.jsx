import { Link } from 'react-router-dom'
import { TrendingUp, Twitter, Linkedin, Globe, Mail } from 'lucide-react'

const pages = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/crb-network', label: 'CRB Network' },
  { path: '/services', label: 'Services' },
  { path: '/technology', label: 'Technology' },
  { path: '/investor-solutions', label: 'Investor Solutions' },
  { path: '/business-model', label: 'Business Model' },
  { path: '/vision-mission', label: 'Vision & Mission' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-800 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-500 to-teal-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-navy-900" />
              </div>
              <span className="font-bold text-lg text-white">GC<span className="text-gold-400">RIG</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Global Cash Recycle Investment Group — Intelligent cross-border liquidity and trade routing platform.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal-500/20 flex items-center justify-center text-gray-400 hover:text-teal-400 transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {pages.slice(0, 4).map((p) => (
                <li key={p.path}>
                  <Link to={p.path} className="text-gray-400 hover:text-teal-400 text-sm transition-colors">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {pages.slice(4).map((p) => (
                <li key={p.path}>
                  <Link to={p.path} className="text-gray-400 hover:text-teal-400 text-sm transition-colors">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@gcrig.com" className="flex items-center gap-2 text-gray-400 hover:text-teal-400 text-sm transition-colors">
                <Mail className="w-4 h-4" />
                info@gcrig.com
              </a>
            </div>
            <div className="mt-6">
              <h5 className="text-white font-medium text-sm mb-3">Legal</h5>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Global Cash Recycle Investment Group. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center sm:text-right max-w-sm">
            This platform is for informational purposes only. No investment advice or guaranteed returns are implied.
          </p>
        </div>
      </div>
    </footer>
  )
}
