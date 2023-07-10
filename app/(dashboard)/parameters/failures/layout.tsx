import * as React from 'react'
interface ModelPageProps {
  children: React.ReactNode
}

export default function ModelPageLayout({ children }: ModelPageProps) {
  return <>{children}</>
}
