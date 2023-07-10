import { create } from 'zustand'

interface VehicleGroupStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useVehicleGroup = create<VehicleGroupStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useVehicleGroup
