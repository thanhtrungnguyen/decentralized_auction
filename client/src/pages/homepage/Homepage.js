import { Outlet, Link } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import PlaceABid from "../../components/popups/PlaceABid";
import SidebarSeller from "../../components/sidebar_seller/SidebarSeller";
const Home = () => {
  return (
    <>
      <Header />
      <NavBar />
      <h1>Home</h1>
      <li>
        <Link to="/sellerCenter">Seller Center</Link>
      </li>

      <Outlet />

      <Footer />
    </>
  );
};

export default Home;
