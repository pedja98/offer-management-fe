import { Grid } from '@mui/material'
import { useGetOfferTariffPlansIdentifierCountsQuery } from '../../app/apis/om/offer-tariff-plans.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Spinner from '../Spinner'
import AccordionItem from '../AccordionItem'
import { AdditionalData, AccordionOptions, ItemName } from '../../types/common'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const omOfferId = useAppSelector((state) => state.offer).id as string
  const language = useAppSelector((state) => state.auth).language
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const {
    data: identifiersCounts,
    isLoading: isLoadingIdentifierCounts,
    isError,
  } = useGetOfferTariffPlansIdentifierCountsQuery(omOfferId)

  if (isLoadingIdentifierCounts) {
    return <Spinner />
  }

  if (isError || !identifiersCounts) {
    dispatch(
      setNotification({
        text: t('tariffPlan:errorRetrievingError'),
        type: NotificationType.Error,
      }),
    )
    return null
  }

  return (
    <Grid container direction='column' sx={{ width: '100%' }} alignItems='center'>
      {Object.keys(identifiersCounts).map((key) => {
        const element = identifiersCounts[key]
        const title = element.name[language.toLowerCase() as keyof ItemName] + ': ' + element.count
        const additionalData = {
          identifier: key,
        } as AdditionalData

        return (
          <Grid item key={key} sx={{ width: '95%', mb: 3 }}>
            <AccordionItem
              accordionKey={AccordionOptions.Benefits}
              accordionTitle={title}
              accordionExpanded={false}
              additionalData={additionalData}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Benefits
