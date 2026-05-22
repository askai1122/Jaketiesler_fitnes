'use client'

import Link from 'next/link'
import { Instagram, Facebook, Youtube, Star } from 'lucide-react'

const services = [
  '1-on-1 Personal Training',
  'Coaching — Macros & Mindset',
  'Coaching Calls',
]

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'The Process', href: '#process' },
  { name: 'Results', href: '#testimonials' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
  { name: 'FAQ', href: '#faq' },
]

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-display text-2xl text-pearl">JAKE TIESLER</span>
              <span className="block font-mono text-xs tracking-[0.14em] uppercase text-amber">
                Personal Training
              </span>
            </div>
            <p className="font-mono text-xs text-pearl/50 mb-4">
              Capitol View · Nashville, TN
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/jaketieslerfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-pearl/20 text-pearl/50 hover:text-amber hover:border-amber transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/jaketiesler"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-pearl/20 text-pearl/50 hover:text-amber hover:border-amber transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@Jaketieslercoaching"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-pearl/20 text-pearl/50 hover:text-amber hover:border-amber transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://yelp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-pearl/20 text-pearl/50 hover:text-amber hover:border-amber transition-colors"
              >
                <Star className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.14em] uppercase text-amber mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="font-sans text-sm text-pearl/50 hover:text-pearl transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.14em] uppercase text-amber mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-pearl/50 hover:text-pearl transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.14em] uppercase text-amber mb-4">
              Contact
            </h4>
            <div className="space-y-2 font-mono text-sm text-pearl/50">
              <p>406 11th Ave N</p>
              <p>Nashville, TN 37203</p>
              <p className="pt-2">
                <a href="tel:6155892438" className="hover:text-amber transition-colors">
                  (615) 589-2438
                </a>
              </p>
              <p>
                <a href="mailto:jaketiesler@gmail.com" className="hover:text-amber transition-colors">
                  jaketiesler@gmail.com
                </a>
              </p>
              <div className="pt-4 text-xs">
                <p>Mon: 5:00 AM – 6:00 PM</p>
                <p>Tue–Sat: 5:00 AM – 8:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-amber/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-mono text-xs text-pearl/40">
            © 2025 Jake Tiesler Personal Training · 406 11th Ave N, Nashville, TN 37203 · (615) 589-2438
          </p>
          <p className="font-mono text-xs text-pearl/40">
            Created with love ❤️ by{' '}
            <a
              href="https://zahriontech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              Zahrion Tech
            </a>
          </p>
        </div>
      </div>

      {/* Demo Watermark */}
      <div className="fixed bottom-24 lg:bottom-6 left-6 z-50">
        <a
          href="https://zahriontech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/20 backdrop-blur-lg border border-amber/40 text-amber font-mono text-xs hover:bg-surface/30 transition-colors"
        >
          <span className="text-amber">✦</span>
          Demo by ZahrionTech
        </a>
      </div>
    </footer>
  )
}
