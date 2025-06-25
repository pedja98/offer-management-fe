import { Grid } from '@mui/material'
import TariffPlanTable from '../TariffPlanAndBenefits/TariffPlanTable'
import Benefits from '../TariffPlanAndBenefits/Benefits'

const TariffAndBenefitsAccordionItem = () => {
  return (
    <Grid>
      <TariffPlanTable />
      <Benefits />
    </Grid>
  )
}

export default TariffAndBenefitsAccordionItem
