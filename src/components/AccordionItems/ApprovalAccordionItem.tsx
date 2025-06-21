import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useCalculateMutation, useChangeOfferStatusMutation } from '../../app/apis/gw/offer.api'
import { Offer, OfferStatus } from '../../types/offer'
import Spinner from '../Spinner'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { FormLabel, Grid, TextField, Typography } from '@mui/material'
import { EmptyValue } from '../../consts/common'
import { useUpdateOmOfferAttributeMutation } from '../../app/apis/om/offer.api'
import { setOfferData } from '../../features/offer.slice'
import { ChangeEvent, FocusEvent, useState } from 'react'
import { ApiException } from '../../types/common'
import { ButtonStyled } from '../../styles/common'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { getAvailableStatusesForStatusChange } from '../../helpers/offer'
import { Menu, MenuItem } from '@mui/material'

const ApprovalAccordionItem = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [updateOmOfferAttribute] = useUpdateOmOfferAttributeMutation()
  const [calculate, { isLoading: isLoadingCalculate }] = useCalculateMutation()
  const [changeOfferStatus, { isLoading: isLoadingChangeOfferStatus }] = useChangeOfferStatusMutation()

  const offer = useAppSelector((state) => state.offer)
  const userType = useAppSelector((state) => state.auth).type

  const currentStatus = offer.status as OfferStatus

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleCalculate = () => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch(setOfferData({ key: name as keyof Offer, value: value }))
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

  const handleStatusChange = (newStatus: OfferStatus) => {
    dispatch(
      showConfirm({
        confirmationText: t('offer:changeStatusConfirmationMessage', {
          newStatus: t(`offer:statuses.${newStatus.toLowerCase()}`),
        }),
        confirmationTitle: t('offer:changeStatus').toUpperCase(),
        onConfirm: () => {
          handleConfirmChangeStatus(newStatus)
        },
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmChangeStatus = async (newStatus: OfferStatus) => {
    try {
      const result = await changeOfferStatus({
        omOfferId: String(offer.id),
        crmOfferId: Number(offer.crmOfferId),
        oldStatus: currentStatus,
        newStatus,
        approvalLevel: offer.approvalLevel,
      }).unwrap()

      dispatch(setOfferData({ key: 'status', value: newStatus }))
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

  if (isLoadingCalculate || isLoadingChangeOfferStatus) {
    return <Spinner />
  }

  const availableStatuses = getAvailableStatusesForStatusChange(currentStatus, offer.approvalLevel, userType)

  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormLabel style={{ fontSize: '0.5rem', whiteSpace: 'nowrap' }}>{t('offer:approvalLevel')}</FormLabel>
          <Typography>{offer.approvalLevel ? t(`offer:approvalLevels.${offer.approvalLevel}`) : EmptyValue}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <TextField
            id='approvalDescription'
            name='approvalDescription'
            label={t('offer:approvalDescription')}
            variant='standard'
            value={offer.approvalDescription}
            minRows={5}
            multiline
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5 }} direction='row' spacing={2}>
        <Grid item>
          <ButtonStyled variant='contained' onClick={handleCalculate}>
            {t('offer:calculate')}
          </ButtonStyled>
        </Grid>
        <Grid item>
          <ButtonStyled variant='contained' onClick={handleDropdownClick} disabled={availableStatuses.length === 0}>
            {t('offer:changeStatus')}
          </ButtonStyled>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {availableStatuses.map((status) => (
              <MenuItem key={status} onClick={() => handleStatusChange(status)}>
                {t(`offer:statuses.${status.toLowerCase()}`)}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ApprovalAccordionItem
