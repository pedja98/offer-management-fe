import { FC } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useAppSelector } from '../app/hooks'
import { ButtonStyled } from '../styles/common'

const Confirm: FC = () => {
  const confirm = useAppSelector((state) => state.confirm)

  const handleConfirm = () => {
    if (confirm.onConfirm) {
      confirm.onConfirm()
    }
  }

  const handleCancel = () => {
    if (confirm.onCancel) {
      confirm.onCancel()
    }
  }

  return (
    <Dialog open={!!confirm.open} onClose={handleCancel} aria-labelledby='confirmation-title'>
      <DialogTitle id='confirmation-title'>{confirm.confirmationTitle}</DialogTitle>
      <DialogContent>
        <Typography>{confirm.confirmationText}</Typography>
      </DialogContent>
      <DialogActions>
        <ButtonStyled onClick={handleConfirm} color='primary' variant='contained'>
          {confirm.confirmButtonLabel}
        </ButtonStyled>
        <ButtonStyled onClick={handleCancel} color='error' variant='contained'>
          {confirm.denyButtonLabel}
        </ButtonStyled>
      </DialogActions>
    </Dialog>
  )
}

export default Confirm
