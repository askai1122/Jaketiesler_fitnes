'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const JAKE_TRAINING = 'https://static.wixstatic.com/media/9c1fd7_c2655224ffe6406a810a6291691d4cec~mv2.png'
const JAKE_SESSION = 'https://static.wixstatic.com/media/9c1fd7_7be8cfbc6c1848a5a46e4b67050907c3~mv2.jpg'
const JAKE_CLOSEUP = 'https://static.wixstatic.com/media/9c1fd7_bf05ef58d7164f0983e867c29050ff16~mv2.png'

const services = [
  {
    image: JAKE_TRAINING,
    tag: 'CORE SERVICE',
    title: '1-ON-1 PERSONAL TRAINING',
    description: 'Private sessions built entirely around your body, your schedule, and your goals. Early mornings to evening — Jake is there.',
  },
  {
    image: JAKE_SESSION,
    tag: 'TOTAL TRANSFORMATION',
    title: 'COACHING — MACROS, TRAINING & MINDSET',
    description: 'The complete system: customized nutrition macros, training program, and mindset coaching to keep you consistent when life gets in the way.',
  },
  {
    image: JAKE_CLOSEUP,
    tag: 'STRATEGY CALL',
    title: 'COACHING CALL',
    description: "Not sure where to start? Book a 30-minute coaching call with Jake to map out your transformation roadmap — before committing to anything.",
  },
]

export function Services() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={sectionRef} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-heading dark:text-pearl mb-4">
            WHAT JAKE OFFERS.
          </h2>
          <p className="font-sans text-lg text-body dark:text-pearl/70">
            Three ways to work with the best trainer in Nashville.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ 
  service, 
  index, 
  isInView 
}: { 
  service: typeof services[0]
  index: number
  isInView: boolean 
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.07 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <motion.img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30"
        animate={{ opacity: isHovered ? 0.7 : 0.85 }}
        transition={{ duration: 0.4 }}
      />

      {/* Amber Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-amber"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Tag Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 rounded font-mono text-xs tracking-[0.1em] uppercase bg-amber text-obsidian">
          {service.tag}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="font-display text-2xl md:text-3xl text-pearl mb-2">
          {service.title}
        </h3>
        <p className="font-sans text-sm text-pearl/70 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}
