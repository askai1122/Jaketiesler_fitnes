'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Users, Mail, Star, Eye, Clock } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { mockSessions, mockApplications, mockAnalyticsData } from '@/lib/mock-data'

const todaySessions = mockSessions.filter(s => s.date === '2025-05-21')
const recentApplications = mockApplications.slice(0, 3)

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 1500
      const steps = 40
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl text-amber">
      {count}{suffix}
    </span>
  )
}

const stats = [
  { label: 'Sessions Today', value: 6, icon: Calendar },
  { label: 'Active Clients', value: 31, icon: Users },
  { label: 'New Applications', value: 8, icon: Mail, suffix: '' },
  { label: 'Yelp Rating', value: 5.0, icon: Star, isDecimal: true },
]

export default function DashboardContent() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      confirmed: 'bg-amber/20 text-amber',
      pending: 'bg-yellow-500/20 text-yellow-500',
      completed: 'bg-green-500/20 text-green-500',
      cancelled: 'bg-red-500/20 text-red-400',
    }
    const labels: Record<string, string> = {
      confirmed: 'Confirmed',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-heading dark:text-pearl">
          Good morning, Jake.
        </h1>
        <p className="text-body dark:text-pearl/70 mt-1">
          Here&apos;s what&apos;s happening today at Capitol View.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber/10">
                <stat.icon className="w-5 h-5 text-amber" />
              </div>
            </div>
            <AnimatedCounter 
              value={stat.value} 
              suffix={stat.isDecimal ? '' : stat.suffix || ''} 
            />
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[60%_40%] gap-6">
        {/* Today's Sessions */}
        <motion.div
          className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-heading dark:text-pearl">
              Today&apos;s Sessions
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {todaySessions.length} scheduled
            </span>
          </div>

          <div className="space-y-3">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background dark:bg-obsidian border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-amber">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-sm">{session.time}</span>
                  </div>
                  <div>
                    <p className="font-medium text-heading dark:text-pearl">{session.client}</p>
                    <p className="text-sm text-muted-foreground">{session.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(session.status)}
                  <button className="p-2 rounded hover:bg-amber/10 transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* New Applications */}
          <motion.div
            className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-display text-xl text-heading dark:text-pearl mb-4">
              New Applications
            </h2>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background dark:bg-obsidian border border-border"
                >
                  <div className="flex items-center gap-3">
                    {!app.read && (
                      <div className="w-2 h-2 rounded-full bg-amber" />
                    )}
                    <div>
                      <p className="font-medium text-heading dark:text-pearl text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {app.goal.substring(0, 40)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{app.time}</span>
                    <button className="px-2 py-1 rounded text-xs bg-amber/10 text-amber hover:bg-amber/20 transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Goal Breakdown */}
          <motion.div
            className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-display text-xl text-heading dark:text-pearl mb-4">
              Client Goals
            </h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAnalyticsData.goalBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {mockAnalyticsData.goalBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--charcoal)', 
                      border: '1px solid var(--amber)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'var(--pearl)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {mockAnalyticsData.goalBreakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.fill }} 
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name} {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
