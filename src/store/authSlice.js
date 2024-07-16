import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tmpUser: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {...state.user, ...action.payload};
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    unsetUser: (state) => {
      state.user = null
      localStorage.removeItem('user');
    },
    setTmpUser: (state, action) => {
      state.tmpUser = {...action.payload};
    },
    unsetTmpUser: (state) => {
      state.tmpUser = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, unsetUser, setTmpUser, unsetTmpUser } = authSlice.actions

export default authSlice.reducer