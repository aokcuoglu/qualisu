import Navbar from '@/components/navbar'

interface DashboardProps {
  children: React.ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <>
      <Navbar />
      <div className="rounded-[0.5rem] border bg-background shadow">
        {children}
      </div>
    </>
  )
}
