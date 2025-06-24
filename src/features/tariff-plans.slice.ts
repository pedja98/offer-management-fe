import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OmTariffPlan, TariffPlansState } from '../types/tariffPlans'
import { offerTariffPlanApi } from '../app/apis/om/offer-tariff-plans.api'
import { getOmTariffPlanMap } from '../helpers/tariffPlan'

const initialState: TariffPlansState = {}

const tariffPlansSlice = createSlice({
  name: 'tariffPlans',
  initialState,
  reducers: {
    setTariffPlanData: <K extends keyof OmTariffPlan>(
      state: TariffPlansState,
      action: PayloadAction<{ id: string; key: K; value: OmTariffPlan[K] }>,
    ) => {
      const { id, key, value } = action.payload
      if (state[id]) {
        state[id] = {
          ...state[id],
          [key]: value,
        }
      }
    },
    deleteTariffPlansByIds: (state: TariffPlansState, action: PayloadAction<string[]>) => {
      action.payload.forEach((id) => {
        delete state[id]
      })
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      offerTariffPlanApi.endpoints.getOfferTariffPlansByOfferId.matchFulfilled,
      (state, action: PayloadAction<OmTariffPlan[]>) => {
        return { ...state, ...getOmTariffPlanMap(action.payload) }
      },
    )
  },
})

export const { setTariffPlanData, deleteTariffPlansByIds } = tariffPlansSlice.actions
export default tariffPlansSlice.reducer
