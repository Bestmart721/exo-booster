import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  supportModal: false,
  errorModal: false,
  modalText: "",
  drawer: false,
  services: {},
  totalOrdersCount: 0,
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
    setTotalOrdersCount: (state, action) => {
      state.totalOrdersCount = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { showSupport, hideSupport, modalError, hideError, toggleDrawer, setServices, setTotalOrdersCount } = appSlice.actions

export default appSlice.reducer