import Navbar from '@/components/navbar'

interface DashboardProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
