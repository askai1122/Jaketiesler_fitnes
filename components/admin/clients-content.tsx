'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, X, User, Phone, Mail, Target, Calendar, Scale, Percent } from 'lucide-react'
import { mockClients } from '@/lib/mock-data'

type Client = typeof mockClients[0]

export default function ClientsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-500/20 text-green-500',
      paused: 'bg-yellow-500/20 text-yellow-500',
      inactive: 'bg-red-500/20 text-red-400',
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${styles[status]}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-3xl text-heading dark:text-pearl">
          Clients
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber text-obsidian rounded-lg font-medium hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] transition-all">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface dark:bg-charcoal border border-border focus:border-amber outline-none text-body dark:text-pearl"
        />
      </div>

      {/* Table */}
      <motion.div
        className="rounded-lg bg-surface dark:bg-charcoal border border-border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">#</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Name</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Phone</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Email</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Goal</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Program</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Start Date</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-border last:border-0 hover:bg-background dark:hover:bg-obsidian transition-colors cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="p-4 text-muted-foreground text-sm">{client.id}</td>
                  <td className="p-4 text-body dark:text-pearl font-medium">{client.name}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground">{client.phone}</td>
                  <td className="p-4 text-sm text-muted-foreground">{client.email}</td>
                  <td className="p-4 text-sm text-body dark:text-pearl">{client.goal}</td>
                  <td className="p-4 text-sm text-muted-foreground">{client.program}</td>
                  <td className="p-4 font-mono text-sm text-muted-foreground">{client.startDate}</td>
                  <td className="p-4">{getStatusBadge(client.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Client Detail Slide-over */}
      <AnimatePresence>
        {selectedClient && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-obsidian/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
            />
            
            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-surface dark:bg-charcoal border-l border-border z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl text-heading dark:text-pearl">
                    Client Profile
                  </h2>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="p-2 rounded-lg hover:bg-background dark:hover:bg-obsidian transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-background dark:bg-obsidian">
                    <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-amber" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-heading dark:text-pearl">
                        {selectedClient.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Age: {selectedClient.age}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Contact Information
                    </h4>
                    <div className="flex items-center gap-3 text-body dark:text-pearl">
                      <Phone className="w-4 h-4 text-amber" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-body dark:text-pearl">
                      <Mail className="w-4 h-4 text-amber" />
                      <span>{selectedClient.email}</span>
                    </div>
                  </div>

                  {/* Program */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Current Program
                    </h4>
                    <div className="flex items-center gap-3 text-body dark:text-pearl">
                      <Target className="w-4 h-4 text-amber" />
                      <span>Goal: {selectedClient.goal}</span>
                    </div>
                    <div className="flex items-center gap-3 text-body dark:text-pearl">
                      <Calendar className="w-4 h-4 text-amber" />
                      <span>Started: {selectedClient.startDate}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-amber/10 border border-amber/20">
                      <span className="text-amber font-medium">{selectedClient.program}</span>
                    </div>
                  </div>

                  {/* Body Metrics */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Body Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-background dark:bg-obsidian">
                        <div className="flex items-center gap-2 mb-2">
                          <Scale className="w-4 h-4 text-amber" />
                          <span className="text-xs text-muted-foreground">Weight</span>
                        </div>
                        <span className="font-display text-2xl text-heading dark:text-pearl">
                          {selectedClient.weight} lbs
                        </span>
                      </div>
                      <div className="p-4 rounded-lg bg-background dark:bg-obsidian">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="w-4 h-4 text-amber" />
                          <span className="text-xs text-muted-foreground">Body Fat</span>
                        </div>
                        <span className="font-display text-2xl text-heading dark:text-pearl">
                          {selectedClient.bodyFat}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Photos Placeholder */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Progress Photos
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-background dark:bg-obsidian border-2 border-dashed border-border flex items-center justify-center"
                        >
                          <Plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 px-4 py-3 bg-amber text-obsidian rounded-lg font-medium hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] transition-all">
                      Schedule Session
                    </button>
                    <button className="px-4 py-3 border border-border rounded-lg text-body dark:text-pearl hover:border-amber transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
