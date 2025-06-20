import { Language, UserType } from './auth'

export interface OfferManagementProps {
  crmOfferId: number
  language: Language
  username?: string
  type?: UserType
}
