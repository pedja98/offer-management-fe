import { OmApiTags } from '../../../consts/common'
import { OfferCalculateResponse, OfferStatus } from '../../../types/offer'
import { gwApi } from '../core/gw.api'

export const offerApi = gwApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableOfferStatuses: builder.query<OfferStatus[], OfferStatus>({
      query: (status) => `/offers/statuses/${status}`,
      providesTags: (result, error, status) => [{ type: OmApiTags.OFFER, status }],
    }),
    calculate: builder.mutation<OfferCalculateResponse, { omOfferId: string }>({
      query: ({ omOfferId }) => ({
        url: `/offers/calculate/${omOfferId}`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: () => [{ type: OmApiTags.OFFER }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAvailableOfferStatusesQuery, useCalculateMutation } = offerApi
