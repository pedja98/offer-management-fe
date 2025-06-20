import { FC } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useAppSelector } from '../app/hooks'

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
        <Button onClick={handleConfirm} color='primary' variant='contained'>
          {confirm.confirmButtonLabel}
        </Button>
        <Button onClick={handleCancel} color='error' variant='contained'>
          {confirm.denyButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirm
