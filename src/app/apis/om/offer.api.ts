import { OmApiTags } from '../../../consts/common'
import { omApi } from '../core/om.api'

export const offerApi = omApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOmOfferAttribute: builder.mutation<
      { message: string },
      { id: string; body: { [key: string]: string | number | undefined } }
    >({
      query: (args) => {
        const { id, body } = args
        if (!body) throw new Error('Body is required')

        return {
          url: `/offers/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: OmApiTags.OFFER, id }],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateOmOfferAttributeMutation } = offerApi
