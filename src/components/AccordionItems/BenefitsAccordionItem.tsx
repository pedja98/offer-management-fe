import AddonTable from '../TariffPlanAndBenefits/AddonTable'

const BenefitsAccordionItem = ({ identifier }: { identifier: string }) => {
  return <AddonTable tariffPlanIdentifier={identifier} />
}

export default BenefitsAccordionItem
