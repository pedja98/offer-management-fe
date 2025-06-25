import Cookies from 'js-cookie'
import { AuthState, Language } from '../types/auth'
import { ReactNode } from 'react'
import { AdditionalData, AccordionOptions, CustomTableModule } from '../types/common'
import CompanyAccordionItem from '../components/AccordionItems/CompanyAccordionItem'
import ApprovalAccordionItem from '../components/AccordionItems/ApprovalAccordionItem'
import OfferAccordionItem from '../components/AccordionItems/OfferAccordionItem'
import TariffAndBenefitsAccordionItem from '../components/AccordionItems/TariffAndBenefitsAccordionItem'
import AddonAddActionItem from '../components/AddActionItems/AddonAddActionItem'
import TariffPlanAddActionItem from '../components/AddActionItems/TariffPlanAddActionItem'
import TariffPlanChangeAction from '../components/ChangeActionItems/TariffPlanChangeAction'
import BenefitsAccordionItem from '../components/AccordionItems/BenefitsAccordionItem'

export const getCurrentUser = (): AuthState | undefined => {
  const cookie = Cookies.get('currentUser')
  return cookie ? (JSON.parse(cookie) as AuthState) : undefined
}

export const getCurrentUserLanguage = (): string => {
  const currentUser = JSON.parse(String(Cookies.get('currentUser'))) as AuthState
  return currentUser.language.toLocaleLowerCase() || Language.SR.toLocaleLowerCase()
}

export const dateFormatter = (dateString?: string): string => {
  const date = new Date(dateString || '')
  return date.toLocaleString('en-GB', { hour12: false })
}

export const getAccordionContext = (
  currentOption: AccordionOptions,
  accordionAdditionalData?: AdditionalData,
): ReactNode | undefined => {
  const items: Partial<Record<AccordionOptions, ReactNode>> = {
    [AccordionOptions.Company]: <CompanyAccordionItem />,
    [AccordionOptions.Approval]: <ApprovalAccordionItem />,
    [AccordionOptions.Offer]: <OfferAccordionItem />,
    [AccordionOptions.TariffAndBenefits]: <TariffAndBenefitsAccordionItem />,
    [AccordionOptions.Benefits]: <BenefitsAccordionItem identifier={accordionAdditionalData?.identifier as string} />,
  }

  return items[currentOption]
}

export const getAddActionContext = (
  module: CustomTableModule,
  additionalData?: AdditionalData,
): ReactNode | undefined => {
  const items: Partial<Record<CustomTableModule, ReactNode>> = {
    [CustomTableModule.Addon]: <AddonAddActionItem tariffPlanIdentifier={additionalData?.identifier as string} />,
    [CustomTableModule.TariffPlan]: <TariffPlanAddActionItem />,
  }
  return items[module]
}

export const getChangeActionContext = (module: CustomTableModule, selectedIds: Set<string>): ReactNode | undefined => {
  const items: Partial<Record<CustomTableModule, ReactNode>> = {
    [CustomTableModule.TariffPlan]: <TariffPlanChangeAction selectedIds={selectedIds} />,
  }

  return items[module]
}
