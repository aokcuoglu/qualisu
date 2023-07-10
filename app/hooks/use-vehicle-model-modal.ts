import { create } from 'zustand'

interface VehicleModelStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useVehicleModel = create<VehicleModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useVehicleModel
