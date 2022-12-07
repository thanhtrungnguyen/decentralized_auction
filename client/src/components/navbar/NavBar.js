import styles from "../../styleCss/stylesComponents/navbar.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
const NavBar = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <label className={styles.dap}>DAP</label>
          <Link className={styles.home} to="/">
            Home
          </Link>

          <Link className={styles.link} to="/auctionList">
            Auctions
          </Link>
          <Link className={styles.link} to="/news">
            News
          </Link>
          <Link className={styles.link} to="/">
            About us
          </Link>
          <Link className={styles.link} to="/myProperty">
            Seller Center
          </Link>
          <Link className={styles.link} to="/autionsListForManager">
            Manager Center
          </Link>
          <Link className={styles.link} to="/listManagers">
            Admin Center
          </Link>
          <div className={styles.flright}>
            <input className={styles.ip} type="text"></input>
            <BsSearch className={styles.icon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
