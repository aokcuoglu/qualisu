'use client'

import VGModal from '@/app/components/modals/vehicle-group-model'
import VehicleModelModal from '@/app/components/modals/vehicle-model-modal'
import VehicleSubmodelModal from '@/app/components/modals/vehicle-submodel-modal'

import { SafeModels, SafeTypes } from '@/app/types'

interface ModalsProps {
  types: SafeTypes[]
  models: SafeModels[]
}

const ModalsProvider: React.FC<ModalsProps> = ({ types, models }) => {
  return (
    <>
      <VehicleModelModal types={types} />
      <VehicleSubmodelModal models={models} />
      <VGModal />
    </>
  )
}

export default ModalsProvider
