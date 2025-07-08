import { Button, DialogContent, DialogContentText } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { removeUserSession } from "./Common";

const SessionHandling = ({ show, status }) => {

  const [open, setOpen] = useState(show);
  let history = useHistory();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
    if(status === 401){
      removeUserSession();
      history.push('/');
    }
  }

  const ErrorMsg = () => {
    var msg = '';

    if (status === 0) {
        msg = 'Not connect.\n Verify Network.';
    }
    else if (status === 401) {
        msg = 'Your Session Expired. Please Login';
    }
    else if (status === 500) {
        msg = 'Internal Server Error [500].';
    }
    else if (status === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    }
    else if (status === 'timeout') {
        msg = 'Time out error.';
    }
    else if (status === 'abort') {
        msg = 'Ajax request aborted.';
    }
    else {
        msg = 'Uncaught Error.' ;
    }
    return msg;
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="session-handle-alert-dialog"
    >
      <DialogTitle>
        {/* {"Your Session Expired. Please Login"} */}
        Alert!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="session-handle-alert-dialog">
          {
            ErrorMsg()
          }
        </DialogContentText>
      </DialogContent>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
      {/* width: "5vw", */}
        {/* <Button sx={{ backgroundColor: "#0000a0", color: "#fff" }} onClick={handleClose}>OK</Button> */}
      {/* </Box> */}
      <Button onClick={handleClose}>OK</Button>
    </Dialog>
  )
}

export default SessionHandling