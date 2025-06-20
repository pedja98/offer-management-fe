import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState as NotificationsInitialState } from '../consts/notification'
import { SetNotificationProps } from '../types/notification'
import { RootState } from '../app/store'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: NotificationsInitialState,
  reducers: {
    setNotification: (state, action: PayloadAction<SetNotificationProps>) => {
      return [...state, { ...action.payload, key: new Date().getTime() + Math.random() }]
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      return state.filter((notification) => notification.key !== action.payload)
    },
  },
})

export const selectNotifications = (state: RootState) => state.notifications

export const { setNotification, removeNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
