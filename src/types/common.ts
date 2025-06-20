import { ChangeEvent } from 'react'
import { GridFieldTypes } from '../consts/common'
import { Language, UserType } from './auth'
import { SelectChangeEvent } from '@mui/material'

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

export type AutocompleteHashMap = {
  [key: string | number]: unknown
}

export type AutocompleteEntity = {
  [key: string]: unknown
}

type EnumValue<T extends Record<string, string | number>> = T[keyof T]

export interface GridFieldAttributes<TEnum extends Record<string, string | number> = Record<string, string>> {
  id?: string | number
  value?: string | number
  type: GridFieldType
  link?: string
  options?: (string | number | undefined)[]
  optionsValues?: (string | number | undefined)[]
  required?: boolean
  autocompleteMap?: AutocompleteHashMap
  dialogField?: boolean
  disabled?: boolean
  handleClick?: (id: number) => void
  multiselectValue?: string[]
  multiselectOptions?: Record<EnumValue<TEnum>, string>
  multiselectOptionValues?: TEnum
}

export interface GridFieldProps {
  gridFieldData: GridFieldAttributes
  label: GridLabel
  handleChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | string[]>) => void
}

export interface GridLabel {
  text: string
  key: string
}

export interface PageElement {
  [key: string]: GridFieldAttributes
}
