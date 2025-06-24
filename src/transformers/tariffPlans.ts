import { TFunction } from 'i18next'
import { GridLabel, TableRowData } from '../types/common'
import { OmTariffPlan } from '../types/tariffPlans'
import { Language } from '../types/auth'
import { EmptyValue, GridFieldTypes } from '../consts/common'

export const getTariffPlansTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('tariffPlan:plannedTpName'), key: 'plannedTpName' },
  { text: t('tariffPlan:plannedTpPrice'), key: 'plannedTpPrice' },
  { text: t('tariffPlan:actualTpName'), key: 'actualTpName' },
  { text: t('tariffPlan:actualTpPrice'), key: 'actualTpPrice' },
  { text: t('tariffPlan:deactivate'), key: 'deactivate' },
]

export const transformTariffPlansIntoTableData = (
  tariffPlan: OmTariffPlan,
  language: Language,
  disabledDeactivation: boolean,
): TableRowData => ({
  plannedTpName: {
    value: tariffPlan.plannedTpName[language.toLowerCase()] || EmptyValue,
    type: GridFieldTypes.NON_EDITABLE,
  },
  plannedTpPrice: {
    type: GridFieldTypes.NON_EDITABLE,
    value:
      tariffPlan.plannedTpPrice?.toLocaleString(language === Language.EN ? 'en-US' : 'de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || EmptyValue,
  },
  actualTpName: {
    type: GridFieldTypes.NON_EDITABLE,
    value: tariffPlan.actualTpName[language.toLowerCase()] || EmptyValue,
  },
  actualTpPrice: {
    type: GridFieldTypes.NON_EDITABLE,
    value:
      tariffPlan.actualTpPrice?.toLocaleString(language === Language.EN ? 'en-US' : 'de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || EmptyValue,
  },
  deactivate: {
    value: tariffPlan.deactivate,
    type: GridFieldTypes.CHECKBOX,
    disabled: disabledDeactivation,
  },
})
