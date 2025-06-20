export interface Notification {
  key: number
  text: string
  type: NotificationType
}

export type NotificationState = Notification[]

export enum NotificationType {
  Default = 'default',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export type SetNotificationProps = { text: string; type: NotificationType }
