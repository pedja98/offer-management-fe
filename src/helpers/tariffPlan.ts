import { OmTariffPlan, TariffPlansState } from '../types/tariffPlans'

export const getOmTariffPlanMap = (tariffPlans: OmTariffPlan[]): TariffPlansState => {
  return tariffPlans.reduce<TariffPlansState>((acc, plan) => {
    if (plan.id) {
      acc[plan.id] = plan
    }
    return acc
  }, {})
}
