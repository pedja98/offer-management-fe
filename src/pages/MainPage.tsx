import { AccordionItems } from '../consts/common'
import { Grid, Typography } from '@mui/material'
import Spinner from '../components/Spinner'
import { useTranslation } from 'react-i18next'
import { useGetOmOfferByIdQuery } from '../app/apis/om/offer.api'
import AccordionItem from '../components/AccordionItems/AccordionItem'

const MainPage: React.FC<{ crmOfferId: number }> = ({ crmOfferId }) => {
  const { isLoading, isError } = useGetOmOfferByIdQuery(crmOfferId)
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
        <Grid item key={accordionKey} sx={{ width: '95%', mt: 2, mb: 3 }}>
          <AccordionItem accordionKey={accordionKey} accordionTitle={t(`accordionOptions.${accordionKey}`)} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MainPage
