'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Who is Jake's ideal client?",
    answer: "Busy professionals over 35 who are serious about fat loss, building muscle, and getting their body back — without wasting time.",
  },
  {
    question: "Where are sessions held?",
    answer: "At Capitol View, 406 11th Ave N, Nashville, TN 37203 — in The Gulch neighborhood. Private, distraction-free, fully equipped.",
  },
  {
    question: "What makes Jake different?",
    answer: "20 years of experience. A decade training executives, actors, models, and musicians in Los Angeles. He targets the smaller, often-neglected muscles, adjusts your program when needed, and holds you accountable at 5 AM if that's what it takes.",
  },
  {
    question: "What is the coaching program?",
    answer: "A complete system: customized macros, personalized training plan, and mindset coaching delivered with real accountability. Not a generic template.",
  },
  {
    question: "Do you offer early morning sessions?",
    answer: "Yes. Jake is available from 5:00 AM Tuesday through Saturday. If your schedule demands it, Jake is there.",
  },
  {
    question: "How do I get started?",
    answer: "Fill out the application above. Jake will review it and schedule a coaching call. No pressure — just an honest conversation.",
  },
  {
    question: "Do you offer online coaching?",
    answer: "Yes. Jake offers remote coaching — macros, training programming, and accountability — for clients outside Nashville.",
  },
]

export function FAQ() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" ref={sectionRef} className="relative py-20 md:py-32 bg-surface-alt dark:bg-charcoal">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-heading dark:text-pearl">
            QUESTIONS.
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 rounded-lg bg-surface dark:bg-obsidian border border-border hover:border-amber/50 transition-colors text-left"
              >
                <span className="font-sans text-lg font-medium text-heading dark:text-pearl pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-amber shrink-0" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 text-body dark:text-pearl/70 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-display text-xl px-8 py-4 bg-amber text-obsidian rounded hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] hover:scale-[1.02] transition-all duration-200"
          >
            APPLY NOW →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
