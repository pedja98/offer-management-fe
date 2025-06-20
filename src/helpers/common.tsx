import Cookies from 'js-cookie'
import { AuthState, Language } from '../types/auth'
import { ReactNode } from 'react'
import { AccordionOptions } from '../types/common'
import CompanyAccordionItem from '../components/AccordionItems/CompanyAccordionItem'
import ApprovalAccordionItem from '../components/AccordionItems/ApprovalAccordionItem'
import OfferAccordionItem from '../components/AccordionItems/OfferAccordionItem'
import TariffAndBenefitsAccordionItem from '../components/AccordionItems/TariffAndBenefitsAccordionItem'

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

export const getAccordionContext = (currentOption: AccordionOptions): ReactNode | undefined => {
  const items: Partial<Record<AccordionOptions, ReactNode>> = {
    [AccordionOptions.Company]: <CompanyAccordionItem />,
    [AccordionOptions.Approval]: <ApprovalAccordionItem />,
    [AccordionOptions.Offer]: <OfferAccordionItem />,
    [AccordionOptions.TariffAndBenefits]: <TariffAndBenefitsAccordionItem />,
  }

  return items[currentOption]
}
