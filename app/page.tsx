import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { ResultsTicker } from '@/components/landing/results-ticker'
import { About } from '@/components/landing/about'
import { AuthorityBar } from '@/components/landing/authority-bar'
import { Services } from '@/components/landing/services'
import { Process } from '@/components/landing/process'
import { Gallery } from '@/components/landing/gallery'
import { Testimonials } from '@/components/landing/testimonials'
import { Contact } from '@/components/landing/contact'
import { FAQ } from '@/components/landing/faq'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ResultsTicker />
      <About />
      <AuthorityBar />
      <Services />
      <Process />
      <Gallery />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  )
}
