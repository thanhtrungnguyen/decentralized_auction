import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RegisterForO from "./pages/register/RegisterForOrganization";
import ErrorPage from "./pages/errorPage/ErrorPage";
import AuctionDetail from "./pages/auctionDetails/AuctionDetail";
import { useState } from "react";
import PlaceABid from "./components/popups/PlaceABid";
import ConfirmPayment from "./pages/confirmPayment/confirmPayment";
import AuctionList from "./pages/auctionList/AuctionList";
import PaymentResult from "./pages/paymentResult/PaymemtResult";
import News from "./pages/news/News";
import SellerCenter from "./pages/ForSeller/SellerCenter";
import MyProperty from "./pages/ForSeller/MyProperty";
import AddProperty from "./pages/ForSeller/AddProperty";
import AuctionDetailForSeller from "./pages/ForSeller/AuctionDetailForSeller";
// import axios from "axios";
// axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerForO" element={<RegisterForO />} />
        <Route path="auctionDetail/:id" element={<AuctionDetail />} />
        <Route path="auctionList" element={<AuctionList />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="placeABid" element={<PlaceABid />} />
        <Route path="confirmPayment" element={<ConfirmPayment />} />
        <Route path="paymentResult" element={<PaymentResult />} />
        <Route path="news" element={<News />} />
        <Route path="sellerCenter" element={<SellerCenter />} />
        <Route path="myProperty" element={<MyProperty />} />
        <Route path="addProperty" element={<AddProperty />} />
        <Route
          path="autitoDetailForSeller/:id"
          element={<AuctionDetailForSeller />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
