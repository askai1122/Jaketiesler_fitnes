'use client'

import { motion } from 'framer-motion'

const authorityItems = [
  '20 YEARS EXPERIENCE',
  'DECADE IN LOS ANGELES',
  'EXECUTIVES · ACTORS · MODELS',
  'MUSICIANS · INDUSTRY PROFESSIONALS',
  'CORNELL UNIVERSITY',
  'MTSU GRADUATE',
  'NASHVILLE NATIVE',
  '5.0 STARS YELP',
  '43 VERIFIED REVIEWS',
  '98 PHOTOS',
]

export function AuthorityBar() {
  return (
    <section className="relative bg-[#0D0D0D] py-4 overflow-hidden">
      <div className="flex animate-marquee">
        {[...authorityItems, ...authorityItems].map((item, i) => (
          <div key={i} className="flex items-center shrink-0 px-4">
            <span className="text-amber mr-4">✦</span>
            <span className="font-mono text-sm tracking-[0.14em] uppercase text-pearl whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
