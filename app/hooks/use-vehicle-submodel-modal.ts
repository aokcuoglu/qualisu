import { create } from 'zustand'

interface VehicleSubModelStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useVehicleSubModel = create<VehicleSubModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useVehicleSubModel
