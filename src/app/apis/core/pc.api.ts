import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OmApiTags } from '../../../consts/common'
import { getCurrentUser } from '../../../helpers/common'
import { PcTariffPlan } from '../../../types/tariffPlans'

export const pcApi = createApi({
  reducerPath: 'pcApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_PC_API}`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  tagTypes: [OmApiTags.OFFER],
  endpoints: (builder) => ({
    getActiveTariffPlans: builder.query<PcTariffPlan[], void>({
      query: () => '/tariff-plans?status=ACTIVE',
      providesTags: [OmApiTags.TARIFF_PLANS],
    }),
    getActiveAddons: builder.query<PcTariffPlan[], void>({
      query: () => '/addons?status=ACTIVE',
      providesTags: [OmApiTags.ADDONS],
    }),
  }),
})

export const { useGetActiveTariffPlansQuery, useGetActiveAddonsQuery } = pcApi
