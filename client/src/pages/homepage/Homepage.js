import { Outlet, Link } from "react-router-dom";
import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import PlaceABid from "../../components/popups/PlaceABid";

const Home = () => {
  return (
    <>
      <Header />
      <NavBar />
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/registerForO">Register for organization</Link>
          </li>
          <li>
            <Link to="/auctionDetail">Auction Detail</Link>
          </li>
          <li>
            <Link to="/placeABid">place A Bid</Link>
          </li>
          <li>
            <Link to="/confirmPayment">confirm Payment</Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <Footer />
    </>
  );
};

export default Home;
