import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Space_Mono, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-bebas',
  display: 'swap',
})

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-space-mono',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jake Tiesler Personal Training | Nashville Executive Fitness',
  description: 'Built for Busy. Designed for Results. Nashville\'s Executive Personal Trainer — 20 Years. One Standard. Training busy professionals 35+ in Capitol View, The Gulch.',
  keywords: ['personal trainer', 'Nashville', 'executive fitness', 'The Gulch', 'Capitol View', 'fitness coaching', 'weight loss', 'muscle building'],
  authors: [{ name: 'Jake Tiesler' }],
  openGraph: {
    title: 'Jake Tiesler Personal Training',
    description: 'Nashville\'s Executive Personal Trainer — 20 Years. One Standard.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${bebasNeue.variable} ${spaceMono.variable} ${cormorant.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
