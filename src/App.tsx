import { useEffect } from 'react'
import Lenis from 'lenis'
import GsapMenu from './components/GsapMenu'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Work from './sections/Work'
import Process from './sections/Process'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <GsapMenu />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <footer className="py-12 px-6 border-t border-white/5 text-center text-muted text-sm">
        <p>© {new Date().getFullYear()} One Good Dev. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
