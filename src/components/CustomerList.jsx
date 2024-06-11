import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CustomerList.css'; // Import external CSS file

function CustomerList({ token, selectCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://stemprotocol.codefremics.com/api/v2/customers/get-merchantcustomers/1', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomers(response.data.response.response); // Access the response property
      setError(null);  // Clear any previous errors
    } catch (err) {
      console.error('Error fetching customers', err);
      setError('Failed to fetch customers. Please try again later.');
    }
  };

  fetchCustomers();
}, [token]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.first_name.toLowerCase().includes(search.toLowerCase()) ||
    customer.other_names.toLowerCase().includes(search.toLowerCase()) ||
    customer.mobile_number.includes(search) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <input type="text" placeholder="Search..." value={search} onChange={handleSearch} className="search-input" />
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Other Names</th>
              <th>Mobile Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.customer_id} onClick={() => selectCustomer(customer.customer_id)}>
                <td>{customer.first_name}</td>
                <td>{customer.other_names}</td>
                <td>{customer.mobile_number}</td>
                <td>{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerList;
