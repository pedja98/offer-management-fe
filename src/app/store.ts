import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../features/auth.slice'
import ConfirmReducer from '../features/confirm.slice'
import NotificationReducer from '../features/notifications.slice'
import { gwApi } from './core/gw.api'
import { crmApi } from './core/crm.api'
import { pcApi } from './core/pc.api'

const rootReducer = combineReducers({
  auth: AuthReducer,
  notifications: NotificationReducer,
  confirm: ConfirmReducer,
  [gwApi.reducerPath]: gwApi.reducer,
  [crmApi.reducerPath]: crmApi.reducer,
  [pcApi.reducerPath]: pcApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'payload.onConfirm'],
        ignoredActionPaths: ['payload.onConfirm', 'payload.onCancel', 'meta.baseQueryMeta'],
        ignoredPaths: ['confirm.onConfirm', 'confirm.onCancel', 'api.meta.baseQueryMeta'],
      },
    }).concat(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
