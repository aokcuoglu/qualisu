'use client'

import * as React from 'react'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FaJenkins } from 'react-icons/fa'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/dashboard`,
      label: 'Dashboard',
      active: pathname === `/dashboard}`
    },
    {
      href: `/parameters/groups`,
      label: 'Parameters',
      active: pathname === `/parameters/groups}`
    },
    {
      href: `/reports`,
      label: 'Reports',
      active: pathname === `/parameters/reports}`
    },
    {
      href: `/controls`,
      label: 'Controls',
      active: pathname === `/parameters/controls}`
    }
  ]

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <FaJenkins size={24} />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav
        className={cn(
          'flex items-center space-x-6 text-sm font-medium',
          className
        )}
        {...props}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              route.active ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
