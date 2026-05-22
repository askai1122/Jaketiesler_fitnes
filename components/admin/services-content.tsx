'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit, ToggleLeft, ToggleRight } from 'lucide-react'
import { mockServices, mockPackages } from '@/lib/mock-data'

export default function ServicesContent() {
  const [services, setServices] = useState(mockServices)

  const toggleService = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="font-display text-3xl text-heading dark:text-pearl">
        Services & Programs
      </h1>

      {/* Service Cards */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Services
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-xl text-heading dark:text-pearl">
                  {service.name}
                </h3>
                <button
                  onClick={() => toggleService(service.id)}
                  className="text-amber"
                >
                  {service.active ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-muted-foreground" />
                  )}
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price Range:</span>
                  <span className="text-amber font-medium">{service.priceRange}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-body dark:text-pearl">{service.duration}</span>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-body dark:text-pearl hover:border-amber transition-colors">
                <Edit className="w-4 h-4" />
                Edit Service
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packages Table */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Packages
        </h2>
        <motion.div
          className="rounded-lg bg-surface dark:bg-charcoal border border-border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Package Name</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Sessions</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Price</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPackages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-border last:border-0 hover:bg-background dark:hover:bg-obsidian transition-colors">
                  <td className="p-4 text-body dark:text-pearl font-medium">{pkg.name}</td>
                  <td className="p-4 text-muted-foreground">{pkg.sessions}</td>
                  <td className="p-4 text-amber font-medium">{pkg.price}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500 capitalize">
                      {pkg.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="p-1.5 rounded hover:bg-amber/10 transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}
