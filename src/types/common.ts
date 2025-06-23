import { ChangeEvent, MouseEvent } from 'react'
import { GridFieldTypes } from '../consts/common'
import { Language, UserType } from './auth'
import { OmTariffPlanDto } from './tariffPlans'

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

export interface CustomTableProps {
  data: OmTariffPlanDto[]
  page: number
  onPageChange: (event: unknown, newPage: number) => void
  selectedIds: Set<string>
  columns: GridLabel[]
  onSelectAll: (checked: boolean) => void
  onSelectItem: (id: string, checked: boolean) => void
}

export interface CustomTableActionsProps {
  searchTerm: string
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClearSearch: () => void
  onAdd: () => void
  onDelete: () => void
  onChange: () => void
  selectedCount: number
  filterAnchorEl: null | HTMLElement
  onFilterClick: (e: MouseEvent<HTMLElement>) => void
  onFilterClose: () => void
  onFilterSelect: (filter: string) => void
}
