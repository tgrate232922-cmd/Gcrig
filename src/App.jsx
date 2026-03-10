import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import CRBNetwork from './pages/CRBNetwork'
import Services from './pages/Services'
import Technology from './pages/Technology'
import InvestorSolutions from './pages/InvestorSolutions'
import BusinessModel from './pages/BusinessModel'
import VisionMission from './pages/VisionMission'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-navy-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/crb-network" element={<CRBNetwork />} />
            <Route path="/services" element={<Services />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/investor-solutions" element={<InvestorSolutions />} />
            <Route path="/business-model" element={<BusinessModel />} />
            <Route path="/vision-mission" element={<VisionMission />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
