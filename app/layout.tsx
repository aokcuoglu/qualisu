import * as React from 'react'
import './globals.css'
import { Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'

import { ToastProvider } from '@/app/providers/toast-provider'
import { ThemeProvider } from '@/app/providers/theme.provider'

import { Navbar } from '@/components/navbar'
import { Inter } from 'next/font/google'
import { TailwindIndicator } from '@/components/tailwind-indicator'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qualisu',
  description: 'All things of quality',
  authors: [{ name: 'Alpkaan' }]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={font.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider />
            <div className="relative flex flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
