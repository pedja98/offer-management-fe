export interface ConfirmState {
  open?: boolean
  confirmationText?: string
  confirmationTitle?: string
  confirmButtonLabel?: string
  denyButtonLabel?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}
