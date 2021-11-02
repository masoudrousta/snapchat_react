import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  selectedImage: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload
    },
    resetImage: (state) => {
      state.selectedImage = null
    },
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { login, logout, selectImage, resetImage } = appSlice.actions

export const selectSelectedImage = (state) => state.app.selectedImage
export const selectUser = (state) => state.app.user

export default appSlice.reducer
