'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Eye, Edit, X, Calendar } from 'lucide-react'
import { mockSessions } from '@/lib/mock-data'

const statusFilters = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled']

export default function SessionsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      confirmed: 'bg-amber/20 text-amber',
      pending: 'bg-yellow-500/20 text-yellow-500',
      completed: 'bg-green-500/20 text-green-500',
      cancelled: 'bg-red-500/20 text-red-400',
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
          Sessions & Schedule
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber text-obsidian rounded-lg font-medium hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] transition-all">
          <Plus className="w-4 h-4" />
          Schedule Session
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface dark:bg-charcoal border border-border focus:border-amber outline-none text-body dark:text-pearl"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <input
            type="date"
            className="px-4 py-2 rounded-lg bg-surface dark:bg-charcoal border border-border focus:border-amber outline-none text-body dark:text-pearl"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                statusFilter === status
                  ? 'bg-amber text-obsidian'
                  : 'bg-surface dark:bg-charcoal border border-border text-body dark:text-pearl hover:border-amber'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
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
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Date</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Time</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Client</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Type</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Duration</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="text-left p-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session.id} className="border-b border-border last:border-0 hover:bg-background dark:hover:bg-obsidian transition-colors">
                  <td className="p-4 font-mono text-sm text-body dark:text-pearl">{session.date}</td>
                  <td className="p-4 font-mono text-sm text-amber">{session.time}</td>
                  <td className="p-4 text-body dark:text-pearl">{session.client}</td>
                  <td className="p-4 text-muted-foreground text-sm">{session.type}</td>
                  <td className="p-4 text-muted-foreground text-sm">{session.duration}</td>
                  <td className="p-4">{getStatusBadge(session.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded hover:bg-amber/10 transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-amber/10 transition-colors">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-red-500/10 transition-colors">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
