'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { GraduationCap, Building, MapPin, Dumbbell } from 'lucide-react'

const JAKE_COACHING = 'https://static.wixstatic.com/media/9c1fd7_c87c2841a17c45c48dacb13423f55a5c~mv2.png'

const stats = [
  { value: 20, label: 'Years Training', suffix: '+' },
  { value: 5.0, label: 'Yelp Rating', suffix: ' ★', isDecimal: true },
  { value: 43, label: 'Reviews', suffix: '' },
  { value: 10, label: 'Years in LA', suffix: '' },
]

const credentials = [
  { icon: GraduationCap, text: 'MTSU · Cornell University' },
  { icon: Building, text: 'LA: Executives · Actors · Models · Musicians' },
  { icon: MapPin, text: 'Nashville Native · Capitol View / The Gulch' },
  { icon: Dumbbell, text: 'Busy Professionals 35+' },
]

function AnimatedCounter({ value, suffix = '', isDecimal = false }: { value: number; suffix?: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(current)
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl text-amber">
      {isDecimal ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  )
}

export function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-0">
          {/* Left - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full">
              <img
                src={JAKE_COACHING}
                alt="Jake Tiesler coaching a client"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-y-0 right-0 w-[1px] bg-amber hidden lg:block" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="lg:pl-12 xl:pl-20"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-amber mb-4">
              Who Is Jake Tiesler
            </p>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-heading dark:text-pearl leading-[0.95] mb-4">
              20 YEARS.<br />
              TWO CITIES.<br />
              ONE STANDARD.
            </h2>

            <div className="h-[2px] w-24 bg-amber mb-6" />

            <div className="space-y-4 text-body dark:text-pearl/80 text-base md:text-lg leading-relaxed mb-8">
              <p>
                Jake Tiesler is a Nashville native — MTSU and Cornell educated — who spent 
                a decade in Los Angeles training industry executives, actors, models, 
                and musicians before returning home to bring that same standard to Nashville.
              </p>
              <p>
                His approach is simple and it works: target the right muscles, 
                build the right habits, and hold you accountable at 5 AM 
                if that&apos;s what it takes. He adjusts when needed, 
                explains the why behind everything, and does not waste your time. 
                20 years. Zero shortcuts.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-surface-alt dark:bg-surface border border-border">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                  <p className="font-sans text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Credential Pills */}
            <div className="flex flex-wrap gap-3">
              {credentials.map((cred, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber/40 bg-surface-alt dark:bg-surface"
                >
                  <cred.icon className="w-4 h-4 text-amber" />
                  <span className="font-mono text-xs text-body dark:text-pearl/80">{cred.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
