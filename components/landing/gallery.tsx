'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const images = [
  { src: 'https://static.wixstatic.com/media/9c1fd7_90a48fab8d304547b7e2f2d57812c3ec~mv2.jpg', alt: 'Jake Tiesler portrait' },
  { src: 'https://static.wixstatic.com/media/9c1fd7_c2655224ffe6406a810a6291691d4cec~mv2.png', alt: 'Jake training client' },
  { src: 'https://static.wixstatic.com/media/9c1fd7_7be8cfbc6c1848a5a46e4b67050907c3~mv2.jpg', alt: 'Jake client session' },
  { src: 'https://static.wixstatic.com/media/9c1fd7_bf05ef58d7164f0983e867c29050ff16~mv2.png', alt: 'Jake coaching close-up' },
  { src: 'https://static.wixstatic.com/media/9c1fd7_c87c2841a17c45c48dacb13423f55a5c~mv2.png', alt: 'Jake with client workout' },
  { src: 'https://static.wixstatic.com/media/9c1fd7_3dd15d0f4aa24f61b839bccd0c269c39~mv2.png', alt: 'Jake training session' },
]

export function Gallery() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!galleryRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - galleryRef.current.offsetLeft)
    setScrollLeft(galleryRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !galleryRef.current) return
    e.preventDefault()
    const x = e.pageX - galleryRef.current.offsetLeft
    const walk = (x - startX) * 2
    galleryRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <section id="gallery" ref={sectionRef} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-heading dark:text-pearl mb-4">
            IN THE GYM.
          </h2>
          <p className="font-sans text-lg text-body dark:text-pearl/70">
            Capitol View · Nashville, TN
          </p>
        </motion.div>
      </div>

      {/* Gallery */}
      <motion.div
        ref={galleryRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing px-6 md:px-12 lg:px-20 snap-x snap-mandatory"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
      >
        {images.map((image, i) => (
          <GalleryImage key={i} image={image} />
        ))}
      </motion.div>

      {/* Caption */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-6">
        <p className="font-mono text-sm text-muted-foreground">
          98 photos on Yelp — @jaketieslerfitness on Instagram
        </p>
      </div>
    </section>
  )
}

function GalleryImage({ image }: { image: { src: string; alt: string } }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative shrink-0 h-[420px] w-[320px] md:w-[380px] rounded overflow-hidden snap-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 0.1 }}
        draggable={false}
      />
      <motion.div
        className="absolute inset-0 rounded border-2 border-amber pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  )
}
