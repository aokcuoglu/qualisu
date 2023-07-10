import { VehicleModel, VehicleSubModel, VehicleType } from '@prisma/client'

export type SafeTypes = Omit<VehicleType, 'createdAt'> & {
  createdAt: string
}

export type SafeModels = Omit<VehicleModel, 'createdAt'> & {
  createdAt: string
  vehicleType: any
}

export type SafeSubModels = Omit<VehicleSubModel, 'createdAt'> & {
  createdAt: string
  vehicleModel: any
}
