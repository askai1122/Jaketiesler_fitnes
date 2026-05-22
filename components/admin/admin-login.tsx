'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from './auth-provider'
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const success = login(email, password)
    if (success) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid email or password')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card */}
        <div className="bg-charcoal rounded-lg p-8 border border-amber/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl text-pearl mb-1">JAKE TIESLER</h1>
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-amber">
              Admin Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wide text-pearl/50 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded bg-obsidian border border-amber/20 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors text-pearl"
                placeholder="admin@jaketiesler.com"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wide text-pearl/50 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded bg-obsidian border border-amber/20 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-colors text-pearl pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pearl/50 hover:text-pearl transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                className="text-red-500 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-display text-xl py-4 bg-amber text-obsidian rounded hover:shadow-[0_0_24px_rgba(196,147,63,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SIGNING IN...
                </>
              ) : (
                'SIGN IN →'
              )}
            </button>
          </form>

          {/* Mock Credentials */}
          <div className="mt-6 p-4 rounded bg-obsidian/50 border border-amber/10">
            <p className="font-mono text-xs text-pearl/50 mb-2">Demo Credentials:</p>
            <p className="font-mono text-xs text-amber">admin@jaketiesler.com</p>
            <p className="font-mono text-xs text-amber">jake2025</p>
          </div>

          {/* Back to Website */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mt-6 text-pearl/50 hover:text-pearl transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-mono text-sm">Back to Website</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
