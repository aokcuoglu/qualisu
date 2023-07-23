import { ArrowDownToLine, ArrowRightToLine, ArrowUpToLine } from 'lucide-react'

export const status = [
  {
    value: 'active',
    label: 'Active'
  },
  {
    value: 'passive',
    label: 'Passive'
  }
]

export const cStatus = [
  {
    value: 'completed',
    label: 'Completed'
  },
  {
    value: 'continue',
    label: 'Continue'
  }
]

export const cPoint = [
  {
    value: 'karantina',
    label: 'Karantina'
  },
  {
    value: 'bitmis-arac',
    label: 'Bitmis Arac'
  },
  {
    value: 'hava-kacak',
    label: 'Hava Kacak'
  },
  {
    value: 'cop-parca',
    label: 'COP Parca'
  },
  {
    value: 's2',
    label: 'S2'
  },
  {
    value: 's1',
    label: 'S1'
  },
  {
    value: 'ara-kontrol',
    label: 'Ara Kontrol'
  },
  {
    value: 'trim-y',
    label: 'Trim Y'
  },
  {
    value: 'ana-montaj',
    label: 'Ana Montaj'
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
