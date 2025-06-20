import { TFunction } from 'i18next'
import { GridLabel } from '../types/common'

export const getCompanyGridDataLabels = (t: TFunction): GridLabel[] => [
  { text: t('company:name'), key: 'name' },
  { text: t('company:status'), key: 'status' },
  { text: t('company:tin'), key: 'tin' },
  { text: t('company:assignedTo'), key: 'assignedToUsername' },
  { text: t('company:temporaryAssignedTo'), key: 'temporaryAssignedToUsername' },
]
