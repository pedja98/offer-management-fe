import { TFunction } from 'i18next'
import { GridLabel } from '../types/common'

export const getTariffPlansTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('tariffPlan:plannedTpName'), key: 'plannedTpName' },
  { text: t('tariffPlan:plannedTpPrice'), key: 'plannedTpPrice' },
  { text: t('tariffPlan:actualTpName'), key: 'actualTpName' },
  { text: t('tariffPlan:actualTpPrice'), key: 'actualTpPrice' },
]
