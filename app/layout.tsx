import * as React from 'react'
import './globals.css'
import { Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'

import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import { ToastProvider } from '@/app/providers/toast-provider'
import { ThemeProvider } from '@/app/providers/theme.provider'

import { Navbar } from '@/components/navbar'

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
        <body
          className={cn(
            'bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider />
            <div className="relative flex flex-col">
              <Navbar />
              <div className="flex-1 p-4">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
