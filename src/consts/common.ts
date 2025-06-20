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
  LINK: 'link',
  PASSWORD: 'password',
  MULTISELECT: 'multiselect',
  AREA: 'area',
  AUTOCOMPLETE: 'autocomplete',
  DATE_TIME: 'dateTime',
  BUTTON: 'button',
} as const

export const PcApiTags = {
  CHARACTERISTICS: 'Characteristics',
  ADDONS: 'Addons',
  TARIFF_PLANS: 'TariffPlans',
  TARIFF_PLAN_CHARACTERISTICS: 'TariffPlanCharacteristics',
  TARIFF_PLAN_DISCOUNTS: 'TariffPlanDiscounts',
}

export const TableRowPerPage = 10
