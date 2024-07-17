
"use client";
import { useEffect } from 'react';
import Card from "../frontend/dashboard/card/card";
import Chart from "../frontend/dashboard/chart/chart";
import Bar from "../frontend/dashboard/bar/bar";
import Pie from "../frontend/dashboard/pie/pie";
import Scatter from "../frontend/dashboard/scatter/scatter";
import styles from "../frontend/dashboard/dashboard.module.css";



const Dashboard = () => {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          
        </div>
        <Chart />
        <Bar />
        <Pie />
        <Scatter />
        
      </div>
      <div className={styles.side}>
      </div>
    </div>
  );
};

export default Dashboard;
