import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { OmApiTags } from '../../../consts/common'

export const gwApi = createApi({
  reducerPath: 'gwApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_GW_API}`,
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
