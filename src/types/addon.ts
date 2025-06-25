import { ItemName } from './common'

export interface CreateAddon {
  name: ItemName
  identifier: string
  price: number
  tariffPlanIdentifier: string
  omOfferId: string
}

export interface Addon {
  id: string
  name: ItemName
  identifier: string
  price: number
  tariffPlanIdentifier: string
  omOfferId: string
}
