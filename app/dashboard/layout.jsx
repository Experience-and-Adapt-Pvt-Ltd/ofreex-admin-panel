import Navbar from "../frontend/dashboard/navbar/navbar"
import Sidebar from "../frontend/dashboard/sidebar/sidebar"
import styles from "../frontend/dashboard/dashboard.module.css"


const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        
      </div>
    </div>
  )
}

export default Layout