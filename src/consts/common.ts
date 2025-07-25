import { AccordionOptions, CommonState, CustomTableModule } from '../types/common'

export const PrimaryThemeColor = '#6e6e6e'

export const SecondaryThemeColor = '#454444'

export const TernaryColor = '#000'

export const WhiteTeamColor = '#FFF'

export const QuaternaryColor = '#d6cece'

export const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PhonePattern = /^\+?\d+$/

export const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const EmptyValue = '/'

export const GridFieldTypes = {
  STRING: 'string',
  NUMBER: 'number',
  SELECT: 'select',
  NON_EDITABLE: 'non_editable',
  CHECKBOX: 'checkbox',
  AREA: 'area',
} as const

export const AccordionItems = [
  AccordionOptions.Company,
  AccordionOptions.Offer,
  AccordionOptions.TariffAndBenefits,
  AccordionOptions.Approval,
]

export const TableRowPerPage = 10

export const OmApiTags = {
  ADDONS: 'Addons',
  TARIFF_PLANS: 'TariffPlans',
  COMPANY: 'Company',
  OFFER: 'Offer',
  TARIFF_PLAN_DISCOUNTS: 'TariffPlanDiscounts',
}

export const ChangeVisibleModules = [CustomTableModule.TariffPlan]

export const InitialState: CommonState = {
  numberOfTariffPlans: 0,
  refetchDiscount: false,
}
