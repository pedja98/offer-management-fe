import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { Company } from '../types/company'

export const getCompanyGridDataLabels = (t: TFunction): GridLabel[] => [
  { text: t('company:name'), key: 'name' },
  { text: t('company:status'), key: 'status' },
  { text: t('company:tin'), key: 'tin' },
  { text: t('company:assignedTo'), key: 'assignedToUsername' },
  { text: t('company:temporaryAssignedTo'), key: 'temporaryAssignedToUsername' },
]

export const getCompanyGridData = (t: TFunction, company: Company): PageElement => ({
  name: {
    value: company.name,
    type: GridFieldTypes.NON_EDITABLE,
  },
  status: { type: GridFieldTypes.NON_EDITABLE, value: t(`company:statuses.${company.status?.toLocaleLowerCase()}`) },
  tin: { type: GridFieldTypes.NON_EDITABLE, value: company.tin },
  assignedToUsername: {
    value: company.assignedToUsername,
    type: GridFieldTypes.NON_EDITABLE,
  },
  temporaryAssignedToUsername: {
    value: company.temporaryAssignedToUsername,
    type: GridFieldTypes.NON_EDITABLE,
  },
})
