// app/ui/sidebar/sidebar.jsx
"use client";
import MenuLink from "./menu.Link/menuLink";
import styles from "./sidebar.module.css";
import Image from 'next/image';
import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdLogout } from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      { title: "Buyers", path: "/dashboard/users", icon: <MdSupervisedUserCircle /> },
      { title: "Listings", path: "/dashboard/products", icon: <MdShoppingBag /> },
      { title: "Categories", path: "/dashboard/categories", icon: <MdShoppingBag /> },
      { title: "Sellers", path: "/dashboard/transactions", icon: <MdSupervisedUserCircle /> },
      { title: "Payments", path: "/dashboard/transactions", icon: <MdAttachMoney /> },
    ],
  },
];

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <div className={styles.container}>
      <div className={styles.User}>
        <Image className={styles.userImage} src="/noavatar.png" alt="" width={50} height={50} />
        <div className={styles.userDetail}>
          <span className={styles.username}>BOSS</span>
          <span className={styles.userTitle}>Admin</span>
        </div>
      </div>

      <ul className={styles.List}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout} onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
