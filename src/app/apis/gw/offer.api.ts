import { OmApiTags } from '../../../consts/common'
import { Offer } from '../../../types/offer'
import { gwApi } from '../core/gw.api'

export const offerApi = gwApi.injectEndpoints({
  endpoints: (builder) => ({
    getGwOfferById: builder.query<Offer, number>({
      query: (id) => `/offers/${id}`,
      providesTags: (result, error, id) => [{ type: OmApiTags.OFFER, id }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetGwOfferByIdQuery } = offerApi
