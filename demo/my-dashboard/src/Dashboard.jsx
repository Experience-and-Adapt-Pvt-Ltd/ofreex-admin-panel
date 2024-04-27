import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/data/');
        setSellers(response.data.sellers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Sellers</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>GST Number</th>
              <th>Account Number</th>
              <th>IFSC</th>
              <th>Bank Name</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={index}>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.password}</td>
                <td>{seller.phoneNumber}</td>
                <td>{seller.address}</td>
                <td>{seller.gstNumber}</td>
                <td>{seller.accountNumber}</td>
                <td>{seller.IFSC}</td>
                <td>{seller.bankName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
