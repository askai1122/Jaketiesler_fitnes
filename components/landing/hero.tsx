'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'

const JAKE_MAIN_PORTRAIT = 'https://static.wixstatic.com/media/9c1fd7_90a48fab8d304547b7e2f2d57812c3ec~mv2.jpg'

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={JAKE_MAIN_PORTRAIT}
          alt="Jake Tiesler - Nashville Personal Trainer"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/55 via-obsidian/75 to-obsidian/95" />
      </div>

      {/* Grain Texture */}
      <div className="grain-overlay" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Label */}
        {/* <motion.p
          className="font-mono text-xs md:text-sm tracking-[0.14em] uppercase text-amber mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
         </motion.p> */}
        <br></br>
        {/* Animated Amber Rule */}
        <motion.div
          className="h-[2px] bg-amber mb-6 origin-left mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          style={{ width: '120px' }}
        />

        {/* Headline */}
        <div className="space-y-0">
          {['BUILT FOR', 'BUSY.', 'DESIGNED', 'FOR RESULTS.'].map((line, i) => (
            <motion.h1
              key={line}
              className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.9] tracking-[-0.02em] text-pearl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Body */}
        <motion.p
          className="font-sans text-base md:text-lg text-pearl/80 max-w-xl mt-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Jake Tiesler has spent 20 years training Nashville&apos;s busiest executives — 
          one-on-one, no excuses, real results. If you&apos;re over 35 and serious about 
          your body, this is where you start.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-display text-xl px-8 py-4 bg-amber text-obsidian rounded hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] hover:scale-[1.02] transition-all duration-200"
          >
            Apply For Training →
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center font-display text-xl px-8 py-4 border-2 border-pearl/50 text-pearl rounded hover:border-pearl hover:bg-pearl/5 transition-all duration-200"
          >
            See Services
          </a>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div
        className="absolute bottom-32 md:bottom-40 right-6 md:right-12 lg:right-20 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{ 
          opacity: { duration: 0.6, delay: 1 },
          scale: { duration: 0.6, delay: 1 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/20 backdrop-blur-lg border border-amber/30">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber text-amber" />
            ))}
          </div>
          <span className="font-mono text-xs text-pearl">5.0 · 43 Reviews · Yelp</span>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.2 },
          y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <ChevronDown className="w-8 h-8 text-amber" />
      </motion.div>
    </section>
  )
}
