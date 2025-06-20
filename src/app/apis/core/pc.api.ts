import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OmApiTags } from '../../../consts/common'
import { getCurrentUser } from '../../../helpers/common'

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
  endpoints: () => ({}),
})
