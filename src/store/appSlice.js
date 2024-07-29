import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchSupportContacts } from '../firebaseAPI'



export const fetchSupportContactsThunk = createAsyncThunk('/app/fetchSupportContacts', async (data, thunkAPI) => {
    try {
    const response = await fetchSupportContacts()
    
    return response;
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const initialState = {
  supportModal: false,
  contactInfo: null,
  loading: false,

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
      state.retryFunction = null
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportContactsThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSupportContactsThunk.fulfilled, (state, action) => {
        state.contactInfo = action.payload
        state.loading = false
      })
      .addCase(fetchSupportContactsThunk.rejected, (state) => {
        state.loading = false
      })
  }
})

// Action creators are generated for each case reducer function
export const { showSupport, hideSupport, modalError, modalError2, hideError, toggleDrawer, setServices, setTotalOrdersCount } = appSlice.actions

export default appSlice.reducer