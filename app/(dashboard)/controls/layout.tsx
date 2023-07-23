import * as React from 'react'

import { Separator } from '@/components/ui/separator'

import Heading from './components/heading'

interface ControlsLayout {
  children: React.ReactNode
}

export default function GroupPageLayout({ children }: ControlsLayout) {
  return (
    <div className="hidden h-full flex-1 flex-colspace-y-8 p-8 md:block">
      <Heading />
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:w-full">{children}</div>
      </div>
    </div>
  )
}
