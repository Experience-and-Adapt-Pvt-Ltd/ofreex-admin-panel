

"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/frontend/dashboard/products/products.module.css";
import Search from "@/app/frontend/dashboard/search/search";
import Pagination from "@/app/frontend/dashboard/pagination/pagination";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:4002/listings');
        console.log('Response status:', response.status);  // Log the response status

        const text = await response.text();  // Get raw response text
        console.log('Raw response text:', text);  // Log the raw response text

        // Attempt to parse the text as JSON
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          throw new Error('Failed to parse response as JSON: ' + parseError.message);
        }

        console.log('Fetched data:', data);  // Print the fetched data to the console
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error:', error);  // Print the error message to the console
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a listing..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src="/noproduct.jpg"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {listing.title}
                </div>
              </td>
              <td>{listing.description}</td>
              <td>${listing.price}</td>
              <td>{new Date(listing.postedAt).toLocaleDateString()}</td>
              <td>{listing.quantity > 0 ? 'Yes' : 'No'}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${listing.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form>
                    <input type="hidden" name="id" value={listing.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ListingsPage;
