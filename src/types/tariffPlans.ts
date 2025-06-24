export interface UpdateTariffPlans {
  newTpIdentifier: string
  newTpName: Record<string, string>
  newTpPrice: number
  uuids: string[]
}

export interface OmTariffPlan {
  id: string
  plannedTpName: Record<string, string>
  plannedTpIdentifier: string
  plannedTpPrice: number | null
  actualTpName: Record<string, string>
  actualTpIdentifier: string
  actualTpPrice: number | null
  deactivate: boolean
}

export interface CreateTariffPlansBulkResponse {
  message: string
  tariffPlans: OmTariffPlan[]
}

export interface CreateTariffPlan {
  numberOfItems: number
  omOfferId: string
  tariffPlan: SaveTariffPlanItem
}

export interface SaveTariffPlanItem {
  identifier: string
  name: Record<string, string>
  price: number
}

export interface TariffPlansState {
  [index: string]: OmTariffPlan
}
