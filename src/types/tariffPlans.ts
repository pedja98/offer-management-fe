export interface UpdateTariffPlansDto {
  newTpIdentifier: string
  newTpName: Record<string, string>
  newTpPrice: number
  uuids: string[]
}

export interface OmTariffPlanDto {
  id: string
  plannedTpName: Record<string, string>
  plannedTpIdentifier: string
  plannedTpPrice: number
  actualTpName: Record<string, string>
  actualTpIdentifier: string
  actualTpPrice: number
}

export interface CreateTariffPlansBulkResponseDto {
  message: string
  tariffPlans: OmTariffPlanDto[]
}

export interface CreateTariffPlanDto {
  numberOfItems: number
  omOfferId: string
  tariffPlan: SaveTariffPlanItemDto
}

export interface SaveTariffPlanItemDto {
  identifier: string
  name: Record<string, string>
  price: number
}
