import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SellerDetail() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4000/data/${id}`);
        setSeller(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Seller Detail</h1>
      <div>
        <h2>{seller.name}</h2>
        <p>Email: {seller.email}</p>
        <p>Phone Number: {seller.phoneNumber}</p>
        <p>Address: {seller.address}</p>
        <p>GST Number: {seller.gstNumber}</p>
        <p>Account Number: {seller.accountNumber}</p>
        <p>IFSC: {seller.IFSC}</p>
        <p>Bank Name: {seller.bankName}</p>
      </div>
    </div>
  );
}

export default SellerDetail;
