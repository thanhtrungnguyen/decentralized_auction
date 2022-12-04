import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";

import { Outlet, Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>Manager User</p>
        <Link to="/autionsListForManager" className={styles.txt}>
          Managers
        </Link>
        <br />
        <br />
        <Link to="/autionsListForManager" className={styles.txt}>
          Sellers
        </Link>
        <br />
        <br />
        <Link to="/autionsListForManager" className={styles.txt}>
          Bidders
        </Link>
        <br />
        <br />
        <p className={styles.title}>Manager News</p>
        <Link to="/managerCategorys" className={styles.txt}>
          News
        </Link>{" "}
        <br />
        <p className={styles.title}>Data</p>
        <Link to="/managerCategorys" className={styles.txt}>
          Dashboard
        </Link>{" "}
        <br />
      </div>
    </>
  );
};

export default SidebarAdmin;
