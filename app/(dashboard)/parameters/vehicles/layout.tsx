import * as React from 'react'
interface VehiclePageProps {
  children: React.ReactNode
}

export default function VehiclePageLayout({ children }: VehiclePageProps) {
  return <>{children}</>
}
