

import Pagination from "@/app/frontend/dashboard/pagination/pagination";
import Search from "@/app/frontend/dashboard/search/search";
import styles from "@/app/frontend/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

const UsersPage = async ({ searchParams }) => {
  let users = [];
  let count = 0;
  let error = null;

  try {
    const response = await fetch('http://localhost:4001/users');
    console.log('Server Status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched Data:', data);
    count = data.count || 0;
    users = data.users || [];
        
  } catch (err) {
    error = err.message;
    console.error('Error fetching users:', error);
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {error ? (
        <div className={styles.error}>
          <p>Error fetching users: {error}</p>
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Created At</td>
                <td>Phone Number</td>
                <td>Address</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.user}>
                        <Image
                          src="/noavatar.png"
                          alt=""
                          width={40}
                          height={40}
                          className={styles.userImage}
                        />
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.address}</td>
                    <td>
                      <div className={styles.buttons}>
                        <Link href={`/dashboard/users/${user.id}`}>
                          <button className={`${styles.button} ${styles.view}`}>
                            View
                          </button>
                        </Link>
                        <form action={`/dashboard/users/delete/${user.id}`} method="POST">
                          <button className={`${styles.button} ${styles.delete}`}>
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination count={count} />
        </>
      )}
    </div>
  );
};

export default UsersPage;

