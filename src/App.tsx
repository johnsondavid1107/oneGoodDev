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
    <div className="relative min-h-screen grain-overlay">
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
      <footer className="py-16 px-6 border-t border-foreground/[0.04] text-center">
        <p className="text-muted/60 text-xs tracking-[0.15em] uppercase font-light">© {new Date().getFullYear()} One Good Dev</p>
      </footer>
    </div>
  )
}

export default App
