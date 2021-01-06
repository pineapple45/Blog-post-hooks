import React, { useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertContext } from '../contexts/AlertContextProvider';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const CustomAlert = () => {
  const { alert, setAlert } = useContext(AlertContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({
      showAlert: false,
      message: '',
      severity: 'success',
    });
  };

  return (
    <Snackbar
      open={alert.showAlert}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alert.severity}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
