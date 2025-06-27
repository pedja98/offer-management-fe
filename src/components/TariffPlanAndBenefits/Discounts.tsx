import { useTranslation } from 'react-i18next'
import {
  useGetTariffPlanDiscountQuery,
  useUpdateAdditionalDiscountMutation,
} from '../../app/apis/om/offer-tariff-plan-discount.api'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { FormLabel, Grid, TextField } from '@mui/material'
import { ChangeEvent, FocusEvent, useState, useEffect } from 'react'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException } from '../../types/common'
import Spinner from '../Spinner'

const Discounts = ({ tariffPlanIdentifier }: { tariffPlanIdentifier: string }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const offerId = useAppSelector((state) => state.offer).id as string

  const {
    data: discount,
    isLoading,
    isError,
  } = useGetTariffPlanDiscountQuery({
    offerId,
    tariffPlanIdentifier,
  })

  const [updateAdditionalDiscount] = useUpdateAdditionalDiscountMutation()

  const [additionalDiscountValue, setAdditionalDiscountValue] = useState<number>(0)

  useEffect(() => {
    if (discount) {
      setAdditionalDiscountValue(discount.additionalDiscount)
    }
  }, [discount])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    dispatch(
      setNotification({
        text: t('tariffPlanDiscount:errorRetrievingError'),
        type: NotificationType.Error,
      }),
    )
    return null
  }

  if (!discount) {
    return <></>
  }

  const handleAdditionalDiscountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (discount.initialDiscount + value > 100) {
      dispatch(
        setNotification({
          text: t('tariffPlanDiscount:discountMax'),
          type: NotificationType.Error,
        }),
      )
      return
    }

    if (!Number(value) && Number(value) !== 0) {
      return
    }

    setAdditionalDiscountValue(value)
  }

  const handleAdditionalDiscountBlur = async (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(event.target.value)
    if (discount.initialDiscount + value > 100) {
      dispatch(
        setNotification({
          text: t('tariffPlanDiscount:discountMax'),
          type: NotificationType.Error,
        }),
      )
      setAdditionalDiscountValue(discount.additionalDiscount)
      return
    }

    try {
      await updateAdditionalDiscount({
        id: discount.id,
        additionalDiscount: value,
      }).unwrap()

      dispatch(
        setNotification({
          text: t('tariffPlanDiscount:discountUpdated'),
          type: NotificationType.Success,
        }),
      )
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `offer:${errorResponse.data}` || 'general:unknownError'

      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
      setAdditionalDiscountValue(discount.additionalDiscount)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <FormLabel style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
          {t('tariffPlanDiscount:initialDiscount')}
        </FormLabel>
        <TextField
          fullWidth
          variant='standard'
          value={discount.initialDiscount}
          disabled
          type='number'
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <FormLabel style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
          {t('tariffPlanDiscount:additionalDiscount')}
        </FormLabel>
        <TextField
          fullWidth
          variant='standard'
          value={additionalDiscountValue}
          onChange={handleAdditionalDiscountChange}
          onBlur={handleAdditionalDiscountBlur}
          type='number'
          inputProps={{
            min: 0,
            max: 100 - discount.initialDiscount,
            step: 0.1,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Discounts
