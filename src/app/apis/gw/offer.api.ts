import { OmApiTags } from '../../../consts/common'
import { OfferApprovalLevel, OfferCalculateResponse, OfferStatus } from '../../../types/offer'
import { gwApi } from '../core/gw.api'

export const offerApi = gwApi.injectEndpoints({
  endpoints: (builder) => ({
    calculate: builder.mutation<OfferCalculateResponse, { omOfferId: string }>({
      query: ({ omOfferId }) => ({
        url: `/offers/calculate/${omOfferId}`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: () => [{ type: OmApiTags.OFFER }],
    }),
    changeOfferStatus: builder.mutation<
      { message: string },
      {
        omOfferId: string
        crmOfferId: number
        oldStatus: OfferStatus
        newStatus: OfferStatus
        approvalLevel?: OfferApprovalLevel | null
      }
    >({
      query: ({ omOfferId, crmOfferId, oldStatus, newStatus, approvalLevel }) => ({
        url: `/offers/statuses/${crmOfferId}`,
        method: 'PATCH',
        body: {
          omOfferId,
          oldStatus,
          newStatus,
          approvalLevel,
        },
      }),
      invalidatesTags: () => [{ type: OmApiTags.OFFER }],
    }),
  }),
  overrideExisting: false,
})

export const { useCalculateMutation, useChangeOfferStatusMutation } = offerApi
