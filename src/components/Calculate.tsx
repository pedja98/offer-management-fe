import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useCalculateMutation } from '../app/apis/gw/offer.api'
import { hideConfirm, showConfirm } from '../features/confirm.slice'
import { setNotification } from '../features/notifications.slice'
import { NotificationType } from '../types/notification'
import { ButtonStyled } from '../styles/common'
import { OfferStatus } from '../types/offer'
import { Grid } from '@mui/material'

const Calculate = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const offer = useAppSelector((state) => state.offer)
  const numberOfTariffPlans = useAppSelector((state) => state.common).numberOfTariffPlans

  const [calculate, { isLoading }] = useCalculateMutation()

  const handleCalculate = () => {
    if (numberOfTariffPlans === 0) {
      dispatch(
        setNotification({
          text: t('offer:numOfTariffPlansIsZero'),
          type: NotificationType.Warning,
        }),
      )
      return
    }
    if (!offer.contractObligation) {
      dispatch(
        setNotification({
          text: t('offer:contractObligationEmpty'),
          type: NotificationType.Warning,
        }),
      )
      return
    }
    dispatch(
      showConfirm({
        confirmationText: t('offer:calculateConfirmationMessage'),
        confirmationTitle: t('offer:calculate').toUpperCase(),
        onConfirm: handleConfirmCalculate,
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const handleConfirmCalculate = async () => {
    try {
      const result = await calculate({ omOfferId: String(offer.id) }).unwrap()
      dispatch(
        setNotification({
          text: t(`offer:${result.message}`),
          type: NotificationType.Success,
        }),
      )
    } catch (error) {
      dispatch(
        setNotification({
          text: JSON.stringify(error),
          type: NotificationType.Error,
        }),
      )
    } finally {
      dispatch(hideConfirm())
    }
  }

  return (
    <Grid>
      {offer.status === OfferStatus.DRAFT ? (
        <ButtonStyled variant='contained' onClick={handleCalculate} disabled={isLoading}>
          {t('offer:calculate')}
        </ButtonStyled>
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default Calculate
