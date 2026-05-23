'use client'

import { motion } from 'framer-motion'
import { BarChart3, DollarSign, TrendingUp, Users } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { mockAnalyticsData } from '@/lib/mock-data'

const stats = [
  { label: 'Monthly Sessions', value: '118', change: '+6.8%', icon: BarChart3 },
  { label: 'New Clients', value: '3', change: '+0.5%', icon: Users },
  { label: 'Revenue', value: '$17.5k', change: '+9.4%', icon: DollarSign },
  { label: 'Retention', value: '92%', change: '+3.1%', icon: TrendingUp },
]

export default function AnalyticsContent() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-heading dark:text-pearl">
          Analytics
        </h1>
        <p className="text-body dark:text-pearl/70 mt-1">
          Track client growth, sessions, revenue, and goal trends.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-amber/10">
                <stat.icon className="w-5 h-5 text-amber" />
              </div>
              <span className="font-mono text-xs text-green-500">{stat.change}</span>
            </div>
            <p className="font-display text-4xl text-amber">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartPanel title="Sessions">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalyticsData.monthlySessions}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="sessions" fill="var(--amber)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Revenue">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockAnalyticsData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="var(--amber)" fill="var(--amber)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="New Clients">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalyticsData.newClients}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="clients" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Goal Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockAnalyticsData.goalBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {mockAnalyticsData.goalBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </div>
  )
}

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="p-6 rounded-lg bg-surface dark:bg-charcoal border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="font-display text-xl text-heading dark:text-pearl mb-4">{title}</h2>
      <div className="h-[300px]">{children}</div>
    </motion.div>
  )
}
