import { Language, UserType } from './auth'

export interface OfferManagementProps {
  crmOfferId: number
  language: Language
  username?: string
  type?: UserType
}

export enum AccordionOptions {
  Company = 'company',
  Offer = 'offer',
  TariffAndBenefits = 'tariffAndBenefits',
  Approval = 'approval',
}
