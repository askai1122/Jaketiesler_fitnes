'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'The Process', href: '#process' },
  { name: 'Results', href: '#testimonials' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-450 ${
          isScrolled
            ? 'bg-obsidian/90 backdrop-blur-[20px] border-b border-amber/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl tracking-tight text-pearl dark:text-pearl light:text-heading">
                JAKE TIESLER
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-amber">
                Personal Training
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans text-sm font-medium text-pearl/70 hover:text-amber transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:6155892438"
                className="font-mono text-sm text-pearl/70 hover:text-pearl transition-colors"
              >
                (615) 589-2438
              </a>
              <a
                href="#contact"
                className="font-display text-lg px-6 py-2.5 bg-amber text-obsidian rounded hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] hover:scale-[1.02] transition-all duration-200"
              >
                Apply Now
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-pearl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-obsidian lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="font-display text-4xl text-pearl hover:text-amber transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="font-display text-2xl px-8 py-4 bg-amber text-obsidian rounded mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apply Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Toggle - Fixed bottom right */}
      {mounted && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-lg border border-amber/20 shadow-lg"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber" />
              ) : (
                <Moon className="w-5 h-5 text-amber" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      )}

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-obsidian border-t border-amber/20 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-pearl/70">Ready to start?</span>
          <a
            href="tel:6155892438"
            className="flex items-center gap-2 font-display text-lg px-6 py-2.5 bg-amber text-obsidian rounded"
          >
            <Phone size={18} />
            (615) 589-2438
          </a>
        </div>
      </div>
    </>
  )
}
