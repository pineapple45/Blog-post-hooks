import React, { useState } from 'react';

export const AlertContext = React.createContext();

const AlertContextProvider = ({ children }) => {
  const initialValue = {
    showAlert: false,
    message: '',
    severity: 'success',
  };

  const [alert, setAlert] = useState(initialValue);

  const contextValue = {
    alert,
    setAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
