import { OmApiTags } from '../../../consts/common'
import { Opportunity } from '../../../types/opportunity'
import { crmApi } from '../core/crm.api'

export const opportunityApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    getOpportunityById: builder.query<Opportunity, string>({
      query: (id) => `/opportunities/${id}`,
      providesTags: (result, error, id) => [{ type: OmApiTags.OPPORTUNITY, id }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetOpportunityByIdQuery } = opportunityApi
