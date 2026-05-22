'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'APPLY',
    description: "Fill out the training application. Tell Jake where you are, where you want to be, and what's been standing in the way.",
  },
  {
    number: '02',
    title: 'STRATEGY CALL',
    description: "Jake reviews your application and schedules a call. No sales pressure — just an honest conversation about what will actually work.",
  },
  {
    number: '03',
    title: 'CUSTOM PROGRAM',
    description: "Jake builds your training plan, nutrition targets, and accountability system — tailored completely to your body, your schedule, and your goals.",
  },
  {
    number: '04',
    title: 'RESULTS',
    description: "Show up. Do the work. Jake handles everything else. Real results. No shortcuts. No exceptions.",
  },
]

export function Process() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="process" ref={sectionRef} className="relative py-20 md:py-32 bg-obsidian dark:bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-pearl mb-4">
            THE PROCESS.
          </h2>
          <p className="font-sans text-lg text-pearl/70">
            Simple. Proven. Repeatable.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-amber/20 -translate-y-1/2" />
          
          {/* Connecting Line - Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-8 w-[2px] bg-amber/20" />

          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative flex md:flex-col items-start md:items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.15 }}
              >
                {/* Number */}
                <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-obsidian border-2 border-amber shrink-0">
                  <span className="font-display text-3xl text-amber">{step.number}</span>
                </div>

                {/* Content */}
                <div className="ml-6 md:ml-0 md:mt-6 md:text-center">
                  <h3 className="font-display text-xl md:text-2xl text-pearl mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-pearl/60 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
