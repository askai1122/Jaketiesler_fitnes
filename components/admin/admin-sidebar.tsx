'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './auth-provider'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  BarChart3,
  Star,
  Mail,
  FileText,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Sessions & Schedule', href: '/admin/sessions', icon: Calendar },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Services & Programs', href: '/admin/services', icon: Briefcase },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Applications', href: '/admin/applications', icon: Mail },
  { name: 'Content & Blog', href: '/admin/content', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useState(() => {
    setMounted(true)
  })

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-charcoal border-b border-amber/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-xl text-pearl">JAKE TIESLER</span>
            <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-amber">
              Admin
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-pearl"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-obsidian/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-amber/20 flex flex-col lg:translate-x-0 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-amber/20">
          <span className="font-display text-2xl text-pearl">JAKE TIESLER</span>
          <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-amber">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-amber/20 text-pearl'
                    : 'text-sidebar-foreground hover:bg-amber/10 hover:text-pearl'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-amber' : ''}`} />
                <span className="font-sans text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-amber/20 space-y-2">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-amber/10 hover:text-pearl transition-all"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span className="font-sans text-sm">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          )}

          {/* Back to Website */}
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-amber/10 hover:text-pearl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans text-sm">Back to Website</span>
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-sans text-sm">Sign Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
