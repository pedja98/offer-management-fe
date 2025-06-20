import { AccordionItems } from '../consts/common'
import AccordionItem from '../components/AccordionItem'
import { Grid, Typography } from '@mui/material'
import { useGetGwOfferByIdQuery } from '../app/apis/gw/offer.api'
import Spinner from '../components/Spinner'
import { useTranslation } from 'react-i18next'

const MainPage: React.FC<{ crmOfferId: number }> = ({ crmOfferId }) => {
  const { isLoading, isError } = useGetGwOfferByIdQuery(crmOfferId)
  const { t } = useTranslation()

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return (
      <Grid>
        <Typography variant='h3'>{t('errorWhileGettingOfferData')}</Typography>
      </Grid>
    )
  }

  return (
    <Grid container direction='column' spacing={2} sx={{ width: '100%' }} alignItems='center'>
      {AccordionItems.map((accordionKey) => (
        <Grid item key={accordionKey} sx={{ width: '95%', mt: 2 }}>
          <AccordionItem accordionKey={accordionKey} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MainPage
