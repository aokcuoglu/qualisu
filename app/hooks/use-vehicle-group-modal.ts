import { create } from 'zustand'

interface useVehicleGroupModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useVehicleGroupModal = create<useVehicleGroupModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  })
)
