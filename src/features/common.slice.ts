import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState as CommonInitialState } from '../consts/common'

const commonSlice = createSlice({
  name: 'common',
  initialState: CommonInitialState,
  reducers: {
    setTariffPlanNumbers: (state, action: PayloadAction<number>) => {
      return { ...state, numberOfTariffPlans: action.payload }
    },
    setRefetchDiscount: (state, action: PayloadAction<boolean>) => {
      return { ...state, refetchDiscount: action.payload }
    },
  },
})

export const { setTariffPlanNumbers, setRefetchDiscount } = commonSlice.actions
export default commonSlice.reducer
