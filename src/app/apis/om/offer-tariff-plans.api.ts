import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { OmApiTags } from '../../../consts/common'
import {
  CreateTariffPlan,
  CreateTariffPlansBulkResponse,
  OmTariffPlan,
  UpdateTariffPlans,
} from '../../../types/tariffPlans'

export const offerTariffPlanApi = createApi({
  reducerPath: 'offerTariffPlanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_OM_API}/tariff-plans`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  tagTypes: [OmApiTags.TARIFF_PLANS],
  endpoints: (builder) => ({
    getOfferTariffPlansByOfferId: builder.query<OmTariffPlan[], string>({
      query: (omOfferId) => `/offer/${omOfferId}`,
      providesTags: (result, error, id) => [{ type: OmApiTags.TARIFF_PLANS, id }],
    }),
    createTariffPlansBulk: builder.mutation<CreateTariffPlansBulkResponse, CreateTariffPlan>({
      query: (body) => ({
        url: `/bulk`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: () => [{ type: OmApiTags.TARIFF_PLANS }],
    }),
    updateTariffPlansBulk: builder.mutation<{ message: string }, UpdateTariffPlans>({
      query: (body) => ({
        url: `/bulk`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: () => [{ type: OmApiTags.TARIFF_PLANS }],
    }),
    deleteTariffPlansBulk: builder.mutation<{ message: string }, string[]>({
      query: (body) => ({
        url: `/bulk`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: () => [{ type: OmApiTags.TARIFF_PLANS }],
    }),
    deactivateOfferTariffPlan: builder.mutation<string, { id: string; value: boolean }>({
      query: ({ id, value }) => ({
        url: `/${id}/deactivate`,
        method: 'PATCH',
        body: {
          deactivate: value,
        },
      }),
      invalidatesTags: () => [{ type: OmApiTags.TARIFF_PLANS }],
    }),
  }),
})

export const {
  useGetOfferTariffPlansByOfferIdQuery,
  useCreateTariffPlansBulkMutation,
  useDeleteTariffPlansBulkMutation,
  useUpdateTariffPlansBulkMutation,
  useDeactivateOfferTariffPlanMutation,
} = offerTariffPlanApi
