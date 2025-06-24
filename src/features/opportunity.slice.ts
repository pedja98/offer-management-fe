import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Opportunity } from '../types/opportunity'
import { opportunityApi } from '../app/apis/crm/opportunity.api'

const initialState: Opportunity = {}

const opportunitySlice = createSlice({
  name: 'opportunity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      opportunityApi.endpoints.getOpportunityById.matchFulfilled,
      (state, action: PayloadAction<Opportunity>) => {
        return { ...state, ...action.payload }
      },
    )
  },
})

export default opportunitySlice.reducer
