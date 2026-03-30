import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { UserProvider } from '@/lib/user-context'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppLayout } from '@/components/layout/app-layout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ojas Circle — Break the Silence, Heal Anonymously',
  description: 'India\'s anonymous platform for sexual wellness, mental health support, and Ayurvedic guidance. 100% anonymous. Zero judgment. Complete healing.',
  keywords: ['mental health', 'anonymous', 'wellness', 'ayurveda', 'support', 'community'],
  authors: [{ name: 'Team Dark Horses' }],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4A024' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0E27' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <UserProvider>
            <AppLayout>
              {children}
            </AppLayout>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
