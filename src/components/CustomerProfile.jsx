import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerProfile({ token, customerId }) {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://stemprotocol.codefremics.com/api/v2/customers/get-customer-details/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCustomer(response.data.response);
      } catch (err) {
        console.error('Error fetching customer details', err);
        setError('Failed to fetch customer details. Please try again later.');
      }
    };

    fetchCustomerDetails();
  }, [customerId, token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Customer Profile</h2>
      <p>First Name: {customer.first_name}</p>
      <p>Other Names: {customer.other_names}</p>
      <p>Gender: {customer.gender}</p>
      <p>Mobile Number: {customer.mobile}</p>
      <p>Email: {customer.email}</p>
      <p>Description: {customer.description}</p>
    </div>
  );
}

export default CustomerProfile;
