import * as React from 'react'
interface SubModelPageProps {
  children: React.ReactNode
}

export default function SubModelPageLayout({ children }: SubModelPageProps) {
  return <>{children}</>
}
