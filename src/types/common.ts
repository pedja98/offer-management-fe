import { GridFieldTypes } from '../consts/common'
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

export interface ApiException {
  status: number
  message: string
  error: string
}

export type GridFieldType = (typeof GridFieldTypes)[keyof typeof GridFieldTypes]

export type AutocompleteEntity = {
  [key: string]: unknown
}

export interface GridLabel {
  text: string
  key: string
}

export interface PageElement {
  [key: string]: {
    value: string | number | null | undefined
    type: GridFieldType
  }
}
