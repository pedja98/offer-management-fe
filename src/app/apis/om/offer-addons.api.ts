import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { OmApiTags } from '../../../consts/common'
import { Addon, CreateAddon } from '../../../types/addon'

export const offerAddonsApi = createApi({
  reducerPath: 'offerAddonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_OM_API}/addons`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  tagTypes: [OmApiTags.ADDONS],
  endpoints: (builder) => ({
    createAddon: builder.mutation<{ message: string }, CreateAddon>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: OmApiTags.ADDONS, id: arg.omOfferId }],
    }),

    deleteAddonsBulk: builder.mutation<{ message: string }, { omOfferId: string; ids: string[] }>({
      query: ({ ids }) => ({
        url: '/bulk',
        method: 'DELETE',
        body: ids,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: OmApiTags.ADDONS, id: arg.omOfferId }],
    }),

    getAddonsByOfferIdAndTpIdentifier: builder.query<Addon[], { omOfferId: string; tariffPlanIdentifier: string }>({
      query: ({ omOfferId, tariffPlanIdentifier }) =>
        `?offerId=${omOfferId}&tariffPlanIdentifier=${encodeURIComponent(tariffPlanIdentifier)}`,
      providesTags: (_result, _error, arg) => [{ type: OmApiTags.ADDONS, id: arg.omOfferId }],
    }),
  }),
})

export const { useCreateAddonMutation, useDeleteAddonsBulkMutation, useGetAddonsByOfferIdAndTpIdentifierQuery } =
  offerAddonsApi
