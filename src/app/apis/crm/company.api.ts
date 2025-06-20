import { OmApiTags } from '../../../consts/common'
import { Company } from '../../../types/company'
import { crmApi } from '../core/crm.api'

export const companyApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query<Company, number>({
      query: (id) => `/companies/${id}`,
      providesTags: (result, error, id) => [{ type: OmApiTags.COMPANY, id }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCompanyQuery } = companyApi
