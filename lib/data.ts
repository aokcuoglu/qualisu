import { ArrowDownToLine, ArrowRightToLine, ArrowUpToLine } from 'lucide-react'

export const status = [
  {
    id: 1,
    value: 'active',
    label: 'Active'
  },
  {
    id: 2,
    value: 'passive',
    label: 'Passive'
  }
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownToLine
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightToLine
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpToLine
  }
]
