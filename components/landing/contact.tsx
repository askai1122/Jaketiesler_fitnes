'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Star, CheckCircle, Loader2 } from 'lucide-react'

const referralSources = [
  'YouTube',
  'Google',
  'Yelp',
  'Instagram',
  'Facebook',
  'Referral',
  'Other',
]

const serviceOptions = [
  { id: 'training', label: '1-on-1 Personal Training', icon: '🏋️' },
  { id: 'coaching', label: 'Coaching — Macros, Training & Mindset', icon: '📊' },
  { id: 'call', label: 'Book a Coaching Call', icon: '📞' },
]

export function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: '',
    referral: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-heading dark:text-pearl mb-4">
            READY TO START?
          </h2>
          <p className="font-serif text-xl italic text-amber">
            &ldquo;The hardest part is the first step. Make it here.&rdquo;
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[40%_60%] gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="space-y-6 font-mono text-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber mt-0.5 shrink-0" />
                <div>
                  <p className="text-body dark:text-pearl">406 11th Ave N, Nashville, TN 37203</p>
                  <p className="text-muted-foreground">Capitol View · The Gulch</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-amber shrink-0" />
                <a href="tel:6155892438" className="text-body dark:text-pearl hover:text-amber transition-colors">
                  (615) 589-2438
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-amber shrink-0" />
                <a href="mailto:jaketiesler@gmail.com" className="text-body dark:text-pearl hover:text-amber transition-colors">
                  jaketiesler@gmail.com
                </a>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-amber mt-0.5 shrink-0" />
                <div className="text-body dark:text-pearl">
                  <p>Mon: 5:00 AM – 6:00 PM</p>
                  <p>Tue–Sat: 5:00 AM – 8:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://instagram.com/jaketieslerfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded border border-border hover:border-amber hover:text-amber transition-colors text-body dark:text-pearl"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-mono text-sm">Instagram</span>
              </a>
              <a
                href="https://facebook.com/jaketiesler"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded border border-border hover:border-amber hover:text-amber transition-colors text-body dark:text-pearl"
              >
                <Facebook className="w-5 h-5" />
                <span className="font-mono text-sm">Facebook</span>
              </a>
            </div>
            <div className="flex gap-4 mt-3">
              <a
                href="https://youtube.com/@Jaketieslercoaching"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded border border-border hover:border-amber hover:text-amber transition-colors text-body dark:text-pearl"
              >
                <Youtube className="w-5 h-5" />
                <span className="font-mono text-sm">YouTube</span>
              </a>
              <a
                href="https://yelp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded border border-border hover:border-amber hover:text-amber transition-colors text-body dark:text-pearl"
              >
                <Star className="w-5 h-5" />
                <span className="font-mono text-sm">Yelp</span>
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full p-8 rounded-lg bg-surface border border-amber text-center">
                <CheckCircle className="w-16 h-16 text-amber mb-4" />
                <h3 className="font-display text-2xl text-heading dark:text-pearl mb-2">
                  APPLICATION RECEIVED
                </h3>
                <p className="font-sans text-body dark:text-pearl/70">
                  Jake will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-lg bg-surface dark:bg-charcoal border border-border">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-background border border-border focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors text-body dark:text-pearl"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-background border border-border focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors text-body dark:text-pearl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-background border border-border focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors text-body dark:text-pearl"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-background border border-border focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors text-body dark:text-pearl"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="mb-4">
                  <label className="block font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    What best describes your needs?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedService(option.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedService === option.id
                            ? 'bg-amber text-obsidian'
                            : 'bg-background border border-border text-body dark:text-pearl hover:border-amber'
                        }`}
                      >
                        {option.icon} {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    What would you like to work on?
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    placeholder="Body transformation, building muscle, losing fat, relationships, finding purpose..."
                    rows={4}
                    className="w-full px-4 py-3 rounded bg-background border border-border focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors resize-none text-body dark:text-pearl placeholder:text-muted-foreground"
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-mono text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    Where did you hear about me?
                  </label>
                  <select
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-background border border-border focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors text-body dark:text-pearl"
                  >
                    <option value="">Select an option</option>
                    {referralSources.map((source) => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-display text-xl py-4 bg-amber text-obsidian rounded hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    'APPLY FOR TRAINING →'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
