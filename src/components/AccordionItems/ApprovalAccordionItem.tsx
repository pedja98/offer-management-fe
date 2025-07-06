import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { EmptyValue } from '../../consts/common'
import { ChangeEvent, FocusEvent } from 'react'
import { ApiException } from '../../types/common'
import { Offer, OfferStatus } from '../../types/offer'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useUpdateOmOfferAttributeMutation } from '../../app/apis/om/offer.api'
import { setOfferData } from '../../features/offer.slice'
import { FormLabel, Grid, TextField, Typography } from '@mui/material'
import Calculate from '../Calculate'
import ChangeStatus from '../ChangeStatus'

const ApprovalAccordionItem = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [updateOmOfferAttribute] = useUpdateOmOfferAttributeMutation()

  const offer = useAppSelector((state) => state.offer)
  const { approvalLevel, approvalDescription } = offer

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch(setOfferData({ key: name as keyof Offer, value }))
  }

  const handleBlur = async (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name: key } = event.target
    const value = offer[key as keyof Offer]

    try {
      await updateOmOfferAttribute({
        id: String(offer.id),
        body: {
          [key]: value,
        },
      })
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `offer:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  const isDescriptionEditable = [OfferStatus.DRAFT, OfferStatus.L1_PENDING, OfferStatus.L2_PENDING].includes(
    offer.status as OfferStatus,
  )

  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormLabel style={{ fontSize: '0.5rem', whiteSpace: 'nowrap' }}>{t('offer:approvalLevel')}</FormLabel>
          <Typography>{approvalLevel ? t(`offer:approvalLevels.${approvalLevel}`) : EmptyValue}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {isDescriptionEditable ? (
            <TextField
              id='approvalDescription'
              name='approvalDescription'
              label={t('offer:approvalDescription')}
              variant='standard'
              value={approvalDescription || ''}
              minRows={5}
              multiline
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <>
              <FormLabel style={{ fontSize: '0.5rem', whiteSpace: 'nowrap' }}>
                {t('offer:approvalDescription')}
              </FormLabel>
              <Typography>{approvalDescription || EmptyValue}</Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5 }} spacing={2}>
        <Grid item>
          <Calculate />
        </Grid>
        <Grid item>
          <ChangeStatus />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ApprovalAccordionItem
