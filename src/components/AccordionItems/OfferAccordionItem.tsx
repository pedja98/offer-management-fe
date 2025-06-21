import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getOfferGridData, getOfferGridDataLabels } from '../../transformers/offer'
import { FormLabel, Grid, TextField, Typography } from '@mui/material'
import { GridFieldTypes } from '../../consts/common'
import { ChangeEvent, FocusEvent } from 'react'
import { Offer } from '../../types/offer'
import { setOfferData } from '../../features/offer.slice'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/common'
import { useUpdateOmOfferAttributeMutation } from '../../app/apis/om/offer.api'

const OfferAccordionItem = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [updateOmOfferAttribute] = useUpdateOmOfferAttributeMutation()

  const offer = useAppSelector((state) => state.offer)

  const labels = getOfferGridDataLabels(t)
  const offerGridData = getOfferGridData(t, offer)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (!Number(value) && Number(value) !== 0) {
      return
    }
    dispatch(setOfferData({ key: name as keyof Offer, value: Number(value) }))
  }

  const handleBlur = async (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name: key } = event.target
    const value = offer[key as keyof Offer]
    try {
      await updateOmOfferAttribute({
        id: String(offer.omOfferId),
        body: {
          [key]: value,
        },
      })
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `contacts:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  return (
    <Grid container spacing={2}>
      {labels.map((label) => {
        const gridFieldData = offerGridData[label.key]
        if (gridFieldData.type === GridFieldTypes.NON_EDITABLE) {
          return (
            <Grid item key={label.key} xs={12} sm={6} md={4}>
              <FormLabel style={{ fontSize: '0.5rem', whiteSpace: 'nowrap' }}>{label.text}</FormLabel>
              <Typography>{gridFieldData.value}</Typography>
            </Grid>
          )
        } else if (gridFieldData.type === GridFieldTypes.NUMBER) {
          return (
            <Grid item key={label.key} xs={12} sm={6} md={4}>
              <TextField
                id={label.key}
                name={label.key}
                label={label.text}
                type='number'
                variant='standard'
                value={gridFieldData.value}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
          )
        } else {
          return null
        }
      })}
    </Grid>
  )
}

export default OfferAccordionItem
