import React, {useState, forwardRef} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export interface props {
  message: string,
  severity: string
}

const Alert = React.forwardRef(function Alert(props:any, ref:any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstantMessage = (props: props) =>  {
    
    const [open, setOpen] = useState(true); 

    const handleClose = () => {
        setOpen(false);
      };

    return (
        <Snackbar
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
        >
            <Alert
              onClose={handleClose} 
              severity={props.severity}
            >
                {props.message}
            </Alert>
      </Snackbar>
    )
}

export default InstantMessage