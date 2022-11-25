import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

export type AlertProps = 'success' | 'info' | 'warning' | 'error'

interface AlertState {
  text: string
  type: AlertProps
  open?: boolean
}

const initialState: AlertState = {
  text: '',
  type: 'success',
  open: false,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.open = true
      state.text = action.payload?.text ?? ''
      state.type = action.payload?.type ?? 'success'
    },
    hideAlert: state => {
      state.open = false
      state.text = ''
    },
  },
})

export const { showAlert, hideAlert } = alertSlice.actions

export const selectAlertState = (state: RootState) => state.alertReducer

export default alertSlice.reducer
