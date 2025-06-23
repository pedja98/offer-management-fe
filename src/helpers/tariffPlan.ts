import { EmptyValue } from '../consts/common'
import { Language } from '../types/auth'
import { OmTariffPlanDto } from '../types/tariffPlans'

export const getTariffPlanTableFieldValue = (tariffPlan: OmTariffPlanDto, language: Language, key: string): string => {
  switch (key) {
    case 'plannedTpName':
      return tariffPlan.plannedTpName[language] || tariffPlan.plannedTpName['en'] || EmptyValue
    case 'plannedTpPrice':
      return tariffPlan.plannedTpPrice?.toLocaleString() || EmptyValue
    case 'actualTpName':
      return tariffPlan.actualTpName[language] || tariffPlan.actualTpName['en'] || EmptyValue
    case 'actualTpPrice':
      return tariffPlan.actualTpPrice?.toLocaleString() || EmptyValue
    default:
      return EmptyValue
  }
}
