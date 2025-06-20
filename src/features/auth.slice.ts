import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState as AuthInitialState } from '../consts/auth'
import { AuthState } from '../types/auth'

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setAuthData } = authSlice.actions

export default authSlice.reducer
