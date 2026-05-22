'use client'

import { motion } from 'framer-motion'

const tickerItems = [
  'LOST 28 LBS IN 90 DAYS',
  'LEANER AND MORE DEFINED',
  '5:30 AM SESSIONS BEFORE WORK',
  'SMALLER NEGLECTED MUSCLES TARGETED',
  'SMART TAILORED PROGRAMMING',
  'REAL ACCOUNTABILITY',
  "NASHVILLE'S TOP EXECUTIVE TRAINER",
  '20 YEARS · LA + NASHVILLE',
  '5.0 STARS · 43 REVIEWS',
]

export function ResultsTicker() {
  return (
    <section className="relative bg-charcoal py-4 overflow-hidden">
      <div className="flex animate-marquee">
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center shrink-0 px-4">
            <span className="text-amber mr-4">✦</span>
            <span className="font-display text-lg md:text-xl text-pearl whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
