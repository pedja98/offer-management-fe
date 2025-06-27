import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { OmApiTags } from '../../../consts/common'
import { TariffPlanDiscount, UpdateAdditionalDiscountRequest } from '../../../types/tariffPlanDiscount'

export const offerDiscountApi = createApi({
  reducerPath: 'offerDiscountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_OM_API}/tariff-plan-discounts`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  tagTypes: [OmApiTags.TARIFF_PLAN_DISCOUNTS],
  endpoints: (builder) => ({
    getTariffPlanDiscount: builder.query<TariffPlanDiscount, { offerId: string; tariffPlanIdentifier: string }>({
      query: ({ offerId, tariffPlanIdentifier }) => `/${offerId}/${tariffPlanIdentifier}`,
      providesTags: (result, error, { offerId, tariffPlanIdentifier }) => [
        { type: OmApiTags.TARIFF_PLAN_DISCOUNTS, id: `${offerId}-${tariffPlanIdentifier}` },
      ],
    }),
    updateAdditionalDiscount: builder.mutation<{ message: string }, UpdateAdditionalDiscountRequest>({
      query: ({ id, additionalDiscount }) => ({
        url: `/${id}/additional-discount`,
        method: 'PUT',
        params: {
          additionalDiscount: additionalDiscount.toString(),
        },
      }),
      invalidatesTags: () => [{ type: OmApiTags.TARIFF_PLAN_DISCOUNTS }],
    }),
  }),
})

export const { useGetTariffPlanDiscountQuery, useUpdateAdditionalDiscountMutation } = offerDiscountApi
