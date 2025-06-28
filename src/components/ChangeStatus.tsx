import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { OfferStatus } from '../types/offer'
import { useChangeOfferStatusMutation } from '../app/apis/gw/offer.api'
import { getAvailableStatusesForStatusChange } from '../helpers/offer'
import { useState } from 'react'
import { hideConfirm, showConfirm } from '../features/confirm.slice'
import { setOfferData } from '../features/offer.slice'
import { setNotification } from '../features/notifications.slice'
import { NotificationType } from '../types/notification'
import { ButtonStyled } from '../styles/common'
import { Grid, Menu, MenuItem } from '@mui/material'

const ChangeStatus = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const offer = useAppSelector((state) => state.offer)
  const userType = useAppSelector((state) => state.auth.type)

  const currentStatus = offer.status as OfferStatus

  const [changeOfferStatus, { isLoading }] = useChangeOfferStatusMutation()

  const availableStatuses = getAvailableStatusesForStatusChange(currentStatus, offer.approvalLevel, userType)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleStatusChange = (newStatus: OfferStatus) => {
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
        confirmationText: t('offer:changeStatusConfirmationMessage', {
          newStatus: t(`offer:statuses.${newStatus.toLowerCase()}`),
        }),
        confirmationTitle: t('offer:changeStatus').toUpperCase(),
        onConfirm: () => handleConfirmChangeStatus(newStatus),
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
    handleMenuClose()
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
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

  return (
    <Grid>
      {availableStatuses.length !== 0 ? (
        <Grid>
          <ButtonStyled variant='contained' onClick={handleDropdownClick} disabled={isLoading}>
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
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default ChangeStatus
