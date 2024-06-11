// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import CreateCustomer from './components/CreateCustomer';
import CustomerList from './components/CustomerList';
import CustomerProfile from './components/CustomerProfile';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleLogin = (token, userData) => {
    setToken(token);
    setUser(userData);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setSelectedCustomerId(null);
  };

  const selectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  return (
    <div>
      {!token ? (
        <Login setToken={handleLogin} />
      ) : (
        <>
          <Home user={user} logout={handleLogout} />
          <CreateCustomer token={token} />
          <CustomerList token={token} selectCustomer={selectCustomer} />
          {selectedCustomerId && (
            <CustomerProfile token={token} customerId={selectedCustomerId} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
