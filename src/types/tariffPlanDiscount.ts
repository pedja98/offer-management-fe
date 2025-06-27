export interface TariffPlanDiscount {
  id: string
  initialDiscount: number
  additionalDiscount: number
  tariffPlanIdentifier: string
  offerId: string
}

export interface UpdateAdditionalDiscountRequest {
  id: string
  additionalDiscount: number
}
