import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export interface props {
  message: string,
  severity: string,
  open: boolean,
  handleClose: () => void
}

const Alert = React.forwardRef(function Alert(props:any, ref:any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstantMessage = (props: props) =>  {

    return (
        <Snackbar
            open={props.open} 
            autoHideDuration={6000} 
            onClose={props.handleClose}
        >
            <Alert
              onClose={props.handleClose} 
              severity={props.severity}
            >
                {props.message}
            </Alert>
      </Snackbar>
    )
}

export default InstantMessage