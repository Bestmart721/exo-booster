import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  supportModal: false,
  errorModal: false,
  modalText: "",
  drawer: false,
  services: {},
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showSupport: (state) => {
      state.supportModal = true
    },
    hideSupport: (state) => {
      state.supportModal = false
    },
    modalError: (state, action) => {
      state.modalText = action.payload
      state.errorModal = true
    },
    hideError: (state) => {
      state.errorModal = false
    },
    toggleDrawer: (state) => {
      state.drawer = !state.drawer
    },
    setServices: (state, action) => {
      state.services = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { showSupport, hideSupport, modalError, hideError, toggleDrawer, setServices } = appSlice.actions

export default appSlice.reducer