import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../features/auth.slice'
import ConfirmReducer from '../features/confirm.slice'
import NotificationReducer from '../features/notifications.slice'
import OfferReducer from '../features/offer.slice'
import OpportunityReducer from '../features/opportunity.slice'
import { gwApi } from './apis/core/gw.api'
import { crmApi } from './apis/core/crm.api'
import { pcApi } from './apis/core/pc.api'
import { omApi } from './apis/core/om.api'
import { offerTariffPlanApi } from './apis/om/tariff-plans.api'

const rootReducer = combineReducers({
  auth: AuthReducer,
  notifications: NotificationReducer,
  confirm: ConfirmReducer,
  offer: OfferReducer,
  opportunity: OpportunityReducer,
  [gwApi.reducerPath]: gwApi.reducer,
  [crmApi.reducerPath]: crmApi.reducer,
  [pcApi.reducerPath]: pcApi.reducer,
  [omApi.reducerPath]: omApi.reducer,
  [offerTariffPlanApi.reducerPath]: offerTariffPlanApi.reducer,
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
    })
      .concat(gwApi.middleware)
      .concat(crmApi.middleware)
      .concat(offerTariffPlanApi.middleware)
      .concat(omApi.middleware)
      .concat(pcApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
