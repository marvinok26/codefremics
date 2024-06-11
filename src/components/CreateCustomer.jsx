import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateCustomer.css';

function CreateCustomer({ token }) {
  const [customer, setCustomer] = useState({
    first_name: '',
    other_names: '',
    gender: '',
    mobile_number: '',
    email: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://stemprotocol.codefremics.com/api/v2/customers/create', customer, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.description);
      if (response.data.status === 200) {
        setCustomer({
          first_name: '',
          other_names: '',
          gender: '',
          mobile_number: '',
          email: '',
          description: ''
        });
      }
    } catch (err) {
      setMessage('Error creating customer.');
    }
  };

  return (
    <div className="create-customer-container">
      <h2>Create Customer</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input name="first_name" placeholder="First Name" value={customer.first_name} onChange={handleChange} required className="input-field" />
        <input name="other_names" placeholder="Other Names" value={customer.other_names} onChange={handleChange} required className="input-field" />
        <input name="gender" placeholder="Gender" value={customer.gender} onChange={handleChange} required className="input-field" />
        <input name="mobile_number" placeholder="Mobile Number" value={customer.mobile_number} onChange={handleChange} required className="input-field" />
        <input name="email" placeholder="Email" value={customer.email} onChange={handleChange} required className="input-field" />
        <input name="description" placeholder="Description" value={customer.description} onChange={handleChange} required className="input-field" />
        <button type="submit" className="submit-button">Create Customer</button>
      </form>
    </div>
  );
}

export default CreateCustomer;
