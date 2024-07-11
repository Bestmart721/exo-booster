import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    unsetUser: (state) => {
      state.user = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, unsetUser } = authSlice.actions

export default authSlice.reducer