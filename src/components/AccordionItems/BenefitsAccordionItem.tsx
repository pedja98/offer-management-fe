import { Grid } from '@mui/material'
import AddonTable from '../TariffPlanAndBenefits/AddonTable'
import Discounts from '../TariffPlanAndBenefits/Discounts'

const BenefitsAccordionItem = ({ identifier }: { identifier: string }) => {
  return (
    <Grid>
      <AddonTable tariffPlanIdentifier={identifier} />
      <Discounts tariffPlanIdentifier={identifier} />
    </Grid>
  )
}

export default BenefitsAccordionItem
