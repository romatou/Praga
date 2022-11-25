import React, { useCallback } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '@store/index'
import { hideAlert, selectAlertState } from '@store/slices/AlertSlice'

export interface props {
  message: string
  severity: string
  open: boolean
  handleClose: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AlertMessage = () => {
  const dispatch = useAppDispatch()
  const { text, open, type } = useAppSelector(selectAlertState)

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      dispatch(hideAlert())
    },
    []
  )
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {text}
      </Alert>
    </Snackbar>
  )
}

export default AlertMessage
