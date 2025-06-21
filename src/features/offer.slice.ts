import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Offer, OfferCalculateResponse } from '../types/offer'
import { offerApi } from '../app/apis/om/offer.api'
import { offerApi as gwOfferApi } from '../app/apis/gw/offer.api'

const initialState: Offer = {}

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOfferData: <K extends keyof Offer>(state: Offer, action: PayloadAction<{ key: K; value: Offer[K] }>) => {
      const { key, value } = action.payload
      state[key] = value
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(offerApi.endpoints.getOmOfferById.matchFulfilled, (state, action: PayloadAction<Offer>) => {
      return { ...state, ...action.payload }
    })
    builder.addMatcher(
      gwOfferApi.endpoints.calculate.matchFulfilled,
      (state, action: PayloadAction<OfferCalculateResponse>) => {
        return { ...state, approvalLevel: action.payload.approvalLevel }
      },
    )
  },
})

export const { setOfferData } = offerSlice.actions
export default offerSlice.reducer
