import { ChangeEvent, MouseEvent } from 'react'
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

export interface GridLabel {
  text: string
  key: string
}

export interface TableRowData {
  [key: string]: {
    value: string | number | null | undefined | null | boolean
    type: GridFieldType
    disabled?: boolean
    handleCheckBoxCheck?: (id: string, checked: boolean) => void
  }
}

export interface PageElement {
  [key: string]: {
    value: string | number | null | undefined | null
    type: GridFieldType
  }
}

export interface CustomTableProps {
  data: TableRowData[]
  page: number
  onPageChange: (event: unknown, newPage: number) => void
  selectedIds: Set<string>
  columns: GridLabel[]
  onSelectAll: (checked: boolean) => void
  onSelectItem: (id: string, checked: boolean) => void
  rowIds: (string | number)[]
}

export interface CustomTableActionsProps {
  searchTerm: string
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClearSearch: () => void
  onDelete: () => void
  selectedIds: Set<string>
  selectedCount: number
  filterAnchorEl: null | HTMLElement
  onFilterClick: (e: MouseEvent<HTMLElement>) => void
  onFilterClose: () => void
  onFilterSelect: (filter: string) => void
  module: CustomTableModule
}

export enum CustomTableModule {
  TariffPlan = 'tariffPlan',
  Addon = 'addon',
}

export interface ItemName {
  sr: string
  en: string
}

export interface CustomAddActionProps {
  module: CustomTableModule
}

export interface CustomChangeActionProps {
  module: CustomTableModule
  selectedIds: Set<string>
}
