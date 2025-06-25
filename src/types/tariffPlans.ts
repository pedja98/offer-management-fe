import { ItemName } from './common'

export interface UpdateTariffPlans {
  newTpIdentifier: string
  newTpName: ItemName
  newTpPrice: number
  uuids: string[]
}

export interface OmTariffPlan {
  id: string
  plannedTpName: ItemName
  plannedTpIdentifier: string
  plannedTpPrice: number | null
  actualTpName: ItemName
  actualTpIdentifier: string
  actualTpPrice: number | null
  deactivate: boolean
}

export interface CreateTariffPlan {
  numberOfItems: number
  omOfferId: string
  tariffPlan: SaveTariffPlanItem
}

export interface SaveTariffPlanItem {
  identifier: string
  name: ItemName
  price: number
}

export interface TariffPlansState {
  [index: string]: OmTariffPlan
}

export interface PcTariffPlan {
  id: string
  name: ItemName
  identifier: string
  description?: string
  price: number
  status: ItemStatus
  createdByUser: string
  modifiedByUser?: string
  dateCreated: string
  dateModified: string
}

export enum ItemStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
