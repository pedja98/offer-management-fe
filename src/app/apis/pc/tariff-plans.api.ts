import { OmApiTags } from '../../../consts/common'
import { pcApi } from '../core/pc.api'
import { PcTariffPlan } from '../../../types/tariffPlans'

export const tariffPlanApi = pcApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveTariffPlans: builder.query<PcTariffPlan[], void>({
      query: () => '/tariff-plans?status=ACTIVE',
      providesTags: [OmApiTags.TARIFF_PLANS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetActiveTariffPlansQuery } = tariffPlanApi
