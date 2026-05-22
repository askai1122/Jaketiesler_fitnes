'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "I've always done high-intensity workouts, so I was curious about Jake's targeted approach when it comes to lifting. His programming really works the smaller, often neglected muscles — and I can already see and feel the difference. I've even had friends notice that I look leaner and more defined.",
    source: 'Yelp Review',
  },
  {
    quote: "If you want real results, Jake will get you there. Knowledgeable, motivating, and easy to work with — just an all-around solid guy. Thanks for those 5:30 AM sessions before work.",
    source: 'Yelp Review',
  },
  {
    quote: "Jake did an exceptional job. He was very thorough and genuinely cared about my progress. He adjusted things to fit my needs and made sure I understood the 'why' behind everything. I've made real progress thanks to his guidance.",
    source: 'Yelp Review',
  },
  {
    quote: "Jake's the man. He doesn't just care about fitness — he cares about his clients. He's no-nonsense when it comes to progress, but he'll crack a joke mid-set that keeps you laughing while you grind through one more rep.",
    source: 'Yelp Review',
  },
  {
    quote: "Got me back on track fast. Smart, tailored programming, clear guidance, steady accountability. Great to work with. Highly recommend.",
    source: 'Yelp Review',
  },
  {
    quote: "Jake Tiesler Personal Training was an absolute delight. From the moment I walked in, Jake exuded contagious energy. His expertise and personalized approach helped me achieve my fitness goals while having a blast.",
    source: 'Google Review',
  },
]

export function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-heading dark:text-pearl mb-4">
            REAL CLIENTS. REAL RESULTS.
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber text-amber" />
              ))}
            </div>
            <span className="font-sans text-body dark:text-pearl/70">5.0 Stars · 43 Reviews</span>
          </div>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="relative bg-charcoal rounded-lg p-8 md:p-12 border-l-4 border-amber overflow-hidden">
            {/* Large Quote Mark */}
            <span className="absolute top-4 left-4 font-serif text-[120px] text-amber/10 leading-none select-none">
              &ldquo;
            </span>

            {/* Content */}
            <div className="relative z-10 min-h-[200px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <blockquote className="font-serif text-xl md:text-2xl italic text-pearl leading-relaxed mb-6">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-pearl/60">— {testimonials[current].source}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-amber/40 text-amber hover:bg-amber/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-amber w-6' : 'bg-amber/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-amber/40 text-amber hover:bg-amber/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
