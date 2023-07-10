import { create } from 'zustand'

interface useVehicleModelModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useVehicleModelModal = create<useVehicleModelModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  })
)
